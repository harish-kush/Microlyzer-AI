import { useContext } from "react";
import { MockInterviewContext } from "../mockInterview.context.jsx";

export const useMockInterview = () => {
  const context = useContext(MockInterviewContext);

  if (!context) {
    throw new Error(
      "useMockInterview must be used within a MockInterviewProvider",
    );
  }

  return context;
};
