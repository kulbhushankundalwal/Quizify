import { useState, useContext } from "react";
import styles from "./quizForm.module.css";
import { useNavigate } from "react-router-dom";
import { formContext } from "../../context/FormProvider.jsx";
import toast from "react-hot-toast";

const QuizForm = ({ setFormChoices }) => {
  const [inputData, setInputData] = useState(null);
  const [picked, setPicked] = useState(null);

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleContinue = () => {
    console.log(inputData);
    if (!inputData) {
      toast.error("Quiz name can't be empty");
      return;
    }
    if (picked != "1" && picked != "2") {
      toast.error("Quiz Type can't be empty");
      return;
    }

    const quizType = picked == "1" ? "Q&A" : "Poll";
    setFormChoices({ quizType: quizType, quizName: inputData });
  };

  const { showForm, setForm } = useContext(formContext);
  return (
    <div className={styles.quizForm}>
      <input type="text" placeholder="Quiz Name" onChange={handleInputChange} />
      <div className={styles.quizType}>
        <span>Quiz Type </span>
        <div
          id={picked == "1" ? styles.selectedType : ""}
          onClick={() => setPicked("1")}
        >
          Q & A
        </div>
        <div
          id={picked == "2" ? styles.selectedType : ""}
          onClick={() => setPicked("2")}
        >
          Poll Type
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.buttonStyle}
          style={{ background: "#fff", color: "#474444" }}
          onClick={() => setForm(false)}
        >
          Cancel
        </button>
        <button
          className={styles.buttonStyle}
          style={{ background: "#60B84B", color: "#fff" }}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
