import { useState } from "react";
import JobOfferCard from "../../Cards/JobOfferCard/JobOfferCard";
import AddJobOfferForm from "../../Forms/AddJobOfferFrom/AddJobOfferForm";
import Modal from "../../Modal/Modal";
import styles from "./JobOffersList.module.scss";

const JobOffersList = ({ jobs, handleAddJobOffer }) => {
  const [isAddJobOfferModalOpen, setIsAddJobOfferModalOpen] = useState(false);
  const changeAddJobOfferModalState = () =>
    setIsAddJobOfferModalOpen(!isAddJobOfferModalOpen);

  return (
    <>
      <button
        className={styles.addJobOfferBtn}
        onClick={changeAddJobOfferModalState}
      >
        ADD JOB OFFER
      </button>
      <div className={styles.jobOfferList}>
        {jobs?.map((job) => (
          <JobOfferCard job={job} />
        ))}
      </div>
      <Modal
        changeModalState={changeAddJobOfferModalState}
        content={<AddJobOfferForm handleAddJobOffer={handleAddJobOffer} />}
        isOpenModal={isAddJobOfferModalOpen}
      />
    </>
  );
};
export default JobOffersList;
