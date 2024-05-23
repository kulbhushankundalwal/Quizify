import styles from "./congrats.module.css";

import charmCross from "../../assets/charm_cross.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { formContext } from "../../context/FormProvider";
import { toast } from "react-hot-toast";
const Congrats = ({ url }) => {
  const { showForm, setForm } = useContext(formContext);

  const navigate = useNavigate();

  const CopyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(url);

      toast.success("successfully copied the url");
    } catch (e) {
      console.log(e);
      toast.error("something went wrong.");
    }
  };
  // TODO: fix the toast position
  return (
    <div className={styles.wrapper}>
      <div className={styles.charmCross}>
        <img src={charmCross} onClick={() => setForm(!showForm)} />
      </div>
      <div className={styles.headingCongrats}>
        Congrats your Quiz is Published!
      </div>

      <div className={styles.linkContainer}>{url} </div>

      <button className={styles.share} onClick={CopyToClipBoard}>
        Share
      </button>
    </div>
  );
};

export default Congrats;
