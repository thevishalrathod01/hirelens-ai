import express from "express"
import multer from "multer"
import path from "path"

import { protect } from "../middleware/authMiddleware.js"

import {
  uploadResume,
  getResumeHistory,
} from "../controllers/resumeController.js"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads")
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true)
  } else {
    cb(new Error("Only PDF files are allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
})

router.post("/upload", protect, upload.single("resume"), uploadResume)

router.get("/history", protect, getResumeHistory)

export default router