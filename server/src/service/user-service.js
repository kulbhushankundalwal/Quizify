import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repository/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      if (!data) {
        throw new Error("Please provide valid data");
      }
      if (data.password !== data.confirmPassword) {
        throw new Error("your password is not same");
      }
      const encyptedPassword = await bcrypt.hash(data.password, 10);
      data.password = encyptedPassword;
      const user = await this.userRepository.create(data);

      if (user) {
        const token = jwt.sign(
          { email: user.email },
          process.env.jwtPrivateKey,
          {
            expiresIn: "24h",
          },
        );
        return { token: token };
      } else {
        throw new Error("user is not created.Please try again after some time");
      }
    } catch (e) {
      throw e;
    }
  }

  async login(data) {
    try {
      const user = await this.userRepository.findByEmail(data.email);
      if (user) {
        const isPasswordMatched = await bcrypt.compare(
          data.password,
          user.password,
        );

        if (isPasswordMatched) {
          const token = jwt.sign(
            { email: user.email },
            process.env.jwtPrivateKey,
            {
              expiresIn: "24h",
            },
          );
          return { token: token, user };
        } else {
          throw new Error("Password is incorrect");
        }
      } else {
        throw new Error("User does not exist");
      }
    } catch (e) {
      throw e;
    }
  }

  async analysis(user) {
    try {
      const userData = await this.userRepository.populatedQuizzies(user._id);

      if (!userData) {
        throw new Error("user data not found out");
      }
      let quizzies = userData.quizzies;

      quizzies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      // TODO: please check for some sorting or some other basisc.

      return quizzies;
    } catch (e) {
      throw e;
    }
  }
  // TODO: need quizCount and relative computationalData. and need to return Trending Quiz
  async dashboard(user) {
    try {
      const userData = await this.userRepository.populatedQuizzies(user._id);

      if (!userData) {
        throw new Error("user data not found out");
      }
      const quizzies = userData.quizzies;
      let quizCreated = quizzies.length;
      let totalQuestions = 0;
      let totalImpression = 0;
      quizzies.forEach((quiz) => {
        totalQuestions += quiz.questions.length;
        totalImpression += quiz.impressions;
      });

      totalImpression = this.userRepository.convertImpressions(totalImpression);
      // quizzies.sort((a, b) => b.impressions - a.impressions);

      const trendingQuizData = quizzies
        .filter((q) => q.impressions > 10)
        .map((q) => ({
          _id: q._id,
          quizName: this.userRepository.truncateQuizNameFn(q.quizName, 7),
          createdAt: this.userRepository.formatCreatedAt(q.createdAt),
          impressions: q.impressions,
        }));

      return { quizCreated, totalQuestions, totalImpression, trendingQuizData };
    } catch (e) {
      throw e;
    }
  }
}

export default UserService;
