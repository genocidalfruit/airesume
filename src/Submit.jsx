import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

export default function Submit() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return toast.error("Please select a file before uploading")

    const formData = new FormData()
    formData.append('resume', file)

    try {
      setLoading(true)
      const res = await fetch('https://057f-2401-4900-1cc5-8893-2427-642c-81a5-6a25.ngrok-free.app/submit', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || "Resume submitted successfully!")
      } else {
        toast.error(data.message || "Failed to submit resume")
      }
    } catch (error) {
      toast.error("An error occurred while submitting the resume")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-20"
    >
      <div className="w-full max-w-xl bg-gray-800 border border-[#e5e9f0] rounded-2xl shadow-lg shadow-slate-500/60 p-6 sm:p-10">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-[#e5e9f0] text-center sm:text-left">Submit Resume</h1>
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume (PDF only)</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 text-sm font-medium text-gray-800 text-center">
                Choose File
                <input
                  type="file"
                  accept=".pdf"
                  onChange={e => setFile(e.target.files[0])}
                  required
                  className="hidden"
                />
              </label>
              <span className="text-white text-sm break-all sm:break-normal text-center sm:text-left">
                {file ? file.name : 'No file chosen'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-opacity ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload'
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/search')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Go to Search
          </button>
        </form>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </div>
    </motion.div>
  )
}
