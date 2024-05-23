import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questions: [[{ type: Number, default: 0 }]],
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
