import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-white/[0.05]" />
                        <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-[5px] rounded-full border border-indigo-400/20 border-b-indigo-400/60 animate-spin"
                            style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                    </div>
                    <p className="text-zinc-400 text-sm tracking-widest uppercase font-light">Setting up account</p>
                </motion.div>
            </main>
        )
    }

    const fields = [
        {
            id: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'your_username',
            value: username,
            onChange: (e) => setUsername(e.target.value),
            icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1.5 13.5c0-3 2.686-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            )
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'you@example.com',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M1 3.5L7.5 8.5L14 3.5M1 3h13a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5v-8A.5.5 0 011 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            id: 'password',
            label: 'Password',
            type: showPassword ? 'text' : 'password',
            placeholder: '••••••••••',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="2" y="6.5" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
            )
        }
    ]

    return (
        <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">

            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Glow orbs */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
                className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                {/* Top accent bar */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-px origin-left"
                />

                <div className="bg-[#111118]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-10 shadow-2xl shadow-black/60">

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.4, delay: 0.25, type: 'spring', stiffness: 260, damping: 18 }}
                            className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </motion.div>
                        <span className="text-white font-semibold tracking-tight text-lg">Microlyzer AI</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, delay: 0.3, ease: 'easeOut' }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Create an account</h1>
                        <p className="text-zinc-500 text-sm">Join Microlyzer AI and get started today</p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field, i) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.36 + i * 0.08, ease: 'easeOut' }}
                                className="space-y-1.5"
                            >
                                <label
                                    htmlFor={field.id}
                                    className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${focused === field.id ? 'text-violet-400' : 'text-zinc-500'}`}
                                >
                                    {field.label}
                                </label>
                                <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white/[0.03] ${focused === field.id ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]' : 'border-white/[0.07]'}`}>
                                    <div className="pl-4 pr-3 text-zinc-600">{field.icon}</div>
                                    <input
                                        onChange={field.onChange}
                                        onFocus={() => setFocused(field.id)}
                                        onBlur={() => setFocused('')}
                                        type={field.type}
                                        id={field.id}
                                        name={field.id}
                                        placeholder={field.placeholder}
                                        className="flex-1 bg-transparent py-3.5 pr-4 text-sm text-white placeholder-zinc-600 outline-none"
                                    />
                                    {/* Password toggle */}
                                    {field.id === 'password' && (
                                        <motion.button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            whileTap={{ scale: 0.85 }}
                                            className="pr-4 pl-2 text-zinc-600 hover:text-zinc-400 transition-colors"
                                            tabIndex={-1}
                                        >
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={showPassword ? 'hide' : 'show'}
                                                    initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                    exit={{ opacity: 0, rotate: 10, scale: 0.8 }}
                                                    transition={{ duration: 0.18 }}
                                                    className="block"
                                                >
                                                    {showPassword ? (
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                            <path d="M1 7.5C1 7.5 3.5 2.5 7.5 2.5S14 7.5 14 7.5 11.5 12.5 7.5 12.5 1 7.5 1 7.5z" stroke="currentColor" strokeWidth="1.2" />
                                                            <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2" />
                                                            <path d="M2 13L13 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                            <path d="M1 7.5C1 7.5 3.5 2.5 7.5 2.5S14 7.5 14 7.5 11.5 12.5 7.5 12.5 1 7.5 1 7.5z" stroke="currentColor" strokeWidth="1.2" />
                                                            <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2" />
                                                        </svg>
                                                    )}
                                                </motion.span>
                                            </AnimatePresence>
                                        </motion.button>
                                    )}
                                </div>
                                {/* Password hint */}
                                {field.id === 'password' && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.65 }}
                                        className="text-zinc-600 text-xs pl-0.5"
                                    >
                                        Use 8+ characters with a mix of letters and numbers
                                    </motion.p>
                                )}
                            </motion.div>
                        ))}

                        {/* Submit */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.62, ease: 'easeOut' }}
                        >
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative w-full mt-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium tracking-wide transition-colors duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/30 overflow-hidden"
                            >
                                <span className="relative z-10">Create account</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Terms */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.7 }}
                        className="mt-5 text-center text-zinc-600 text-xs leading-relaxed"
                    >
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">Privacy Policy</a>
                    </motion.p>

                    {/* Login link */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.76 }}
                        className="mt-6 text-center text-zinc-600 text-xs"
                    >
                        Already have an account?{' '}
                        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </motion.p>
                </div>

                {/* Bottom accent bar */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                    className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mt-px origin-right"
                />
            </motion.div>
        </main>
    )
}

export default Register