import {
  QaRepository,
  QuizRepository,
  PollRepository,
  UserRepository,
} from "../repository/index.js";
import Quiz from "../models/quiz.js";
class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.qaRepository = new QaRepository();
    this.pollRepository = new PollRepository();
    this.userRepository = new UserRepository();
  }

  // TODO: add the reference of the quiz to user quiz array.
  async createQuiz(data) {
    try {
      let errorFlag = false;
      let errorMessage = "";
      data?.questions.forEach((q, i) => {
        if (q.title === "") {
          errorFlag = true;
          errorMessage = `question ${i + 1} title can't be empty`;
        } else if (data.quizType === "Q&A" && !q.correctAnswer) {
          errorFlag = true;
          errorMessage = `please mark correct option for question ${i + 1} `;
        }

        q.options.forEach((o, i) => {
          if (!o.text && !o.url) {
            errorFlag = true;
            errorMessage = `option can't be empty`;
            return;
          }
        });
      });
      if (errorFlag) throw new Error(errorMessage);

      const response = await this.quizRepository.create(data);

      if (!response) {
        throw new Error("Something went wrong during the creation of the data");
      }
      if (response.quizType === "Q&A") {
        const qa = await this.qaRepository.create({ _id: response._id });
        for (let i = 0; i < response.questions.length; i++) {
          qa.questions[i] = { correctAttempt: 0, incorrectAttempt: 0 };
        }
        qa.save();
      } else if (response.quizType === "Poll") {
        const poll = await this.pollRepository.create({ _id: response._id });

        for (let i = 0; i < response.questions.length; i++) {
          poll.questions[i] = new Array(
            response.questions[i].options.length,
          ).fill(0);
        }

        poll.save();
      }
      await this.userRepository.appendQuiz(response.userId, response._id);
      console.log(response);

      return response;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async get(id) {
    try {
      const response = await this.quizRepository.get(id);

      if (!response) {
        throw new Error("unable to find the quiz");
      }
      const modifiedQuestions = response.questions.map((question) => {
        const { correctAnswer, ...rest } = question.toObject();
        return rest;
      });

      const { questions, ...finalResponse } = response.toObject();

      finalResponse.questions = modifiedQuestions;
      await this.quizRepository.incrementImpression(id);

      return finalResponse;
    } catch (e) {
      throw e;
    }
  }

  // HACK: data will be array of choosen answer by user.
  async submit(id, userAnswers) {
    try {
      const quiz = await this.quizRepository.get(id);
      console.log(id, userAnswers, quiz);
      if (!quiz) {
        throw new Error("Quiz or Qa not found");
      }

      if (quiz && quiz.quizType === "Q&A") {
        //
        const qa = await this.qaRepository.get(id);
        if (!qa) {
          throw new Error("qa not found");
        }

        let correctAnswer = 0;
        let incorrectAnswer = 0;
        quiz.questions.forEach((question, i) => {
          // populate the qa if question array doesn't exist.
          if (parseInt(question.correctAnswer) === parseInt(userAnswers[i])) {
            qa.questions[i].correctAttempt++;
            correctAnswer++;
          } else {
            qa.questions[i].incorrectAttempt++;
            incorrectAnswer++;
          }
        });
        await qa.save();

        return {
          correctAnswer: correctAnswer,
          incorrectAnswer: incorrectAnswer,
        };
        // submit the quiz will update the answers.
      } else if (quiz && quiz.quizType === "Poll") {
        const poll = await this.pollRepository.get(id);
        console.log(poll);

        if (!poll) {
          throw new Error("poll not found");
        }

        quiz.questions.forEach((question, i) => {
          const userChoice = userAnswers[i];
          // HACK: userChoice is not in array based index
          poll.questions[i][userChoice - 1]++;
        });

        poll.save();
      }
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  // TODO: need quizCount and relative computationalData. and need to return Trending Quiz

  // HACK: should also be removed from user also.
  async removeQuiz(quizId, userId) {
    try {
      const quiz = await this.quizRepository.get(quizId);
      if (!quiz) {
        throw new Error("Quiz is not defined");
      }
      await this.userRepository.removeQuiz(userId, quizId);
      if (quiz.quizType === "Q&A") {
        await this.qaRepository.destory(quizId);
      } else if (quiz.quizType === "Poll") {
        await this.pollRepository.destory(quizId);
      }

      await this.quizRepository.destory(quizId);
    } catch (e) {
      console.log("this is from remove quiz", e);
      throw e;
    }
  }

  // HACK:edit quiz if poll or quiz changed need to be changed in poll schema or quizSchema

  async editQuiz(quizId, updatedQuizData) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(quizId, updatedQuizData, {
        new: true,
        runValidators: true,
      });

      if (!quiz) {
        throw new Error("Quiz not found.");
      }
      if (quiz.quizType === "Q&A") {
        const qa = await this.qaRepository.get(quizId);

        if (!qa) {
          throw new Error("please re-create the quiz");
        }

        for (let i = qa.questions.length; i < quiz.questions.length; i++) {
          qa.questions[i] = { correctAttempt: 0, incorrectAttempt: 0 };
        }

        qa.save();
      } else if (quiz.quizType === "Poll") {
        const poll = await this.pollRepository.get(quizId);

        if (!poll) {
          throw new Error("Please re-create the quiz");
        }

        for (let i = poll.questions.length; i < quiz.questions.length; i++) {
          poll.questions[i] = new Array(quiz.questions[i].options.length).fill(
            0,
          );

          poll.save();
        }
      }
      return quiz;
    } catch (e) {
      throw e;
    }
  }

  async quizAnalysis(quizId) {
    try {
      const quiz = await this.quizRepository.get(quizId);

      if (!quiz) {
        throw new Error("quiz not found.");
      }

      if (quiz.quizType == "Q&A") {
        const quizAnalysis = await this.qaRepository.get(quizId);

        return { quiz, quizAnalysis };
      } else if (quiz.quizType == "Poll") {
        const quizAnalysis = await this.pollRepository.get(quizId);
        return { quiz, quizAnalysis };
      }
    } catch (e) {
      throw e;
    }
  }
}

export default QuizService;
