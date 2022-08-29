import { useState } from "react";
import styles from "./MyCompanyCard.module.scss";
import Modal from "../../Modal/Modal";
import UpdateCompanyForm from "../../Forms/UpdateCompanyForm/UpdateCompanyForm";
import companyService from "../../../service/company";
import { Link } from "react-router-dom";

const MyCompanyCard = ({ company }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const changeUpdateModalState = () => setIsOpenUpdateModal(!isOpenUpdateModal);

  const handleUpdateCompany = (companyInfo) => {
    companyService
      .updateCompany(company.id, companyInfo)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

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
          <Link
            to={`/companies/${company.id}/jobOffers`}
            className={styles.jobOfferLink}
          >
            VIEW JOB OFFERS
          </Link>
          <button
            className={styles.updateInfoBtn}
            onClick={changeUpdateModalState}
          >
            UPDATE INFO
          </button>
          <button className={styles.deleteCompanyBtn}>DELETE COMPANY</button>
        </div>
      </div>
      <Modal
        changeModalState={changeUpdateModalState}
        isOpenModal={isOpenUpdateModal}
        content={
          <UpdateCompanyForm
            company={company}
            handleUpdateCompany={handleUpdateCompany}
          />
        }
      />
    </>
  );
};
export default MyCompanyCard;
