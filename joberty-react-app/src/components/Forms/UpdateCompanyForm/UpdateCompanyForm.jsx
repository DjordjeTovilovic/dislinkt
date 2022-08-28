import { useState } from "react";
import styles from "./UpdateCompanyForm.module.scss";
const UpdateCompanyForm = ({ company, handleUpdateCompany }) => {
  const [companyInfo, setCompanyInfo] = useState({
    name: company.name,
    description: company.description,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <>
      <h2>Update company info</h2>
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
          value={companyInfo.name}
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
          value={companyInfo.description}
        />
        <br />
        <button
          type="submit"
          className={styles.submitButton}
          onClick={(e) => {
            e.preventDefault();
            handleUpdateCompany(companyInfo);
          }}
        >
          Update
        </button>
      </form>
    </>
  );
};
export default UpdateCompanyForm;
