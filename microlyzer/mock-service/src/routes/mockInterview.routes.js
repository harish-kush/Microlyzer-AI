const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const mockInterviewController = require("../controllers/mockInterview.controller");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    service: "mock-service",
    status: "healthy",
  });
});

router.post(
  "/start",
  authMiddleware.authUser,
  mockInterviewController.startMockInterviewController,
);
router.post(
  "/answer",
  authMiddleware.authUser,
  mockInterviewController.submitMockAnswerController,
);
router.get(
  "/next/:sessionId",
  authMiddleware.authUser,
  mockInterviewController.getNextMockQuestionController,
);
router.get(
  "/result/:sessionId",
  authMiddleware.authUser,
  mockInterviewController.getMockInterviewResultController,
);
router.get(
  "/",
  authMiddleware.authUser,
  mockInterviewController.getMockInterviewHistoryController,
);

module.exports = router;
