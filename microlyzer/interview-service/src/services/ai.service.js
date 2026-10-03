const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");
const { PDFParse } = require("pdf-parse");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const INTERVIEW_ASSISTANT_BRIEF = `You are an expert Software Engineering Interview Assistant for a final-year B.Tech candidate applying for Software Engineer and SDE roles.

Use only details from the candidate material and job description supplied in this request. Do not invent employers, projects, ownership, technical decisions, achievements, metrics, responsibilities, or experience. If a detail is not supported by the material, keep the answer general and clearly avoid presenting it as the candidate's experience.

Write concise, natural, interview-ready answers that a fresher can confidently say aloud in roughly 30–90 seconds. Avoid buzzwords and generic claims. Make every answer practical and demonstrate engineering thinking through a relevant trade-off, real-world consideration, or decision when the supplied material supports it.

For behavioral questions, use a natural STAR flow where relevant: situation, task, action, and result. Focus on ownership, collaboration, challenges, and decisions. Do not invent measurable outcomes.

For technical questions, begin with a simple accurate definition, explain it intuitively, give a practical development example, and briefly cover trade-offs or when to use the approach. For DSA questions, cover approach, why it works, time complexity, space complexity, and important edge cases. For system design questions, cover scalability, reliability, database choice, caching, communication, and trade-offs when relevant.`;

const ONE_PAGE_RESUME_BRIEF = `Create a truthful, ATS-friendly, one-page Software Engineer resume for a final-year B.Tech candidate. Use only facts in the supplied candidate material; never fabricate metrics, technologies, projects, achievements, or employment. Tailor the content to the job description by prioritizing genuinely relevant skills and projects, without keyword stuffing.

Use concise action-led bullets and a clean hierarchy: contact information, education, technical skills, projects, experience or internships if present, and only relevant achievements or leadership. Prioritize technical impact, architecture, difficult engineering problems, and genuine outcomes. Remove weak or redundant content before reducing readability.

The generated HTML must render on exactly one A4 page. Use semantic HTML with simple headings and lists; do not use tables, icons, images, columns, graphics, or decorative elements. Include self-contained CSS using an A4 page, modest margins, 10–11pt body text, 13–16pt headings, compact but readable spacing, black or near-black text, and page-break avoidance. Do not include more than one page of content.`;

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

function extractTitleFromJobDescription(jobDescription) {
  if (!jobDescription) return "Targeted Role";
  const titleMatch = jobDescription.match(
    /^(?:\*\*|\*|\s)*(?:Job Title|Title|Role|Position):\s*(.+)$/im,
  );
  if (titleMatch?.[1]) return titleMatch[1].trim();
  const lines = jobDescription
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return lines[0] || "Targeted Role";
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function textFrom(value, fallback) {
  if (typeof value === "string") return value.trim() || fallback;
  if (typeof value === "number") return String(value);
  return fallback;
}

function normalizeQuestion(value) {
  if (typeof value === "string") {
    return {
      question: value,
      intention: "Assess the candidate's relevant experience and communication.",
      answer: "Prepare a concise answer using your project experience, tradeoffs, and measurable outcomes.",
    };
  }

  return {
    question: textFrom(value?.question, "Question unavailable"),
    intention: textFrom(
      value?.intention,
      "Assess the candidate's relevant experience and communication.",
    ),
    answer: textFrom(
      value?.answer,
      "Prepare a concise answer using your project experience, tradeoffs, and measurable outcomes.",
    ),
  };
}

function normalizeSkillGap(value) {
  const allowedSeverities = new Set(["low", "medium", "high"]);
  const severity = textFrom(value?.severity, "medium").toLowerCase();

  return {
    skill: textFrom(value?.skill ?? value, "Relevant skill gap"),
    severity: allowedSeverities.has(severity) ? severity : "medium",
  };
}

function normalizePreparationDay(value, index) {
  if (typeof value === "string") {
    return {
      day: index + 1,
      focus: value,
      tasks: [value],
    };
  }

  const focus = textFrom(value?.focus, `Preparation day ${index + 1}`);
  const tasks = asArray(value?.tasks)
    .map((task) => textFrom(task, "Review the focus area"))
    .filter(Boolean);

  return {
    day: Number.isFinite(Number(value?.day)) ? Number(value.day) : index + 1,
    focus,
    tasks: tasks.length ? tasks : [focus],
  };
}

function normalizeInterviewReport(report, jobDescription) {
  const matchScore = Number(report?.matchScore);

  return interviewReportSchema.parse({
    title: textFrom(
      report?.title,
      extractTitleFromJobDescription(jobDescription),
    ),
    matchScore: Number.isFinite(matchScore)
      ? Math.min(100, Math.max(0, matchScore))
      : 0,
    technicalQuestions: asArray(report?.technicalQuestions).map(
      normalizeQuestion,
    ),
    behavioralQuestions: asArray(report?.behavioralQuestions).map(
      normalizeQuestion,
    ),
    skillGaps: asArray(report?.skillGaps).map(normalizeSkillGap),
    preparationPlan: asArray(report?.preparationPlan).map(
      normalizePreparationDay,
    ),
  });
}

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `${INTERVIEW_ASSISTANT_BRIEF}

Generate a tailored interview preparation report. Base the match score, questions, skill gaps, and preparation plan only on the supplied candidate material and job description. Keep question answers concise and spoken-answer ready. Include a natural practical consideration or trade-off when it is relevant and supported; do not force one.

Candidate resume:
${resume}

Candidate self-description:
${selfDescription}

Target job description:
${jobDescription}

Return a single JSON object with the fields: title, matchScore, technicalQuestions, behavioralQuestions, skillGaps, and preparationPlan. Do not wrap the response in an array and do not include any extra explanation outside the JSON.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  const parsedResponse = JSON.parse(response.text);
  const report = Array.isArray(parsedResponse)
    ? parsedResponse[0]
    : parsedResponse;

  return normalizeInterviewReport(report, jobDescription);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

async function getPdfPageCount(pdfBuffer) {
  const parser = new PDFParse({ data: Uint8Array.from(pdfBuffer) });

  try {
    const info = await parser.getInfo();
    return info.total;
  } finally {
    await parser.destroy();
  }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const retryInstruction = attempt
      ? "The previous draft exceeded one page. Remove lower-priority content and tighten spacing while keeping the text readable; do not reduce the body font below 10pt."
      : "";
    const prompt = `${ONE_PAGE_RESUME_BRIEF}

${retryInstruction}

Candidate resume/source material:
${resume}

Candidate self-description:
${selfDescription}

Target job description:
${jobDescription}

Return a JSON object with exactly one field, "html". Its value must be a complete HTML document that Puppeteer can render directly. Return no markdown and no text outside the JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
      },
    });

    const jsonContent = resumePdfSchema.parse(JSON.parse(response.text));
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

    if ((await getPdfPageCount(pdfBuffer)) === 1) {
      return pdfBuffer;
    }
  }

  throw new Error("Unable to generate a readable one-page resume. Please try again.");
}

module.exports = {
  generateInterviewReport,
  generateResumePdf,
  normalizeInterviewReport,
};
