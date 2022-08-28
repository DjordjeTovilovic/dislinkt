import { useState } from "react";
import styles from "./SignupForm.module.scss";

const SignupForm = ({ handleSignup }) => {
  const [signupCredentials, setSignupCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <h1>Signup page</h1>
      <form className={styles.form}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <br />
        <input
          className={styles.input}
          type="text"
          id="username"
          name="username"
          placeholder="Input username"
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <br />
        <input
          className={styles.input}
          type="password"
          id="password"
          name="password"
          placeholder="Input password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$"
          required
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault();
            handleSignup(signupCredentials);
          }}
        >
          Signup
        </button>
      </form>
    </>
  );
};
export default SignupForm;
