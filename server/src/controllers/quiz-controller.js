import QuizService from "../service/quiz-service.js";
import UserService from "../service/user-service.js";

const quizService = new QuizService();
const userService = new UserService();

//TODO: after quiz creation need to send specific url to access that quiz.
export const createQuiz = async (req, res, next) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const response = await quizService.createQuiz(data);
    res.status(200).json({
      success: true,
      message: "Successfully created new quiz",
      data: { quizId: response._id },
      err: {},
    });
  } catch (e) {
    next(e);
  }
};

export const getQuiz = async (req, res, next) => {
  try {
    const response = await quizService.get(req.params.id);
    console.log(response);
    res.status(200).json({
      success: true,
      message: "your quiz data",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};

export const submitQuizData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userAnswers = req.body.userAnswers;
    const response = await quizService.submit(id, userAnswers);
    res.status(200).json({
      success: true,
      message: "your quiz data",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};
export const dashBoard = async (req, res, next) => {
  try {
    const response = await userService.dashboard(req.user);
    res.status(200).json({
      success: true,
      message: "your dashboard data",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};
export const analytics = async (req, res, next) => {
  try {
    const response = await userService.analysis(req.user);

    res.status(200).json({
      success: true,
      message: "your analytics result",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};
export const deleteQuiz = async (req, res, next) => {
  try {
    console.log(req.user, req.params.id);
    const response = await quizService.removeQuiz(req.params.id, req.user._id);
    res.status(200).json({
      success: true,
      message: "removed quiz from DB",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};

export const editQuiz = async (req, res, next) => {
  try {
    const response = await quizService.editQuiz(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "updated the quiz",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};

export const quizAnalysis = async (req, res, next) => {
  try {
    const response = await quizService.quizAnalysis(req.params.id);
    res.status(200).json({
      success: true,
      message: "quiz analysis",
      data: response,
      err: {},
    });
  } catch (e) {
    next(e);
  }
};
