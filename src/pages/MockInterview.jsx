import { useState } from "react"

import {
  generateInterview,
  evaluateInterview,
} from "../api/auth"

export default function MockInterview() {
  const [role, setRole] = useState("")

  const [questions, setQuestions] = useState([])

  const [answers, setAnswers] = useState([])

  const [interviewId, setInterviewId] = useState("")

  const [feedback, setFeedback] = useState("")

  const [loading, setLoading] = useState(false)

  const generateQuestions = async () => {
    if (!role) {
      return alert("Enter job role")
    }

    try {
      setLoading(true)

      const data = await generateInterview(role)

      setQuestions(data.interview.questions)

      setInterviewId(data.interview._id)

      setAnswers(new Array(data.interview.questions.length).fill(""))

      setLoading(false)

    } catch (error) {
      console.log(error)

      setLoading(false)

      alert("Failed to generate questions")
    }
  }

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers]

    updatedAnswers[index] = value

    setAnswers(updatedAnswers)
  }

  const submitInterview = async () => {
    try {
      setLoading(true)

      const data = await evaluateInterview({
        interviewId,
        questions,
        answers,
      })

      setFeedback(data.interview.feedback)

      setLoading(false)

    } catch (error) {
      console.log(error)

      setLoading(false)

      alert("Evaluation failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-8 py-10">

      <h1 className="text-4xl font-bold mb-2">
        AI Mock Interview
      </h1>

      <p className="text-gray-400 mb-10">
        Practice AI-generated interview questions.
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-5xl">

        <input
          type="text"
          placeholder="Enter role (Frontend Developer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 mb-6"
        />

        <button
          onClick={generateQuestions}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>

        {questions.length > 0 && (
          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6 text-green-400">
              Interview Questions
            </h2>

            <div className="space-y-8">

              {questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-950 border border-gray-800 rounded-xl p-6"
                >

                  <p className="text-lg font-semibold mb-4">
                    {question}
                  </p>

                  <textarea
                    rows="4"
                    placeholder="Write your answer here..."
                    value={answers[index]}
                    onChange={(e) =>
                      handleAnswerChange(index, e.target.value)
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3"
                  />

                </div>
              ))}

            </div>

            <button
              onClick={submitInterview}
              className="mt-8 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
            >
              {loading ? "Evaluating..." : "Submit Answers"}
            </button>

          </div>
        )}

        {feedback && (
          <div className="mt-10 bg-gray-950 border border-gray-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-green-400 mb-6">
              AI Interview Feedback
            </h2>

            <div className="whitespace-pre-line text-gray-300">
              {feedback}
            </div>

          </div>
        )}

      </div>

    </div>
  )
}