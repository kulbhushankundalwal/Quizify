import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { formContext } from "../../context/FormProvider";
import logo from "../../assets/logo.png";
import logoFull from "../../assets/logo-full.png";
import line from "../../assets/line.svg";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { showForm, setForm } = useContext(formContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const closeMenu = () => {
    setShowLinks(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src={logo} alt="logo" className={styles.logo} />
        <img src={logoFull} alt="logo" className={styles.logoFull} />
        <button
          className={styles.hamburger}
          onClick={() => setShowLinks(!showLinks)}
        >
          ☰
        </button>
      </div>
      <div className={`${styles.links} ${showLinks ? styles.show : ""}`}>
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard" ? styles.selectedSideBar : ""
          }
          onClick={closeMenu}
        >
          Dashboard
        </Link>
        <Link
          to="/analytics"
          className={
            location.pathname === "/analytics" ? styles.selectedSideBar : ""
          }
          onClick={closeMenu}
        >
          <div>Analytics</div>
        </Link>
        <div
          className={styles.pointer}
          onClick={() => {
            setForm(!showForm);
            closeMenu();
          }}
        >
          Create Quiz
        </div>
      </div>
      <img
        src={line}
        alt="line"
        className={`${styles.line} ${showLinks ? "" : styles.show}`}
      />
      <div
        className={`${styles.logout} ${showLinks ? "" : styles.show}`}
        onClick={() => {
          handleLogout();
          closeMenu(); 
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
