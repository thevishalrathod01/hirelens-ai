import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fileName: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
    },

    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Resume = mongoose.model("Resume", resumeSchema)

export default Resume