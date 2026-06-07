import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

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
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-zinc-400 text-sm tracking-widest uppercase font-light">Setting up account</p>
                </div>
            </main>
        )
    }

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
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-4">

                {/* Top accent bar */}
                <div className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-px" />

                <div className="bg-[#111118]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-10 shadow-2xl shadow-black/60">

                    {/* Logo mark */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold tracking-tight text-lg">Microlyzer AI</span>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
                            Create an account
                        </h1>
                        <p className="text-zinc-500 text-sm">Join Microlyzer AI and get started today</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="username"
                                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${focused === 'username' ? 'text-violet-400' : 'text-zinc-500'}`}
                            >
                                Username
                            </label>
                            <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white/[0.03] ${focused === 'username' ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]' : 'border-white/[0.07]'}`}>
                                <div className="pl-4 pr-3 text-zinc-600">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M1.5 13.5c0-3 2.686-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setFocused('username')}
                                    onBlur={() => setFocused('')}
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="your_username"
                                    className="flex-1 bg-transparent py-3.5 pr-4 text-sm text-white placeholder-zinc-600 outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="email"
                                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${focused === 'email' ? 'text-violet-400' : 'text-zinc-500'}`}
                            >
                                Email
                            </label>
                            <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white/[0.03] ${focused === 'email' ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]' : 'border-white/[0.07]'}`}>
                                <div className="pl-4 pr-3 text-zinc-600">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <path d="M1 3.5L7.5 8.5L14 3.5M1 3h13a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5v-8A.5.5 0 011 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused('')}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="flex-1 bg-transparent py-3.5 pr-4 text-sm text-white placeholder-zinc-600 outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="password"
                                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${focused === 'password' ? 'text-violet-400' : 'text-zinc-500'}`}
                            >
                                Password
                            </label>
                            <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-white/[0.03] ${focused === 'password' ? 'border-violet-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]' : 'border-white/[0.07]'}`}>
                                <div className="pl-4 pr-3 text-zinc-600">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        <rect x="2" y="6.5" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused('')}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="••••••••••"
                                    className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder-zinc-600 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="pr-4 pl-2 text-zinc-600 hover:text-zinc-400 transition-colors"
                                    tabIndex={-1}
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
                                </button>
                            </div>

                            {/* Password strength hint */}
                            <p className="text-zinc-600 text-xs pl-0.5">Use 8+ characters with a mix of letters and numbers</p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="group relative w-full mt-2 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium tracking-wide transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/30 overflow-hidden"
                        >
                            <span className="relative z-10">Create account</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>

                    </form>

                    

                    {/* Terms */}
                    <p className="mt-5 text-center text-zinc-600 text-xs leading-relaxed">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">Terms</a>
                        {' '}and{' '}
                        <a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2">Privacy Policy</a>
                    </p>

                    {/* Login link */}
                    <p className="mt-6 text-center text-zinc-600 text-xs">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>

                {/* Bottom accent bar */}
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mt-px" />
            </div>
        </main>
    )
}

export default Register