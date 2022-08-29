import styles from "./AddJobOfferForm.module.scss";
import CloseIcon from "../../../assets/close.svg";
import { useState } from "react";

const AddJobOfferForm = ({ handleAddJobOffer }) => {
  const [skill, setSkill] = useState("");
  const [jobOffer, setJobOoffer] = useState({
    position: "",
    seniority: "",
    description: "",
    skillsRequired: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobOoffer((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSkill = (e) => {
    const { value } = e.target;
    setSkill(value);
  };
  const addSkill = () => {
    if (skill && !jobOffer.skillsRequired.includes(skill))
      setJobOoffer((prevState) => ({
        ...prevState,
        skillsRequired: [...jobOffer.skillsRequired].concat(skill),
      }));
  };
  const removeSkill = (name) => {
    if (jobOffer.skillsRequired.includes(name)) {
      let skillls = [...jobOffer.skillsRequired];
      const idx = skillls.findIndex((skill) => skill === name);
      skillls.splice(idx, 1);
      setJobOoffer((prevState) => ({
        ...prevState,
        skillsRequired: skillls,
      }));
    }
  };
  return (
    <>
      <h1>Add job offer</h1>
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
            <br />
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
          <div>
            <label htmlFor="skills" className={styles.label}>
              Required skills
            </label>
            <br />
            <div className={styles.skillsDiv}>
              <div>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  placeholder="Input job skills"
                  required
                  onChange={handleSkill}
                />
                <button type="button" onClick={addSkill}>
                  add
                </button>
              </div>
              <ul>
                {jobOffer.skillsRequired?.map((skill) => (
                  <li>
                    {skill}
                    <button
                      key={skill}
                      name={skill}
                      type="button"
                      onClick={() => removeSkill(skill)}
                    >
                      <img name={skill} src={CloseIcon} alt="close" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
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
            handleAddJobOffer(jobOffer);
          }}
        >
          Sumbit
        </button>
      </form>
    </>
  );
};
export default AddJobOfferForm;
