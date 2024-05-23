import { useState } from "react";
import trophy from "../../../assets/trophy.png";
import styles from "./quiz.result.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

const QuizResult = ({ quizType, result }) => {
  // Calculate the percentage of correct answers
  const calculatePercentage = () => {
    const totalQuestions = result?.correctAnswer + result?.incorrectAnswer;
    const percentage = (result?.correctAnswer / totalQuestions) * 100;
    return percentage.toFixed(2);
  };

  return (
    <div className={styles.wrapper}>
      {quizType === "Q&A" && (
        <>
          <div className={styles.headingCongrats}>
            Congrats! The Quiz is completed.
          </div>
          <img src={trophy} className={styles.trophy} />
          <div className={styles.score}>
            <span>
              Your Score:{" "}
              <span>
                {result?.correctAnswer}/
                {`${result?.correctAnswer + result?.incorrectAnswer}`}
              </span>
            </span>
            <ProgressBar
              completed={parseFloat(calculatePercentage())} 
              bgColor="#6ab04c" 
              baseBgColor="#e0e0e0"
              height="20px" 
              labelAlignment="right" 
              label={`${calculatePercentage()}% `} 
            />
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
