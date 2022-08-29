import { useEffect, useState } from "react";
import styles from "./JobOfferCard.module.scss";

const JobOfferCard = ({ job }) => {
  const [skills, setSkills] = useState("");

  useEffect(() => {
    let skillss = "";
    job.skillsRequired?.forEach((skill, index) => {
      if (index === job.skillsRequired.length - 1)
        skillss = `${skillss} ${skill}`;
      else skillss = `${skillss} ${skill},`;
    });
    setSkills(skillss);
  }, []);

  return (
    <div className={styles.card}>
      <p className={styles.position}>{job.position}</p>
      <p className={styles.seniority}>({job.seniority})</p>
      <div className={styles.description}>{job.description}</div>
      <p className={styles.seniority}>REQUIRED SKILLS</p>
      <div className={styles.skills}>{skills}</div>
    </div>
  );
};
export default JobOfferCard;
