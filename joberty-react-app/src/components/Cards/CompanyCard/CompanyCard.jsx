import { Link } from "react-router-dom";
import styles from "./CompanyCard.module.scss";

const CompanyCard = ({ company }) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.name}>
            <p>{company.name}</p>
          </div>
          <div className={styles.description}>
            <p>{company.description}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <span style={{ color: "white", marginBlockStart: "0" }}>
            ({company.jobOffers.length} job offers)
          </span>
          <Link
            to={`/companies/${company.id}/jobOffers`}
            className={styles.jobOfferLink}
          >
            VIEW JOB OFFERS
          </Link>
          <Link to={`/companies/${company.id}`} className={styles.profileLink}>
            VIEW PROFILE
          </Link>
        </div>
      </div>
    </>
  );
};
export default CompanyCard;
