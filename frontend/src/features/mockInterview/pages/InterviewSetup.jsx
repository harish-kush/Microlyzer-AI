import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useMockInterview } from "../hooks/useMockInterview.js";

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Custom",
];

const InterviewSetup = () => {
  const navigate = useNavigate();
  const { loading, startInterview, history, getHistory } = useMockInterview();
  const [role, setRole] = useState(ROLES[0]);
  const [customRole, setCustomRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    getHistory();
  }, []);

  const selectedRole = role === "Custom" ? customRole.trim() : role;

  const handleStart = async () => {
    if (!selectedRole || !jobDescription.trim()) return;

    const session = await startInterview({
      role: selectedRole,
      jobDescription: jobDescription.trim(),
    });
    if (session?.sessionId) {
      navigate(`/mock-interview/session/${session.sessionId}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-4 py-8 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            AI Mock Interview
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight">
              Practice with a smart AI interviewer
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              Choose a role, paste the job description, and run a full mock
              interview session with score-based feedback and a final
              performance summary.
            </p>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]"
        >
          <div className="rounded-3xl border border-white/6 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <div className="mb-6 space-y-3">
              <h2 className="text-xl font-semibold">Interview Setup</h2>
              <p className="text-zinc-500">
                Select the role and paste the job description to generate
                tailored interview questions.
              </p>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Role
                </label>
                <select
                  className="w-full rounded-2xl border border-white/[0.08] bg-[#111118] px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-violet-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {role === "Custom" && (
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Custom Role
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/8 bg-[#111118] px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-violet-500"
                    placeholder="Enter your custom role"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Job Description
                </label>
                <textarea
                  className="min-h-60 w-full rounded-3xl border border-white/8 bg-[#111118] px-4 py-4 text-sm text-zinc-200 outline-none transition focus:border-violet-500 resize-none"
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={!selectedRole || !jobDescription.trim() || loading}
              onClick={handleStart}
              className="mt-8 inline-flex items-center justify-center rounded-3xl bg-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Starting interview..." : "Start Interview"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/6 bg-white/5 p-6 shadow-2xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Interview History</h3>
                  <p className="text-zinc-500 text-sm">
                    Recent sessions ordered by latest.
                  </p>
                </div>
                <button
                  onClick={getHistory}
                  className="rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-zinc-300 hover:border-violet-500/40"
                >
                  Refresh
                </button>
              </div>

              <div className="space-y-3">
                {history.length === 0 && (
                  <p className="text-zinc-500 text-sm">
                    No mock interview sessions yet. Create one to see history
                    here.
                  </p>
                )}
                {history.slice(0, 4).map((item) => (
                  <motion.button
                    key={item._id}
                    whileHover={{ x: 4 }}
                    onClick={() =>
                      navigate(
                        item.status === "completed"
                          ? `/mock-interview/result/${item._id}`
                          : `/mock-interview/session/${item._id}`,
                      )
                    }
                    className="w-full rounded-3xl border border-white/8 bg-[#111118] p-4 text-left transition hover:border-violet-500/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.role}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${item.status === "completed" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    {item.overallScore > 0 && (
                      <div className="mt-4 flex items-center justify-between text-sm text-zinc-300">
                        <span>Score</span>
                        <span className="font-semibold text-white">
                          {item.overallScore}
                        </span>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/6 bg-white/5 p-6 shadow-2xl shadow-black/20">
              <h3 className="text-lg font-semibold mb-3">Why this helps</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>• Real-time AI evaluation for every answer.</li>
                <li>• Question-by-question coaching feedback.</li>
                <li>• Final strengths and improvement roadmap.</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default InterviewSetup;
