import Quiz from "../models/quiz.js";
import CrudRepository from "./crud-repository.js";

class QuizRepository extends CrudRepository {
  constructor() {
    super(Quiz);
  }

  async incrementImpression(id) {
    const quiz = await Quiz.findById(id);
    quiz.impressions++;
    quiz.save();
  }

  async sortedQuizzies(quizzies) {}
}

export default QuizRepository;
