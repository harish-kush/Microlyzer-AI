const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const questionSchema = z.object({
  questions: z.array(z.string().min(1)).min(1).max(20),
});

const evaluationSchema = z.object({
  technical: z.number().min(0).max(10),
  communication: z.number().min(0).max(10),
  confidence: z.number().min(0).max(10),
  feedback: z.string().min(1),
});

const summarySchema = z.object({
  strengths: z.string().min(1),
  weaknesses: z.string().min(1),
  improvementAreas: z.string().min(1),
  roadmap: z.string().min(1),
  analytics: z.string().min(1),
});

async function generateMockInterviewQuestions({ role, jobDescription }) {
  const prompt = `Generate 10 interview questions for the following role and job description. Return ONLY valid JSON in the format: {\n  "questions": ["Question 1", "Question 2", ...]\n}\nRole: ${role}\nJob Description: ${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(questionSchema),
    },
  });

  return JSON.parse(response.text).questions;
}

async function evaluateMockInterviewAnswer({ question, answer }) {
  const prompt = `You are a senior interviewer. Evaluate the candidate answer.
Question:
${question}

Answer:
${answer}

Return ONLY valid JSON:
{
  "technical": 8,
  "communication": 7,
  "confidence": 6,
  "feedback": "Detailed feedback..."
}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(evaluationSchema),
    },
  });

  return JSON.parse(response.text);
}

async function generateMockInterviewSummary({
  role,
  jobDescription,
  questions,
}) {
  const sessionPayload = questions
    .map((item, index) => {
      return `Question ${index + 1}: ${item.question}\nAnswer: ${item.answer}\nScores: technical=${item.score.technical}, communication=${item.score.communication}, confidence=${item.score.confidence}\nFeedback: ${item.feedback}`;
    })
    .join("\n\n");

  const prompt = `Based on the full interview session below, generate a JSON object containing strengths, weaknesses, improvementAreas, roadmap, and analytics.

Role: ${role}
Job Description: ${jobDescription}

Session Data:
${sessionPayload}

Return ONLY valid JSON in this shape:
{
  "strengths": "...",
  "weaknesses": "...",
  "improvementAreas": "...",
  "roadmap": "...",
  "analytics": "..."
}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(summarySchema),
    },
  });

  return JSON.parse(response.text);
}

module.exports = {
  generateMockInterviewQuestions,
  evaluateMockInterviewAnswer,
  generateMockInterviewSummary,
};
