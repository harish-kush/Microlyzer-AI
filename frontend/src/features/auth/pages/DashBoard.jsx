import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const DashBoard = () => {
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
        <main className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <button
                        onClick={logoutUser}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                    <p className="text-gray-600">
                        Welcome to your dashboard.
                    </p>
                </div>
            </div>
        </main>
    )
}

export default DashBoard