import { useState } from "react";
import LoginForm from "../../components/Auth/LoginForm.jsx";
import styles from "./auth.module.css";
import logoFull from "../../assets/logo-full.png";
import SignupForm from "../../components/Auth/SignupForm.jsx";

const Auth = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <div className={styles.authWrapper}>
      <div className={styles.auth}>
        <img src={logoFull} className={styles.authLogo} alt="logo" />

        <div className={styles.choices}>
          <button
            className={!isLogin ? styles.selectedItem : ""}
            onClick={() => {
              setLogin(!isLogin);
            }}
          >
            Sign up
          </button>
          <button
            className={isLogin ? styles.selectedItem : ""}
            onClick={() => {
              setLogin(!isLogin);
            }}
          >
            Log in
          </button>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default Auth;

// TODO: login|signup button needs to be aligned properly
