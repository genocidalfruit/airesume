import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [firstSearchDone, setFirstSearchDone] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.")
      return
    }

    setLoading(true)
    const res = await fetch('https://8fdf-49-207-62-247.ngrok-free.app/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    const data = await res.json()
    setResults(data)
    setLoading(false)
    if (!firstSearchDone) setFirstSearchDone(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={`min-h-screen py-3 px-4 ${!firstSearchDone ? 'flex items-center justify-center' : ''}`}>
      <div className={`w-full max-w-2xl mx-auto ${!firstSearchDone ? 'p-10' : 'p-5'}`}>
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 border border-[#e5e9f0] rounded-2xl p-10 shadow-lg shadow-slate-500/60 -m-5"
        >
          <h1 className="text-3xl font-bold mb-6 text-[#e5e9f0] text-center">Search Resumes</h1>
          <input
            className="border p-3 w-full mb-4 rounded"
            type="text"
            placeholder="3 years experience in React..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-[#e5e9f0] font-bold py-2 px-6 rounded transition-opacity w-full ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-[#e5e9f0] border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              'Search'
            )}
          </button>

          {/* Navigation Button to Submit Page */}
          <button
            type="button"
            onClick={() => navigate('/submit')}
            className="mt-3 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Go to Submit
          </button>
        </motion.div>

        {/* Render container after first search */}
        {firstSearchDone && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 bg-gray-800 border border-[#e5e9f0] rounded-2xl p-6 shadow-lg shadow-slate-500/60"
          >
            <p className="text-sm text-[#e5e9f0] uppercase tracking-wider font-semibold mb-4">
              {results.every(r => !r.common_keywords || r.common_keywords.length === 0)
                ? 'No matching keywords'
                : 'First 5 results'}
            </p>

            {/* Animate cards on each new set of results */}
            <div className="space-y-4">
              <AnimatePresence mode="wait" initial={false}>
                {results.map((r, i) => {
                  const lightness = 27 - i * 3
                  const bgColor = `hsl(222, 23%, ${lightness}%)`

                  return (
                    <motion.div
                      key={r.name + r.final_score}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      style={{ backgroundColor: bgColor }}
                      className="rounded-xl shadow-xl p-5 text-[#e5e9f0] ring-1 ring-[#e5e9f0]/25 transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <h2 className="text-2xl font-extrabold">{r.name}</h2>
                      <p className="mt-2">🔎 Final Score: <span className="font-bold">{r.final_score.toFixed(2)}</span></p>

                      {r.common_keywords && r.common_keywords.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm mb-1">🧠 Common Keywords:</p>
                          <div className="flex flex-wrap gap-2">
                            {r.common_keywords.map((kw, j) => (
                              <span key={j} className="bg-blue-500/60 text-xs px-3 py-1 rounded-full">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Download Resume Button */}
                      {r.pdf_file_id && (
                        <div className="mt-4">
                          <a
                            href={`https://8fdf-49-207-62-247.ngrok-free.app/resume/${r.pdf_file_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full border border-[#e5e9f0]"
                          >
                            Download Resume
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
