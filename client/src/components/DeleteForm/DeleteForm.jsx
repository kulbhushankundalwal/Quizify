import { toast } from "react-hot-toast";
import styles from "./deleteform.module.css";
import { deleteQuiz } from "../../services/api/quizApi";

const DeleteForm = ({ quizId, setDeleteForm }) => {
  const handleSubmit = async () => {
    try {
      console.log(quizId);
      const { success, message, err } = await deleteQuiz(quizId);
      console.log(success, message, err);
      toast.success(message);
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
    setDeleteForm(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.deleteWrapper}>
        <p>Are you confirm you want to delete ? </p>

        <div className={styles.buttons}>
          <button className={styles.cnf} onClick={handleSubmit}>
            Confirm Delete
          </button>
          <button className={styles.cncl} onClick={() => setDeleteForm(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
