const mockInterviewModel = require("../models/mockInterview.model");
const {
  generateMockInterviewQuestions,
  evaluateMockInterviewAnswer,
  generateMockInterviewSummary,
} = require("../services/mockInterview.service");

async function startMockInterviewController(req, res) {
  const { role, jobDescription } = req.body;

  if (!role || !jobDescription) {
    return res
      .status(400)
      .json({ message: "Role and job description are required." });
  }

  const questions = await generateMockInterviewQuestions({
    role,
    jobDescription,
  });

  if (!questions || !questions.length) {
    return res
      .status(500)
      .json({ message: "Failed to generate interview questions." });
  }

  const session = await mockInterviewModel.create({
    user: req.user.id,
    role,
    jobDescription,
    questions: questions.map((question) => ({
      question,
      answer: "",
      score: { technical: 0, communication: 0, confidence: 0 },
      feedback: "",
    })),
    currentQuestionIndex: 0,
    status: "in-progress",
  });

  return res.status(201).json({
    sessionId: session._id,
    firstQuestion: session.questions[0]?.question || null,
    totalQuestions: session.questions.length,
  });
}

async function submitMockAnswerController(req, res) {
  const { sessionId, answer } = req.body;

  if (!sessionId || typeof answer !== "string") {
    return res
      .status(400)
      .json({ message: "sessionId and answer are required." });
  }

  const session = await mockInterviewModel.findOne({
    _id: sessionId,
    user: req.user.id,
  });

  if (!session) {
    return res.status(404).json({ message: "Interview session not found." });
  }

  if (
    session.status === "completed" &&
    session.currentQuestionIndex >= session.questions.length
  ) {
    return res
      .status(400)
      .json({ message: "Interview session is already completed." });
  }

  const index = session.currentQuestionIndex;

  if (index >= session.questions.length) {
    return res.status(400).json({ message: "No active question remaining." });
  }

  const currentQuestion = session.questions[index].question;

  const evaluation = await evaluateMockInterviewAnswer({
    question: currentQuestion,
    answer,
  });

  session.questions[index].answer = answer;
  session.questions[index].score = {
    technical: evaluation.technical,
    communication: evaluation.communication,
    confidence: evaluation.confidence,
  };
  session.questions[index].feedback = evaluation.feedback;
  session.currentQuestionIndex += 1;

  if (session.currentQuestionIndex >= session.questions.length) {
    session.status = "completed";
  }

  await session.save();

  return res
    .status(200)
    .json({ score: evaluation, feedback: evaluation.feedback });
}

async function getNextMockQuestionController(req, res) {
  const { sessionId } = req.params;

  const session = await mockInterviewModel.findOne({
    _id: sessionId,
    user: req.user.id,
  });

  if (!session) {
    return res.status(404).json({ message: "Interview session not found." });
  }

  if (session.currentQuestionIndex >= session.questions.length) {
    return res.status(200).json({ completed: true });
  }

  return res.status(200).json({
    question: session.questions[session.currentQuestionIndex].question,
    questionNumber: session.currentQuestionIndex + 1,
    totalQuestions: session.questions.length,
  });
}

async function getMockInterviewResultController(req, res) {
  const { sessionId } = req.params;

  const session = await mockInterviewModel.findOne({
    _id: sessionId,
    user: req.user.id,
  });

  if (!session) {
    return res.status(404).json({ message: "Interview session not found." });
  }

  const total = session.questions.length || 1;
  const totalTechnical = session.questions.reduce(
    (sum, item) => sum + (item.score.technical || 0),
    0,
  );
  const totalCommunication = session.questions.reduce(
    (sum, item) => sum + (item.score.communication || 0),
    0,
  );
  const totalConfidence = session.questions.reduce(
    (sum, item) => sum + (item.score.confidence || 0),
    0,
  );

  const averageTechnical = Math.round(totalTechnical / total);
  const averageCommunication = Math.round(totalCommunication / total);
  const averageConfidence = Math.round(totalConfidence / total);
  const overallScore = Math.round(
    (averageTechnical + averageCommunication + averageConfidence) / 3,
  );

  let summary = session.summary;

  if (!summary || !summary.strengths) {
    const generated = await generateMockInterviewSummary({
      role: session.role,
      jobDescription: session.jobDescription,
      questions: session.questions,
    });

    session.summary = generated;
    session.overallScore = overallScore;
    session.status = "completed";
    await session.save();
    summary = generated;
  }

  return res.status(200).json({
    overallScore,
    averageTechnical,
    averageCommunication,
    averageConfidence,
    strengths: summary.strengths,
    weaknesses: summary.weaknesses,
    improvementAreas: summary.improvementAreas,
    roadmap: summary.roadmap,
    analytics: summary.analytics,
    questions: session.questions,
    status: session.status,
    role: session.role,
    jobDescription: session.jobDescription,
    createdAt: session.createdAt,
  });
}

async function getMockInterviewHistoryController(req, res) {
  const history = await mockInterviewModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 });

  return res.status(200).json({ history });
}

module.exports = {
  startMockInterviewController,
  submitMockAnswerController,
  getNextMockQuestionController,
  getMockInterviewResultController,
  getMockInterviewHistoryController,
};
