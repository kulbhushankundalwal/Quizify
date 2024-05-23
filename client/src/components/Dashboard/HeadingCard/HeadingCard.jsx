import styles from "./headingCard.module.css";

const HeadingCard = ({ text, color, counts }) => {
  const fontColor = { color: color };
  return (
    <div style={fontColor} className={styles.card}>
      <span className={styles.numericValue}> {counts}</span>
      <br />
      <span className={styles.textValue}>{text}</span>
    </div>
  );
};

export default HeadingCard;