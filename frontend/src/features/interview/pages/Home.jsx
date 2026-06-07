import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { logout } from "../../auth/services/auth.api.js";

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [dragOver, setDragOver] = useState(false)
    const [fileName, setFileName] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleLogout = async () => {
    try {
        await logout();

        navigate("/login");
    } catch (err) {
        console.log(err);
    }
};

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-2">
                        <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
                        </svg>
                    </div>
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-white/[0.05]" />
                        <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-[5px] rounded-full border border-indigo-400/20 border-b-indigo-400/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-white/80 text-sm font-medium tracking-wide">Building your interview plan</p>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase">Microlyzer AI</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-violet-500/60 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                </div>
            </main>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">

            {/* Background */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />
            <div className="fixed top-[-20%] left-[-10%] w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10">

                {/* Navbar */}
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold tracking-tight text-lg">
                            Microlyzer AI
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-all"
                    >
                        Logout
                    </button>
                </nav>

                {/* Hero Header */}
                <header className="text-center flex flex-col items-center gap-4 pt-4">
                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-violet-400 text-xs tracking-wide">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                        </svg>
                        AI-Powered Interview Intelligence
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight max-w-2xl">
                        Create Your Custom{' '}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            Interview Plan
                        </span>
                    </h1>
                    <p className="text-zinc-500 text-base max-w-lg leading-relaxed">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                {/* Main Card */}
                <div className="bg-[#111118]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">

                    {/* Top accent */}
                    <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

                    <div className="flex flex-col lg:flex-row">

                        {/* Left Panel — Job Description */}
                        <div className="flex-1 p-8 flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-violet-400 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" />
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white font-medium text-sm">Target Job Description</h2>
                                    <p className="text-zinc-600 text-xs">Paste the full JD for best results</p>
                                </div>
                                <span className="ml-auto text-[10px] font-medium tracking-wide uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-0.5">
                                    Required
                                </span>
                            </div>

                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                maxLength={5000}
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                className="flex-1 min-h-[280px] w-full bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-sm text-zinc-300 placeholder-zinc-600 outline-none resize-none transition-all duration-200 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] leading-relaxed"
                            />
                            <p className="text-zinc-700 text-xs text-right">0 / 5000 chars</p>
                        </div>

                        {/* Vertical Divider */}
                        <div className="hidden lg:block w-px bg-white/[0.06] my-8" />
                        <div className="lg:hidden h-px bg-white/[0.06] mx-8" />

                        {/* Right Panel — Profile */}
                        <div className="flex-1 p-8 flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-violet-400 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white font-medium text-sm">Your Profile</h2>
                                    <p className="text-zinc-600 text-xs">Resume or quick description</p>
                                </div>
                            </div>

                            {/* Dropzone */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500 text-xs font-medium uppercase tracking-wide">Upload Resume</span>
                                    <span className="text-[10px] font-medium tracking-wide uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                                        Best Results
                                    </span>
                                </div>
                                <label
                                    htmlFor="resume"
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => {
                                        e.preventDefault(); setDragOver(false)
                                        const f = e.dataTransfer.files[0]
                                        if (f) { setFileName(f.name); resumeInputRef.current.files = e.dataTransfer.files }
                                    }}
                                    className={`flex flex-col items-center justify-center gap-2 py-7 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${dragOver ? 'border-violet-500/60 bg-violet-500/[0.07]' : fileName ? 'border-emerald-500/40 bg-emerald-500/[0.04]' : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'}`}
                                >
                                    {fileName ? (
                                        <>
                                            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                            <p className="text-emerald-400 text-xs font-medium">{fileName}</p>
                                            <p className="text-zinc-600 text-xs">Click to replace</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="16 16 12 12 8 16" />
                                                    <line x1="12" y1="12" x2="12" y2="21" />
                                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                                </svg>
                                            </div>
                                            <p className="text-zinc-400 text-xs font-medium">Click to upload or drag & drop</p>
                                            <p className="text-zinc-700 text-xs">PDF or DOCX · Max 5MB</p>
                                        </>
                                    )}
                                    <input
                                        ref={resumeInputRef}
                                        hidden type="file" id="resume" name="resume" accept=".pdf,.docx"
                                        onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                                    />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-white/[0.06]" />
                                <span className="text-zinc-600 text-xs">or</span>
                                <div className="flex-1 h-px bg-white/[0.06]" />
                            </div>

                            {/* Self Description */}
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="selfDescription" className="text-zinc-500 text-xs font-medium uppercase tracking-wide">
                                    Quick Self-Description
                                </label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id="selfDescription"
                                    name="selfDescription"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    className="min-h-[100px] w-full bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 text-sm text-zinc-300 placeholder-zinc-600 outline-none resize-none transition-all duration-200 focus:border-violet-500/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] leading-relaxed"
                                />
                            </div>

                            {/* Info box */}
                            <div className="flex items-start gap-3 bg-indigo-500/[0.06] border border-indigo-500/20 rounded-xl p-3.5">
                                <div className="text-indigo-400 mt-0.5 shrink-0">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" stroke="#0a0a0f" strokeWidth="2" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" stroke="#0a0a0f" strokeWidth="2" />
                                    </svg>
                                </div>
                                <p className="text-zinc-500 text-xs leading-relaxed">
                                    Either a <span className="text-zinc-300 font-medium">Resume</span> or a <span className="text-zinc-300 font-medium">Self Description</span> is required to generate a personalized plan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-white/[0.06] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
                        <div className="flex items-center gap-2 text-zinc-600 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                            AI-Powered Strategy Generation · Approx 30s
                        </div>
                        <button
                            onClick={handleGenerateReport}
                            className="group relative flex items-center gap-2.5 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium tracking-wide transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/35 overflow-hidden"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                            </svg>
                            <span className="relative z-10">Generate My Interview Strategy</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>
                    </div>

                    {/* Bottom accent */}
                    <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                </div>

                {/* Recent Reports */}
                {reports.length > 0 && (
                    <section className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <h2 className="text-white font-semibold text-lg tracking-tight">My Recent Interview Plans</h2>
                            <div className="flex-1 h-px bg-white/[0.05]" />
                            <span className="text-zinc-600 text-xs">{reports.length} plan{reports.length !== 1 ? 's' : ''}</span>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reports.map(report => (
                                <li
                                    key={report._id}
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    className="group bg-[#111118]/90 border border-white/[0.06] rounded-xl p-5 cursor-pointer hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h3 className="text-white text-sm font-medium leading-snug group-hover:text-violet-300 transition-colors line-clamp-2">
                                            {report.title || 'Untitled Position'}
                                        </h3>
                                        <div className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                                            report.matchScore >= 80
                                                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                                : report.matchScore >= 60
                                                ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                                : 'text-red-400 bg-red-500/10 border-red-500/20'
                                        }`}>
                                            {report.matchScore}%
                                        </div>
                                    </div>
                                    <p className="text-zinc-600 text-xs">
                                        {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    <div className="mt-4 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${
                                                report.matchScore >= 80 ? 'bg-emerald-500' : report.matchScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${report.matchScore}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Footer */}
                <footer className="flex items-center justify-center gap-6 py-4 border-t border-white/[0.04]">
                    {['Privacy Policy', 'Terms of Service', 'Help Center'].map(link => (
                        <a key={link} href="#" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">
                            {link}
                        </a>
                    ))}
                </footer>
            </div>
        </div>
    )
}

export default Home