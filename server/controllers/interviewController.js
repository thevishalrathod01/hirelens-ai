import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

import Interview from "../models/Interview.js"

dotenv.config()

export const generateInterview = async (req, res) => {
  try {
    const { role } = req.body

    if (!role) {
      return res.status(400).json({
        message: "Please enter job role",
      })
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const prompt = `
Generate 5 interview questions for a fresher candidate applying for this role: ${role}.

Return only questions, one per line.
`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    const questions = response.text
      .split("\n")
      .filter((q) => q.trim() !== "")

    const interview = await Interview.create({
      user: req.user._id,
      role,
      questions,
    })

    res.status(201).json({
      message: "Interview questions generated",
      interview,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const evaluateInterview = async (req, res) => {
  try {
    const { interviewId, questions, answers } = req.body

    if (!interviewId || !questions || !answers) {
      return res.status(400).json({
        message: "Missing interview data",
      })
    }

    const interviewExists = await Interview.findOne({
      _id: interviewId,
      user: req.user._id,
    })

    if (!interviewExists) {
      return res.status(404).json({
        message: "Interview not found",
      })
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate answers.

Give:
1. Overall score out of 100
2. Strengths
3. Weaknesses
4. Improvement suggestions
5. Final hiring recommendation

Questions and Answers:
${questions
  .map((q, index) => {
    return `
Question ${index + 1}: ${q}
Answer ${index + 1}: ${answers[index] || "No answer given"}
`
  })
  .join("\n")}
`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    const feedback = response.text

    const interview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        answers,
        feedback,
      },
      { new: true }
    )

    res.status(200).json({
      message: "Interview evaluated successfully",
      interview,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    })

    res.status(200).json(interviews)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}