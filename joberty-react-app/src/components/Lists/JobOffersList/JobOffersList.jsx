import { useEffect, useState } from "react";
import userService from "../../../service/user";
import JobOfferCard from "../../Cards/JobOfferCard/JobOfferCard";
import AddJobOfferForm from "../../Forms/AddJobOfferFrom/AddJobOfferForm";
import Modal from "../../Modal/Modal";
import styles from "./JobOffersList.module.scss";

const JobOffersList = ({ company, handleAddJobOffer, publishToDislinkt }) => {
  const [isAddJobOfferModalOpen, setIsAddJobOfferModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const changeAddJobOfferModalState = () =>
    setIsAddJobOfferModalOpen(!isAddJobOfferModalOpen);

  useEffect(() => {
    userService
      .getMe()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>Job offers</h2>
      {user?.companiesOwned?.id === company.id && (
        <button
          className={styles.addJobOfferBtn}
          onClick={changeAddJobOfferModalState}
        >
          ADD JOB OFFER
        </button>
      )}
      <div className={styles.jobOfferList}>
        {company.jobOffers?.map((job) => (
          <JobOfferCard
            job={job}
            key={job.id}
            publish={user?.companiesOwned?.id === company.id}
            publishToDislinkt={publishToDislinkt}
            dislinktToken={user?.dislinktToken}
          />
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
