import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function startMockInterview({ role, jobDescription }) {
  const response = await api.post("/api/mock/start", { role, jobDescription });
  return response.data;
}

export async function submitMockAnswer({ sessionId, answer }) {
  const response = await api.post("/api/mock/answer", { sessionId, answer });
  return response.data;
}

export async function getNextMockQuestion(sessionId) {
  const response = await api.get(`/api/mock/next/${sessionId}`);
  return response.data;
}

export async function getMockInterviewResult(sessionId) {
  const response = await api.get(`/api/mock/result/${sessionId}`);
  return response.data;
}

export async function getMockInterviewHistory() {
  const response = await api.get("/api/mock");
  return response.data;
}
