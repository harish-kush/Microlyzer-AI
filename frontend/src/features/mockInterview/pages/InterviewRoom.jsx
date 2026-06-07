import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useMockInterview } from "../hooks/useMockInterview.js";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

const OverviewCard = ({ label, value, accent }) => (
  <div
    className={`rounded-3xl border border-white/8 bg-[#111118] p-5 text-center ${accent}`}
  >
    <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">{label}</p>
    <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
  </div>
);

const scoreClass = (score) => {
  if (score >= 8) return "text-emerald-300";
  if (score >= 5) return "text-amber-300";
  return "text-red-400";
};

const InterviewRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    session,
    currentQuestion,
    evaluation,
    submitAnswer,
    nextQuestion,
    setEvaluation,
  } = useMockInterview();
  const [answer, setAnswer] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
        if (!currentQuestion || session?.sessionId !== sessionId) {
        nextQuestion(sessionId);
        }
    }, [sessionId]);

    useEffect(() => {
    setAnswer(transcript);
    }, [transcript]);

    useEffect(() => {
    if (!currentQuestion) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
        currentQuestion
    );

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);

    return () => {
        speechSynthesis.cancel();
    };
    }, [currentQuestion]);

    useEffect(() => {
    return () => {
        speechSynthesis.cancel();
    };
    }, []);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    await submitAnswer({ sessionId, answer: answer.trim() });
  };

  const startRecording = () => {
        resetTranscript();

        SpeechRecognition.startListening({
            continuous: true,
            language: "en-US",
        });
        };

    const stopRecording = () => {
    SpeechRecognition.stopListening();
    };

    const speakQuestion = (text) => {
        if (!text) return;

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);
    };



  const handleNext = async () => {
        speechSynthesis.cancel();
        const response = await nextQuestion(sessionId);

        if (response.completed) {
            navigate(`/mock-interview/result/${sessionId}`);
            return;
        }

        resetTranscript();
        setAnswer("");
        setEvaluation(null);
    };


  if (loading && !currentQuestion) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        Loading mock interview...
      </div>
    );
  }

  if (!browserSupportsSpeechRecognition) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
      Browser does not support speech recognition.
    </div>
  );
}

  if (!currentQuestion && session?.status === "completed") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-8 text-white">
        <div className="max-w-xl rounded-3xl border border-white/6 bg-white/5 p-10 text-center shadow-2xl shadow-black/30">
          <h2 className="text-3xl font-semibold">Interview completed</h2>
          <p className="mt-3 text-zinc-400">
            Your session is finished. Review your final performance summary now.
          </p>
          <button
            onClick={() => navigate(`/mock-interview/result/${sessionId}`)}
            className="mt-8 rounded-3xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-400"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8 sm:px-6 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">
                Mock Interview Room
              </p>
              <h1 className="mt-2 text-4xl font-semibold">
                Answer each question and get instant AI feedback.
              </h1>
            </div>
            <button
              onClick={() => navigate(`/mock-interview`)}
              className="rounded-3xl border border-white/8 bg-white/5 px-5 py-3 text-sm text-zinc-200 hover:border-violet-500/40"
            >
              Back to setup
            </button>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]"
        >
          <div className="rounded-3xl border border-white/6 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-zinc-400">
                  Question {session?.currentQuestionIndex + 1} of{" "}
                  {session?.totalQuestions}
                </p>
                <div className="mt-2 flex items-start gap-3">
                    <h2 className="text-2xl font-semibold flex-1">
                        {currentQuestion}
                    </h2>

                    <button
                        type="button"
                        onClick={() => speakQuestion(currentQuestion)}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-violet-500/40"
                    >
                        🔊
                    </button>
                    </div>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={startRecording}
                    disabled={listening}
                    className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                    🎤 Start Speaking
                </button>

                <button
                    type="button"
                    onClick={stopRecording}
                    disabled={!listening}
                    className="rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                    ⏹ Stop
                </button>

                {listening && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    Listening...
                    </div>
                )}
                </div>
                
                <textarea
                    value={answer}
                    readOnly
                    rows={10}
                    placeholder="Your speech will appear here..."
                    className="w-full rounded-3xl border border-white/8 bg-[#111118] px-5 py-5 text-sm text-zinc-100 outline-none transition focus:border-violet-500 resize-none"
                    />

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <button
                  disabled={!answer.trim() || loading}
                  onClick={handleSubmit}
                  className="rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Answer
                </button>
                <button
                  disabled={!evaluation || loading}
                  onClick={handleNext}
                  className="rounded-3xl border border-white/8 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next Question
                </button>
              </div>
              {evaluation && (
                <p className="text-zinc-400 text-sm">
                  AI evaluation received — move to the next question when ready.
                </p>
              )}
            </div>

            {evaluation && (
              <div className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <OverviewCard
                    label="Technical"
                    value={evaluation.technical}
                    accent=""
                  />
                  <OverviewCard
                    label="Communication"
                    value={evaluation.communication}
                    accent=""
                  />
                  <OverviewCard
                    label="Confidence"
                    value={evaluation.confidence}
                    accent=""
                  />
                </div>
                <div className="rounded-3xl border border-white/8 bg-[#111118] p-6">
                  <p className="text-sm font-semibold text-white">
                    AI Feedback
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">
                    {evaluation.feedback}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/6 bg-[#111118] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">
                Session
              </p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-white/8 bg-black/30 p-5">
                  <p className="text-sm text-zinc-400">Session ID</p>
                  <p className="mt-2 text-sm text-white break-all">
                    {session?.sessionId}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/8 bg-black/30 p-5">
                  <p className="text-sm text-zinc-400">Progress</p>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full bg-violet-500"
                      style={{
                        width: `${((session?.currentQuestionIndex || 0) / (session?.totalQuestions || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/6 bg-[#111118] p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">
                Tips
              </p>
              <ul className="mt-5 space-y-3 text-sm text-zinc-400">
                <li>• Answer clearly, then hit submit to evaluate.</li>
                <li>• Use the AI feedback to improve your next response.</li>
                <li>• When all questions are done, view your final results.</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default InterviewRoom;
