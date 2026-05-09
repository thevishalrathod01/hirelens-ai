import { useEffect, useState } from "react"
import { getInterviewHistory } from "../api/auth"

export default function InterviewHistory() {
  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    try {
      const data = await getInterviewHistory()
      setHistory(data)
    } catch (error) {
      console.log(error)
      alert("Failed to load history")
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">
      <h1 className="text-4xl font-bold mb-2">Interview History</h1>

      <p className="text-gray-400 mb-10">
        View your previous mock interviews and AI feedback.
      </p>

      <div className="space-y-6 max-w-5xl">
        {history.length === 0 ? (
          <p className="text-gray-400">No interview history found.</p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {item.role}
              </h2>

              <p className="text-gray-500 mb-4">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <h3 className="font-bold mb-2">Questions:</h3>

              <ul className="list-disc pl-6 text-gray-300 mb-4">
                {item.questions.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>

              {item.feedback && (
                <>
                  <h3 className="font-bold mb-2 text-green-400">
                    AI Feedback:
                  </h3>

                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 whitespace-pre-line text-gray-300">
                    {item.feedback}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}