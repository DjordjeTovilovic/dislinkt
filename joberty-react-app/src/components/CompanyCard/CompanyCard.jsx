import { useState } from "react";
import styles from "./CompanyCard.module.scss";
import Modal from "../Modal/Modal";
import UpdateCompanyForm from "../Forms/UpdateCompanyForm/UpdateCompanyForm";
import companyService from "../../service/company";

const CompanyCard = ({ company }) => {
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenJobOfferModal, setIsOpenJobOfferModal] = useState(false);

  const changeUpdateModalState = () => setIsOpenUpdateModal(!isOpenUpdateModal);
  const changeJobOfferModalState = () =>
    setIsOpenJobOfferModal(!isOpenJobOfferModal);

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
          <button className={styles.jobOfferBtn}>ADD JOB OFFER</button>
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
export default CompanyCard;
