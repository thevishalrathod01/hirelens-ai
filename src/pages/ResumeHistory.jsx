import { useEffect, useState } from "react"

import { getResumeHistory } from "../api/auth"

export default function ResumeHistory() {
  const [resumes, setResumes] = useState([])

  const fetchHistory = async () => {
    try {
      const data = await getResumeHistory()

      setResumes(data)
    } catch (error) {
      console.log(error)

      alert("Failed to load resume history")
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">

      <h1 className="text-4xl font-bold mb-2">
        Resume History
      </h1>

      <p className="text-gray-400 mb-10">
        View your uploaded resumes and AI analysis.
      </p>

      <div className="space-y-6 max-w-5xl">

        {resumes.length === 0 ? (
          <p className="text-gray-400">
            No resume history found.
          </p>
        ) : (
          resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >

              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {resume.fileName}
              </h2>

              <p className="text-gray-500 mb-4">
                {new Date(resume.createdAt).toLocaleString()}
              </p>

              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 whitespace-pre-line text-gray-300">
                {resume.feedback}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  )
}