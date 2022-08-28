import { useState } from "react";
import styles from "./AddCompanyForm.module.scss";
const AddCompanyForm = ({ handleAddCompany }) => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <h1>Add company page</h1>
      <form className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Company name
        </label>
        <br />
        <input
          className={styles.input}
          type="text"
          id="name"
          name="name"
          placeholder="Input company name"
          required
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <br />
        <textarea
          rows={10}
          cols={50}
          className={styles.textarea}
          id="description"
          name="description"
          placeholder="Input company description"
          required
          onChange={handleChange}
        />
        <br />
        <button
          type="submit"
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault();
            handleAddCompany(companyInfo);
          }}
        >
          Sumbit
        </button>
      </form>
    </>
  );
};
export default AddCompanyForm;
