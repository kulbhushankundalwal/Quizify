import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questions: [
    {
      correctAttempt: { type: Number, default: 0 },
      incorrectAttempt: { type: Number, default: 0 },
    },
  ],
});

const QA = mongoose.model("QA", qaSchema);

export default QA;
