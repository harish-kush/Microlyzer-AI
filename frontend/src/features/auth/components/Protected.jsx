import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
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
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-6">

                    {/* Logo */}
                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/30 mb-2">
                        <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" fill="white" fillOpacity="0.9" />
                        </svg>
                    </div>

                    {/* Spinner ring */}
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-white/[0.05]" />
                        <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-[5px] rounded-full border border-indigo-400/20 border-b-indigo-400/60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-white/80 text-sm font-medium tracking-wide">Verifying session</p>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase">Microlyzer AI</p>
                    </div>

                    {/* Animated dots */}
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="w-1 h-1 rounded-full bg-violet-500/60 animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected