import UserService from "../service/user-service.js";

const userService = new UserService();

export const signup = async (req, res, next) => {
  try {
    const response = await userService.signup({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      confirmPassword: req.body.confirmPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created new User",
      data: response,
      err: {},
    });
  } catch (e) {
    e.status = 409;
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const response = await userService.login({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully logined",
      data: response,
      err: {},
    });
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
