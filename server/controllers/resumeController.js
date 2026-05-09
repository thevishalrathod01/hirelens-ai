import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

import Resume from "../models/Resume.js"

dotenv.config()

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      })
    }

    const fileContent = `
Resume file uploaded: ${req.file.originalname}
File saved as: ${req.file.filename}
`

    const prompt = `
You are an expert resume reviewer.

Analyze this resume and provide:
1. Strengths
2. Weaknesses
3. Missing skills
4. ATS score out of 100
5. Suggestions for improvement
6. Interview questions

Resume information:
${fileContent}
`

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    const feedback = response.text

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.filename,
      extractedText: fileContent,
      feedback,
    })

    res.status(201).json({
      message: "Resume analyzed successfully",
      resume,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    })

    res.status(200).json(resumes)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error.message,
    })
  }
}