import express from "express";
import { signup, login } from "../../controllers/auth-controller.js";
import { authenticateUser } from "../../middleware/auth-middleware.js";
import {
  analytics,
  createQuiz,
  dashBoard,
  deleteQuiz,
  editQuiz,
  getQuiz,
  quizAnalysis,
  submitQuizData,
} from "../../controllers/quiz-controller.js";

const router = express.Router();

router.get("/healthz", (req, res) => {
  res.send({ message: "ok" });
});

router.post("/signup", signup);
router.post("/login", login);

// WARN: routes with authentication
router.post("/quiz", authenticateUser, createQuiz);
router.delete("/quiz/:id", authenticateUser, deleteQuiz);
router.put("/quiz/:id", authenticateUser, editQuiz);

router.get("/analytics", authenticateUser, analytics);
router.get("/dashboard", authenticateUser, dashBoard);
router.get("/quizAnalysis/:id", authenticateUser, quizAnalysis);
// TODO: need two more apis based upon Q&A and Poll their results.
// WARN: routes with authorization

// WARN: it should be public route.
router.get("/quiz/:id", getQuiz);
router.post("/quiz/:id/", submitQuizData);
export default router;
