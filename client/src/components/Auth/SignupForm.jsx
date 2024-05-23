import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signup } from "../../services/api/userApi";
import styles from "./auth.module.css";
import { useState } from "react";
const SignupForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await signup(userDetails);
      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("successfully submitted the form");
        navigate("/dashboard");
      } else {
        toast.error("something went wrong");
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data?.message);
    }
  };
  return (
    <div className={styles.Form}>
      <div className={styles.inputEntry}>
        <div className={styles.inputTitle}>Name</div>
        <input
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          type="text"
        />
      </div>
      <div className={styles.inputEntry}>
        <div className={styles.inputTitle}>Email</div>
        <input
          name="email"
          value={userDetails.email}
          type="text"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputEntry}>
        <div className={styles.inputTitle}>Password</div>
        <input
          name="password"
          value={userDetails.password}
          onChange={handleInputChange}
          type="password"
        />
      </div>
      <div className={styles.inputEntry}>
        <div className={styles.inputTitle}>Confirm Password</div>
        <input
          name="confirmPassword"
          value={userDetails.confirmPassword}
          type="password"
          onChange={handleInputChange}
        />
      </div>

      <button className={styles.button} onClick={handleSubmit}>
        Sign-Up
      </button>
    </div>
  );
};

export default SignupForm;
