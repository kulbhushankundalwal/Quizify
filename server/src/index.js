import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import apiRoutes from "./routes/index.js";
import { connectDB } from "./config/database.js";
import errorMiddleWare from "./middleware/error-middleware.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorMiddleWare); // WARN: need to be in the end of the app

app.listen(process.env.PORT, async () => {
  console.log(`connected to port : `, process.env.PORT);
  const response = await connectDB().catch((e) => console.log(e));
  if (response) console.log("connect to db");
});

// const data = {
//   quizName: "first Quiz",
//   quizType: "Q&A",
//   questions: [
//     {
//       title: "first Question title",
//       optionType: "Text",
//       options: [
//         "first question option 1",
//         "first Question option 2",
//         "first question option 3",
//       ],
//     },
//     {
//       title: "second Question title",
//       optionType: "Text",
//       options: [
//         "second question option 1",
//         "second Question option 2",
//         "second question option 3",
//       ],
//     },
//   ],
// };
// const quizService = new QuizService();
// data.userId = "65ae18221875bf47be277317";
// const quizData = await quizService.create(data);
// console.log(quizData);
//
//
