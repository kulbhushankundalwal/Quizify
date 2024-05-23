import { useState } from "react";
import styles from "./Timer.module.css";
import { useEffect } from "react";

const Timer = ({ formChoices, setFormChoices }) => {
  console.log(formChoices);
  const [questionTime, setQuestionTime] = useState(formChoices?.timer || "OFF");

  const changeQuestion = (e) => {
    setQuestionTime(e.target.innerText);
  };

  useEffect(() => {
    setFormChoices((prev) => ({ ...prev, timer: questionTime }));
  }, [questionTime]);
  const selectedStyle = {
    backgroundColor: "#D60000",
    color: "#fff",
  };

  console.log(questionTime);
  return (
    <div className={styles.timerWrapper}>
      <div> Timer </div>
      <div
        name="OFF"
        className={styles.timerBtn}
        onClick={(e) => changeQuestion(e)}
        style={questionTime === "OFF" ? selectedStyle : {}}
      >
        OFF
      </div>
      <div
        name="5sec"
        className={styles.timerBtn}
        onClick={(e) => changeQuestion(e)}
        style={questionTime === "5 sec" ? selectedStyle : {}}
      >
        5 sec
      </div>
      <div
        name="10sec"
        className={styles.timerBtn}
        onClick={(e) => changeQuestion(e)}
        style={questionTime === "10 sec" ? selectedStyle : {}}
      >
        10 sec
      </div>
    </div>
  );
};

export default Timer;
