import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_DB);
    const response = await mongoose.connect(process.env.MONGO_DB, {
      dbName: "quizze",
    });
    console.log(response);
    return response;
  } catch (e) {
    console.log(e.message);
  }
};
