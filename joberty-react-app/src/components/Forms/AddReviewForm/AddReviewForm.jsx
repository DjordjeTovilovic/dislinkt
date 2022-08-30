import styles from "./AddReviewForm.module.scss";
import { useState } from "react";

const AddReviewForm = ({ handleAddReview, type }) => {
  const [review, setReview] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <h1>Write {type}</h1>
      <form className={styles.form}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label htmlFor="position" className={styles.label}>
              Job position
            </label>
            <br />
            <input
              className={styles.input}
              type="text"
              id="position"
              name="position"
              placeholder="Input job position"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="seniority" className={styles.label}>
              Job seniority
            </label>
            <br />
            <input
              className={styles.input}
              type="text"
              id="seniority"
              name="seniority"
              placeholder="Input job seniority"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <label htmlFor={type} className={styles.label}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
        <br />
        {type === "salary" ? (
          <input
            className={styles.input}
            type="number"
            id={type}
            name={type}
            placeholder="Input job salary"
            required
            onChange={handleChange}
          />
        ) : (
          <textarea
            rows={10}
            cols={50}
            className={styles.textarea}
            id={type}
            name={type}
            placeholder={`Input ${type}`}
            required
            onChange={handleChange}
          />
        )}
        <br />
        <button
          type="submit"
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault();
            handleAddReview(review, type);
          }}
        >
          Sumbit
        </button>
      </form>
    </>
  );
};
export default AddReviewForm;
