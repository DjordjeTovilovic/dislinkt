import { useEffect, useState } from "react";
import styles from "./JobOfferCard.module.scss";

const JobOfferCard = ({ job, publish, publishToDislinkt, dislinktToken }) => {
  const [skills, setSkills] = useState("");

  useEffect(() => {
    let skillss = "";
    job.skillsRequired?.forEach((skill, index) => {
      if (index === job.skillsRequired.length - 1)
        skillss = `${skillss} ${skill}`;
      else skillss = `${skillss} ${skill},`;
    });
    setSkills(skillss);
  }, [job.skillsRequired]);

  return (
    <div className={styles.card}>
      <p className={styles.position}>{job.position}</p>
      <p className={styles.seniority}>({job.seniority})</p>
      <div className={styles.description}>{job.description}</div>
      <p className={styles.seniority}>REQUIRED SKILLS</p>
      <div className={styles.skills}>{skills}</div>
      {publish && (
        <button
          type="button"
          className={styles.publishBtn}
          onClick={() =>
            publishToDislinkt({ ...job, dislinktToken: dislinktToken })
          }
        >
          PUBLISH ON DISLINKT
        </button>
      )}
    </div>
  );
};
export default JobOfferCard;
