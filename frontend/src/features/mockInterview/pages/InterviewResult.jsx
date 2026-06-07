import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useMockInterview } from "../hooks/useMockInterview.js";

const ProgressBar = ({ label, value, color }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between text-sm text-zinc-400">
      <span>{label}</span>
      <span className="font-semibold text-white">{value}%</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-white/8">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const InterviewResult = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { loading, result, getResult } = useMockInterview();

  useEffect(() => {
    if (!result || result.sessionId !== sessionId) {
      getResult(sessionId);
    }
  }, [sessionId, result]);

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        Generating final performance summary...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8 sm:px-6 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">
                Final Result
              </p>
              <h1 className="mt-2 text-4xl font-semibold">
                Your AI interview performance
              </h1>
            </div>
            <button
              onClick={() => navigate(`/mock-interview`)}
              className="rounded-3xl border border-white/8 bg-white/5 px-5 py-3 text-sm text-zinc-200 hover:border-violet-500/40"
            >
              Back to setup
            </button>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-3xl border border-white/6 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-zinc-400">Overall Score</p>
                <p className="mt-2 text-5xl font-semibold text-white">
                  {result.overallScore}
                </p>
              </div>
              <div className="rounded-3xl bg-[#111118] p-5 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Interview
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {result.role}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <ProgressBar
                label="Technical"
                value={result.averageTechnical}
                color="bg-emerald-400"
              />
              <ProgressBar
                label="Communication"
                value={result.averageCommunication}
                color="bg-amber-400"
              />
              <ProgressBar
                label="Confidence"
                value={result.averageConfidence}
                color="bg-red-400"
              />
            </div>

            <div className="mt-10 grid gap-6">
              <div className="rounded-3xl border border-white/[0.08] bg-[#111118] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-300/80">
                  Strengths
                </p>
                <p className="mt-4 text-zinc-300 leading-7">
                  {result.strengths}
                </p>
              </div>
              <div className="rounded-3xl border border-white/[0.08] bg-[#111118] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300/80">
                  Weaknesses
                </p>
                <p className="mt-4 text-zinc-300 leading-7">
                  {result.weaknesses}
                </p>
              </div>
              <div className="rounded-3xl border border-white/[0.08] bg-[#111118] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300/80">
                  Improvement Areas
                </p>
                <p className="mt-4 text-zinc-300 leading-7">
                  {result.improvementAreas}
                </p>
              </div>
              <div className="rounded-3xl border border-white/[0.08] bg-[#111118] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-300/80">
                  Preparation Roadmap
                </p>
                <p className="mt-4 text-zinc-300 leading-7">{result.roadmap}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/6 bg-[#111118] p-6 shadow-2xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">
                Session analytics
              </p>
              <p className="mt-4 text-sm text-zinc-400 leading-7">
                {result.analytics}
              </p>
            </div>
            <div className="rounded-3xl border border-white/6 bg-[#111118] p-6 overflow-x-auto">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80 mb-4">
                Question scores
              </p>
              <table className="min-w-full text-left text-sm text-zinc-300">
                <thead>
                  <tr>
                    <th className="pb-3 text-zinc-500">#</th>
                    <th className="pb-3 text-zinc-500">Question</th>
                    <th className="pb-3 text-zinc-500">Tech</th>
                    <th className="pb-3 text-zinc-500">Comm</th>
                    <th className="pb-3 text-zinc-500">Conf</th>
                  </tr>
                </thead>
                <tbody>
                  {result.questions.map((item, index) => (
                    <tr key={index} className="border-t border-white/6">
                      <td className="py-3 pr-4 font-semibold text-white">
                        {index + 1}
                      </td>
                      <td className="py-3 pr-4 text-zinc-300">
                        {item.question}
                      </td>
                      <td
                        className={`py-3 pr-4 font-semibold ${scoreClass(item.score.technical)}`}
                      >
                        {item.score.technical}
                      </td>
                      <td
                        className={`py-3 pr-4 font-semibold ${scoreClass(item.score.communication)}`}
                      >
                        {item.score.communication}
                      </td>
                      <td
                        className={`py-3 pr-4 font-semibold ${scoreClass(item.score.confidence)}`}
                      >
                        {item.score.confidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

function scoreClass(score) {
  if (score >= 8) return "text-emerald-300";
  if (score >= 5) return "text-amber-300";
  return "text-red-400";
}

export default InterviewResult;
