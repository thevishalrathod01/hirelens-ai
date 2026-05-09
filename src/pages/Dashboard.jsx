import { useState } from "react"
import { Link } from "react-router-dom"

import { uploadResume } from "../api/auth"

export default function Dashboard() {
  const [file, setFile] = useState(null)
  const [resumeData, setResumeData] = useState(null)

  const handleUpload = async () => {
    if (!file) {
      return alert("Please select PDF")
    }

    const formData = new FormData()
    formData.append("resume", file)

    try {
      const data = await uploadResume(formData)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error)
      alert("Upload failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>

      <p className="text-gray-400 mb-10">
        Upload your resume for AI analysis.
      </p>

      <Link
        to="/mock-interview"
        className="inline-block mb-8 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
      >
        Start Mock Interview
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">Resume Analyzer</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          Upload Resume
        </button>

        {resumeData && (
          <div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              Resume Uploaded Successfully
            </h3>

            <p className="mb-3">
              <span className="font-bold">File:</span> {resumeData.fileName}
            </p>

            <p className="mb-3">
              <span className="font-bold">Feedback:</span>
            </p>

            <div className="bg-gray-900 p-4 rounded-xl text-gray-300 whitespace-pre-line">
              {resumeData.feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}