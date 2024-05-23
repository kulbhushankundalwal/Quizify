import styles from "./quizForm2.module.css";
import plus from "../../assets/plus.svg";
import { v4 as uuidv4 } from "uuid";
import cross from "../../assets/cross.svg";
import QuestionData from "./QuestionData";
import { useState, useContext } from "react";
import Timer from "../Timer/Timer";
import { useEffect } from "react";
import { generateDefaultData } from "../../data/questionDefaultData";
import { createQuiz, updateQuiz } from "../../services/api/quizApi";
import { formContext } from "../../context/FormProvider";

import toast from "react-hot-toast";
import { REACT_APP_BASE_URL } from "../../../constant";

const QuizForm2 = ({
  quizType,
  setQuizCreated,
  formChoices,
  setUrl,
  questionData,
  setQuestionData,
  editForm,
  setEditForm,
  setFormChoices,
}) => {
  const { setForm } = useContext(formContext);
  const [selectedQuestionData, setSelectedQuestionData] = useState(
    questionData[0],
  );

  const addQuestion = () => {
    setQuestionData((prevData) => [...prevData, generateDefaultData()]);
  };

  const removeQuestion = (id, i) => {
    const updatedQuestionData = questionData.filter(
      (question) => question.id !== id,
    );

    setQuestionData(updatedQuestionData);
  };

  // WARN: using index over here

  const changeSelectedQuestion = (index) => {
    setSelectedQuestionData(questionData[index]);
  };

  const handleCreateQuiz = async () => {
    // HACK: corner case: last question is not added till now
    const updatedQuestion = questionData.map((q) => ({
      ...q,
      optionType: q.choiceType,
    }));
    updatedQuestion.forEach((question) => {
      delete question.choiceType;
    });

    const newQuizData = { ...formChoices, questions: updatedQuestion };

    try {
      if (!editForm) {
        const { data } = await createQuiz(newQuizData);
        const url = `${REACT_APP_BASE_URL}/quiz/${data?.quizId}`;

        console.log(url);
        setUrl(url);
        setQuizCreated(true);
        toast.success("successfully created the quiz");
      } else {
        const { data } = await updateQuiz(formChoices.id, newQuizData);
        if (data) {
          toast.success("successfully updated the quiz");
        } else {
          toast.error("something went wrong.");
        }
        setEditForm(false);
        setQuizCreated(true);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const handleCancleQuiz = () => {
    if (editForm) {
      setEditForm(false);
    } else {
      setForm(false);
    }
  };
  console.log(selectedQuestionData.id);
  useEffect(() => {
    const updatedQuestionData = questionData.map((q) => {
      return q.id === selectedQuestionData.id ? selectedQuestionData : q;
    });

    setQuestionData(updatedQuestionData);

    console.log(selectedQuestionData.id);
  }, [selectedQuestionData]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.questionCounter}>
        <div className={styles.qCount}>
          {questionData &&
            questionData.map((qd, i) => (
              <div
                className={`${styles.qNum}                   
                  ${qd === selectedQuestionData ? styles.selectedQuestion : ""}
                  `}
                key={qd.id}
                onClick={() => changeSelectedQuestion(i)}
              >
                {i + 1}
                {i > 0 && (
                  <div
                    className={styles.crossBtn}
                    onClick={() => removeQuestion(qd.id, i)}
                  >
                    <img src={cross} alt="cross" />
                  </div>
                )}
              </div>
            ))}
          {questionData.length < 5 && (
            <img
              src={plus}
              className={styles.plusQuestion}
              onClick={addQuestion}
            />
          )}
        </div>
        <div> Max 5 questions</div>
      </div>
      <QuestionData
        data={selectedQuestionData}
        setData={setSelectedQuestionData}
        quizType={quizType}
      />
      <div className={styles.buttons}>
        <button
          className={styles.buttonStyle}
          style={{ background: "#fff", color: "#474444" }}
          onClick={handleCancleQuiz}
        >
          Cancel
        </button>
        <button
          className={styles.buttonStyle}
          style={{ background: "#60B84B", color: "#fff" }}
          onClick={handleCreateQuiz}
        >
          {!editForm ? "Create Quiz" : "Update Quiz"}
        </button>
      </div>
      {quizType == "Q&A" && !editForm && (
        <Timer formChoices={formChoices} setFormChoices={setFormChoices} />
      )}
    </div>
  );
};

export default QuizForm2;
