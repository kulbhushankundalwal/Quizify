import styles from "./quizCard.module.css";
import Eye from "../../../assets/eyeView.svg";
const QuizCard = ({ quizName, createdAt, impressions }) => {
  return (
    <div className={styles.quizCard}>
      <div className={styles.quizDetails}>
        <div className={styles.quizName}>{quizName} </div>
        <div className={styles.views}>
          {impressions}
          <img src={Eye} />
        </div>
      </div>
      <div className={styles.createdAt}>created on : {createdAt}</div>
    </div>
  );
};

export default QuizCard;
