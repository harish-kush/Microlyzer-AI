import React from 'react'

const Interview = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">

          {/* Left Sidebar */}
          <aside className="col-span-2">
            <div className="sticky top-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <h2 className="text-sm uppercase tracking-wider text-zinc-400 mb-4">
                Sections
              </h2>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600">
                  Technical Questions
                </button>

                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
                  Behavioral Questions
                </button>

                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
                  Preparation Roadmap
                </button>
              </div>

              <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-medium">
                Download Resume
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-7">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 min-h-[700px]">
              
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                  Technical Questions
                </h1>

                <span className="text-zinc-400">
                  0 Questions
                </span>
              </div>

              {/* Questions will come here */}
              <div className="space-y-4">
                
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                  Question Card
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                  Question Card
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                  Question Card
                </div>

              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="col-span-3">
            
            {/* Match Score */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
              <p className="text-zinc-400 mb-5">
                Match Score
              </p>

              <div className="w-36 h-36 rounded-full border-[10px] border-emerald-500 flex items-center justify-center mx-auto">
                <span className="text-4xl font-bold">
                  85%
                </span>
              </div>

              <p className="mt-4 text-zinc-400">
                Strong match for this role
              </p>
            </div>

            {/* Skill Gaps */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-6">
              <h2 className="font-semibold mb-4">
                Skill Gaps
              </h2>

              <div className="flex flex-wrap gap-2">
                <span className="bg-red-500/20 text-red-400 px-3 py-2 rounded-full text-sm">
                  React
                </span>

                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-full text-sm">
                  Docker
                </span>

                <span className="bg-green-500/20 text-green-400 px-3 py-2 rounded-full text-sm">
                  AWS
                </span>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  )
}

export default Interview