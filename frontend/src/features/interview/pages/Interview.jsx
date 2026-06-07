import React, { useState, useEffect, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import { logout } from "../../auth/services/auth.api.js";
import { motion, AnimatePresence } from 'framer-motion'

const handleLogout = async () => {
    try {
        await logout();

        navigate("/login");
    } catch (err) {
        console.log(err);
    }
};

const NAV_ITEMS = [
    {
        id: 'technical', label: 'Technical Questions', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        )
    },
    {
        id: 'behavioral', label: 'Behavioral Questions', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )
    },
    {
        id: 'roadmap', label: 'Road Map', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
        )
    },
]

// ── QuestionCard with framer-motion ───────────────────────────────────────────

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
            className={`border rounded-xl overflow-hidden transition-colors duration-300 ${open ? 'border-violet-500/30 bg-violet-500/[0.03]' : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'}`}
        >
            <div
                className="flex items-start gap-4 p-5 cursor-pointer select-none"
                onClick={() => setOpen(o => !o)}
            >
                <span className="shrink-0 w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-semibold">
                    {index + 1}
                </span>
                <p className="flex-1 text-zinc-300 text-sm leading-relaxed">{item.question}</p>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="shrink-0 text-zinc-600 mt-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </motion.span>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/[0.05]">
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: 0.08 }}
                                className="pt-4 flex flex-col gap-2"
                            >
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5 w-fit">
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
                                    Intention
                                </span>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.intention}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: 0.15 }}
                                className="flex flex-col gap-2"
                            >
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 w-fit">
                                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    Model Answer
                                </span>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.answer}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ── RoadMapDay with framer-motion ─────────────────────────────────────────────

const RoadMapDay = ({ day, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
        className="relative pl-10"
    >
        <div className="absolute left-3.5 top-8 bottom-0 w-px bg-white/[0.06]" />
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.06 + 0.1, type: 'spring', stiffness: 300 }}
            className="absolute left-2 top-5 w-3 h-3 rounded-full border-2 border-violet-500 bg-[#0a0a0f]"
        />
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-4 hover:border-white/[0.10] transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-0.5">
                    Day {day.day}
                </span>
                <h3 className="text-white text-sm font-medium">{day.focus}</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
                {day.tasks.map((task, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.06 + i * 0.04 + 0.15 }}
                        className="flex items-start gap-2.5 text-zinc-500 text-sm"
                    >
                        <div className="shrink-0 w-4 h-4 rounded border border-white/[0.08] bg-white/[0.03] flex items-center justify-center mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/50" />
                        </div>
                        {task}
                    </motion.li>
                ))}
            </ul>
        </div>
    </motion.div>
)

// ── Animated score ring ───────────────────────────────────────────────────────

const ScoreRing = ({ score, color }) => {
    const [displayed, setDisplayed] = useState(0)
    const radius = 46
    const circumference = 2 * Math.PI * radius
    const [offset, setOffset] = useState(circumference)

    useEffect(() => {
        // Animate number counter
        let start = 0
        const duration = 1400
        const step = 16
        const increment = score / (duration / step)
        const timer = setInterval(() => {
            start += increment
            if (start >= score) { start = score; clearInterval(timer) }
            setDisplayed(Math.round(start))
        }, step)

        // Animate ring
        const timeout = setTimeout(() => {
            setOffset(circumference * (1 - score / 100))
        }, 80)

        return () => { clearInterval(timer); clearTimeout(timeout) }
    }, [score])

    const strokeColor = color === 'emerald' ? '#10b981' : color === 'amber' ? '#f59e0b' : '#ef4444'
    const textColor   = color === 'emerald' ? 'text-emerald-400' : color === 'amber' ? 'text-amber-400' : 'text-red-400'

    return (
        <div className="relative flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                    cx="55" cy="55" r={radius}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 55 55)"
                    style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-3xl font-bold tabular-nums ${textColor}`}>{displayed}</span>
                <span className="text-zinc-600 text-xs">/ 100</span>
            </div>
        </div>
    )
}

// ── Section wrapper with staggered entry ──────────────────────────────────────

const SectionWrapper = ({ children, sectionKey }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={sectionKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
)

// ── Main Component ────────────────────────────────────────────────────────────

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-2">
                        <svg width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" /></svg>
                    </div>
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-white/[0.05]" />
                        <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-[5px] rounded-full border border-indigo-400/20 border-b-indigo-400/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-white/80 text-sm font-medium tracking-wide">Loading your interview plan</p>
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

    const scoreColor =
        report.matchScore >= 80 ? 'emerald' :
        report.matchScore >= 60 ? 'amber' : 'red'

    const scoreStyles = {
        emerald: { text: 'text-emerald-400', bar: 'bg-emerald-500', sub: 'Strong match for this role' },
        amber:   { text: 'text-amber-400',   bar: 'bg-amber-500',   sub: 'Moderate match — prep well' },
        red:     { text: 'text-red-400',     bar: 'bg-red-500',     sub: 'Low match — focus on gaps' },
    }[scoreColor]

    const severityStyles = {
        high:   'text-red-400 bg-red-500/10 border-red-500/20',
        medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        low:    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
            <div className="fixed top-[-20%] left-[-10%] w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-screen">

                {/* Navbar */}
                <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" /></svg>
                        </div>
                        <span className="text-white font-semibold tracking-tight">Microlyzer AI</span>
                        <span className="hidden sm:block text-white/[0.15]">·</span>
                        <span className="hidden sm:block text-zinc-500 text-sm truncate max-w-xs">{report.title || 'Interview Plan'}</span>
                    </div>
                    <div className="flex items-center gap-3">
    <button
        onClick={() => getResumePdf(interviewId)}
        className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium tracking-wide transition-all duration-200 shadow-lg shadow-violet-600/25 overflow-hidden"
    >
        <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>

        <span className="relative z-10">Download Resume</span>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>

    <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-all"
    >
        Logout
    </button>
</div>
                </header>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">

                    {/* Left Nav */}
                    <nav className="shrink-0 w-56 flex flex-col gap-1 p-4 border-r border-white/[0.06] overflow-y-auto">
                        <p className="text-zinc-600 text-[10px] font-semibold tracking-widest uppercase px-3 mb-2">Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 text-left border ${
                                    activeNav === item.id
                                        ? 'text-violet-400 border-violet-500/20'
                                        : 'text-zinc-500 hover:text-zinc-300 border-transparent hover:bg-white/[0.04]'
                                }`}
                            >
                                {activeNav === item.id && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-violet-500/10 rounded-lg"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className={`relative z-10 ${activeNav === item.id ? 'text-violet-400' : 'text-zinc-600'}`}>{item.icon}</span>
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Center Content */}
                    <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                        <SectionWrapper sectionKey={activeNav}>
                            {activeNav === 'technical' && (
                                <section className="max-w-3xl mx-auto flex flex-col gap-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-white text-xl font-semibold tracking-tight">Technical Questions</h2>
                                        <span className="text-xs text-zinc-500 bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-0.5">
                                            {report.technicalQuestions.length} questions
                                        </span>
                                    </div>
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </section>
                            )}

                            {activeNav === 'behavioral' && (
                                <section className="max-w-3xl mx-auto flex flex-col gap-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-white text-xl font-semibold tracking-tight">Behavioral Questions</h2>
                                        <span className="text-xs text-zinc-500 bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-0.5">
                                            {report.behavioralQuestions.length} questions
                                        </span>
                                    </div>
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </section>
                            )}

                            {activeNav === 'roadmap' && (
                                <section className="max-w-3xl mx-auto flex flex-col gap-2">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h2 className="text-white text-xl font-semibold tracking-tight">Preparation Road Map</h2>
                                        <span className="text-xs text-zinc-500 bg-white/[0.05] border border-white/[0.08] rounded-full px-2.5 py-0.5">
                                            {report.preparationPlan.length}-day plan
                                        </span>
                                    </div>
                                    {report.preparationPlan.map((day, i) => (
                                        <RoadMapDay key={day.day} day={day} index={i} />
                                    ))}
                                </section>
                            )}
                        </SectionWrapper>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="shrink-0 w-64 flex flex-col border-l border-white/[0.06] overflow-y-auto">

                        {/* Match Score */}
                        <div className="p-6 flex flex-col items-center gap-4 border-b border-white/[0.06]">
                            <p className="text-zinc-600 text-[10px] font-semibold tracking-widest uppercase self-start">Match Score</p>
                            <ScoreRing score={report.matchScore} color={scoreColor} />
                            <p className={`text-xs font-medium ${scoreStyles.text}`}>{scoreStyles.sub}</p>
                            <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full ${scoreStyles.bar}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${report.matchScore}%` }}
                                    transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                                />
                            </div>
                        </div>

                        {/* Skill Gaps */}
                        <div className="p-6 flex flex-col gap-4">
                            <p className="text-zinc-600 text-[10px] font-semibold tracking-widest uppercase">Skill Gaps</p>
                            <motion.div
                                className="flex flex-wrap gap-2"
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                            >
                                {report.skillGaps.map((gap, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${severityStyles[gap.severity] || severityStyles.medium}`}
                                    >
                                        {gap.skill}
                                    </motion.span>
                                ))}
                            </motion.div>

                            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.05]">
                                <p className="text-zinc-700 text-[10px] uppercase tracking-widest">Severity</p>
                                {[['high', 'Critical gap', 'bg-red-500'], ['medium', 'Moderate gap', 'bg-amber-500'], ['low', 'Minor gap', 'bg-emerald-500']].map(([sev, label, dot]) => (
                                    <div key={sev} className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${dot}`} />
                                        <span className="text-zinc-600 text-xs">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview