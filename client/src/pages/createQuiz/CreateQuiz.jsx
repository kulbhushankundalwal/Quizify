import { useState } from "react";
import QuizForm from "../../components/QuizForm/QuizForm";
import styles from "./createQuiz.module.css";
import QuizForm2 from "../../components/QuizForm2/QuizForm2";
import Congrats from "../../components/Congrats/Congrats";
import { generateDefaultData } from "../../data/questionDefaultData";
const CreateQuiz = () => {
  const [formChoices, setFormChoices] = useState(null);
  const [quizCreated, setQuizCreated] = useState(false);
  const [questionData, setQuestionData] = useState([generateDefaultData()]);
  const [url, setUrl] = useState();
  console.log(formChoices, quizCreated);
  return (
    <div className={styles.wrapper}>
      {!formChoices && (
        <div className={styles.popupForm}>
          <QuizForm setFormChoices={setFormChoices} />
        </div>
      )}

      {!quizCreated && formChoices && (
        <div className={styles.popupForm2}>
          <QuizForm2
            questionData={questionData}
            setQuestionData={setQuestionData}
            quizType={formChoices?.quizType}
            setQuizCreated={setQuizCreated}
            formChoices={formChoices}
            setUrl={setUrl}
            editForm={false}
            setFormChoices={setFormChoices}
          />
        </div>
      )}

      {quizCreated && <Congrats url={url} />}
    </div>
  );
};

export default CreateQuiz;
