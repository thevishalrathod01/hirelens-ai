import mongoose from "mongoose"

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: {
      type: String,
      required: true,
    },

    questions: {
      type: [String],
      default: [],
    },

    answers: {
      type: [String],
      default: [],
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Interview = mongoose.model("Interview", interviewSchema)

export default Interview