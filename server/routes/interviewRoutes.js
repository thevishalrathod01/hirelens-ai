import express from "express"

import { protect } from "../middleware/authMiddleware.js"

import {
  generateInterview,
  evaluateInterview,
  getInterviewHistory,
} from "../controllers/interviewController.js"

const router = express.Router()

router.post("/generate", protect, generateInterview)

router.post("/evaluate", protect, evaluateInterview)

router.get("/history", protect, getInterviewHistory)

export default router