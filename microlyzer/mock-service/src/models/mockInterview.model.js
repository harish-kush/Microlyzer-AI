const mongoose = require("mongoose");

const mockInterviewQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
  score: {
    technical: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
  },
  feedback: { type: String, default: "" },
});

const mockInterviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true },
    jobDescription: { type: String, required: true },
    questions: { type: [mockInterviewQuestionSchema], default: [] },
    currentQuestionIndex: { type: Number, default: 0 },
    overallScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    summary: {
      strengths: { type: String, default: "" },
      weaknesses: { type: String, default: "" },
      improvementAreas: { type: String, default: "" },
      roadmap: { type: String, default: "" },
      analytics: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MockInterview", mockInterviewSchema);
