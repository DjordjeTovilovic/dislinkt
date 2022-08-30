import styles from "./RequestCard.module.scss";

const RequestCard = ({ request, handleConfirm, handleDelete }) => {
  console.log(request);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.title}>
            <p>REQUEST</p>
          </div>
          <div className={styles.company}>
            <p>Company Name: {request.company.name}</p>
            <p>Description: {request.company.description}</p>
          </div>
          <div className={styles.company}>
            <p>Username: {request.user.username}</p>
            <p> {request.user.roles[0]}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => handleConfirm(request.id)}
            className={styles.jobOfferLink}
          >
            CONFIRM
          </button>
          <button
            onClick={() => handleDelete(request.id)}
            className={styles.profileLink}
          >
            DECLINE
          </button>
        </div>
      </div>
    </>
  );
};
export default RequestCard;
