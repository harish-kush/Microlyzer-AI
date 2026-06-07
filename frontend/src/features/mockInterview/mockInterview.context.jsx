import { createContext, useState } from "react";
import {
  startMockInterview as apiStartMockInterview,
  submitMockAnswer as apiSubmitMockAnswer,
  getNextMockQuestion as apiGetNextMockQuestion,
  getMockInterviewResult as apiGetMockInterviewResult,
  getMockInterviewHistory as apiGetMockInterviewHistory,
} from "./services/mockInterview.api.js";

export const MockInterviewContext = createContext();

export const MockInterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const startInterview = async ({ role, jobDescription }) => {
    setLoading(true);
    try {
      const response = await apiStartMockInterview({ role, jobDescription });
      const newSession = {
        sessionId: response.sessionId,
        totalQuestions: response.totalQuestions,
        currentQuestionIndex: 0,
        status: "in-progress",
      };
      setSession(newSession);
      setCurrentQuestion(response.firstQuestion);
      setEvaluation(null);
      setResult(null);
      return newSession;
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async ({ sessionId, answer }) => {
    setLoading(true);
    try {
      const response = await apiSubmitMockAnswer({ sessionId, answer });
      setEvaluation(response.score);
      if (session) {
        setSession((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
        }));
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = async (sessionId) => {
    setLoading(true);
    try {
      const response = await apiGetNextMockQuestion(sessionId);
      if (response.completed) {
        setCurrentQuestion(null);
        return response;
      }
      setCurrentQuestion(response.question);
      setEvaluation(null);
      setSession((prev) => ({
        ...prev,
        sessionId,
        currentQuestionIndex: response.questionNumber - 1,
        totalQuestions: response.totalQuestions,
        status: "in-progress",
      }));
      return response;
    } finally {
      setLoading(false);
    }
  };

  const getResult = async (sessionId) => {
    setLoading(true);
    try {
      const response = await apiGetMockInterviewResult(sessionId);
      const payload = { ...response, sessionId };
      setResult(payload);
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const getHistory = async () => {
    setLoading(true);
    try {
      const response = await apiGetMockInterviewHistory();
      setHistory(response.history);
      return response.history;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MockInterviewContext.Provider
      value={{
        loading,
        session,
        currentQuestion,
        evaluation,
        result,
        history,
        startInterview,
        submitAnswer,
        nextQuestion,
        getResult,
        getHistory,
        setCurrentQuestion,
        setResult,
        setEvaluation,
      }}
    >
      {children}
    </MockInterviewContext.Provider>
  );
};
