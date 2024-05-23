import styles from "./sidebar.module.css";
import logo from "../../assets/logo.png";
import line from "../../assets/line.svg";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { formContext } from "../../context/FormProvider";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { showForm, setForm } = useContext(formContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className={styles.sidebar}>
      <img src={logo} alt="logo" />
      <div className={styles.elements}>
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard" ? styles.selectedSideBar : ""
          }
        >
          <div>Dashboard</div>
        </Link>
        {/* <Link
          to="/analytics"
          className={
            location.pathname === "/analytics" ? styles.selectedSideBar : ""
          }
        >
          <div>Analytics</div>
        </Link> */}
        <div onClick={() => setForm(!showForm)}>Create Quiz</div>
      </div>

      <img src={line} alt="line" className={styles.line} />
      <div className={styles.logout} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
