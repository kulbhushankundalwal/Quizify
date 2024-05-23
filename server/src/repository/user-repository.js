import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    try {
      const response = await User.findOne({ email: email });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async appendQuiz(userId, quizId) {
    try {
      await User.findOneAndUpdate(userId, { $push: { quizzies: quizId } });
    } catch (e) {
      throw e;
    }
  }

  async populatedQuizzies(userId) {
    try {
      const userDetails = await User.findById(userId).populate("quizzies");
      return userDetails;
    } catch (e) {
      throw e;
    }
  }
  async removeQuiz(userId, quizId) {
    try {
      const user = await User.findById(userId);

      const indexToDelete = user.quizzies.findIndex((quiz) => quiz == quizId);

      if (indexToDelete !== -1) {
        user.quizzies.splice(indexToDelete, 1);
        console.log(
          `Quiz with quizId ${quizId} deleted successfully. from user`,
        );
      } else {
        console.log("quiz not found in user");
        throw new Error("quiz not found");
      }

      user.save();

      return;
    } catch (e) {
      throw e;
    }
  }

  convertImpressions = (impression) => {
    if (impression > 1000) {
      const formattedImpression = (impression / 1000).toFixed(1);
      return `${formattedImpression}K`;
    } else {
      return impression.toString();
    }
  };

  truncateQuizNameFn = (name, maxLength) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  formatCreatedAt = (date) => {
    // Assuming createdAt is a valid Date object or a string
    const createdAt = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return createdAt;
  };
}

export default UserRepository;
