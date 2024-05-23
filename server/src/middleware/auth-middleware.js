import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const data = jwt.verify(token, process.env.jwtPrivateKey);

      const user = await User.findOne({ email: data.email });
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error("user is not available.please signup");
      }
    } else {
      throw new Error("unable to find the token please re-login");
    }
  } catch (e) {
    next(e);
  }
};
