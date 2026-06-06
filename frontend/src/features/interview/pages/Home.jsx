import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth.jsx'
const Home = () => {
    const { handleLogout } = useAuth()
    const navigate = useNavigate()

    const logoutUser = async () => {
        try {
            await handleLogout()
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }
    return (
  <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
    <div className="w-full max-w-7xl grid md:grid-cols-2 gap-8">

      {/* Left Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Job Description
        </h2>

        <textarea
          name="jobDescription"
          id="jobDescription"
          placeholder="Paste the job description here..."
          className="w-full h-[500px] bg-zinc-950 border border-zinc-700 rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Candidate Information
          </h2>
        </div>

        {/* Resume Upload */}
        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Upload Resume (PDF)
          </label>

          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf"
            className="w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-sm"
          />
        </div>

        {/* Self Description */}
        <div>
          <label
            htmlFor="selfDescription"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Self Description
          </label>

          <textarea
            id="selfDescription"
            name="selfDescription"
            rows={8}
            placeholder="Tell us about yourself..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
        >
          🚀 Generate Interview Report
        </button>

        {/* Logout */}
        <button
          onClick={logoutUser}
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>
      </div>

    </div>
  </div>
)
}

export default Home