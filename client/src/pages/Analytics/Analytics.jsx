import styles from "./analytics.module.css";
import AnalysisTableCard from "../../components/Analytics/AnalysisTable/AnalyticsTableCard";
const Analytics = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Quiz Analysis</h1>

      <AnalysisTableCard />
    </div>
  );
};

export default Analytics;
