import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  optionType: {
    type: String,
    required: true,
    enum: ["Text", "url", "text&url"],
  },
  options: {
    type: [
      {
        id: {
          type: String,
        },
        text: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    required: true,
  },
  correctAnswer: {
    type: String,
  },

  timer: {
    type: String,
  },
});

const quizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    quizType: {
      type: String,
      required: true,
      enum: ["Q&A", "Poll"],
    },
    timer: {
      type: String,
      required: true,
      enum: ["OFF", "5 sec", "10 sec"],
      default: "OFF",
    },
    questions: {
      type: [questionSchema],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    impressions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
