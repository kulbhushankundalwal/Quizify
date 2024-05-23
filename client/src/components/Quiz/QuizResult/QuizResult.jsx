import { useState } from "react";
import trophy from "../../../assets/trophy.png";
import styles from "./quiz.result.module.css";
const QuizResult = ({ quizType, result }) => {
  return (
    <div className={styles.wrapper}>
      {quizType === "Q&A" && (
        <>
          <div className={styles.headingCongrats}>
            Congrats Quiz is completed
          </div>
          <img src={trophy} className={styles.trophy} />
          <div className={styles.score}>
            your score is{" "}
            <span>
              {result?.correctAnswer}/
              {`${result?.correctAnswer + result?.incorrectAnswer}`}
            </span>
          </div>
        </>
      )}

      {quizType === "Poll" && (
        <>
          <div className={styles.pollHeading}>
            Thank you for participating in the Poll
          </div>
        </>
      )}
    </div>
  );
};

export default QuizResult;
