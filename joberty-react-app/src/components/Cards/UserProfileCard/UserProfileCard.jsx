import styles from "./UserProfileCard.module.scss";

const UserProfileCard = ({
  user,
  handleTokenInput,
  connectToDislinktAccount,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.userinfo}>
        <span className={styles.title}>Username: </span>
        <span>{user.username}</span>
        <br />
        <span className={styles.title}>Role: </span>
        <span>{user.roles && user.roles[0]}</span>
      </div>
      {user.companiesOwned && (
        <div className={styles.userinfo}>
          <span className={styles.title}>Company: </span>
          <span>{user.companiesOwned.name}</span>
        </div>
      )}
      {user.dislinktToken ? (
        <div className={styles.userinfo}>
          <span className={styles.title}>Dislinkt token: </span>
          <p className={styles.token}>{user.dislinktToken}</p>
        </div>
      ) : (
        <div className={styles.dislinktConnect}>
          <label htmlFor="dislinktToken" className={styles.tokenLabel}>
            Connect to Dislinkt via token
          </label>
          <input
            className={styles.tokenInput}
            name="dislinktToken"
            id="dislinktToken"
            type="text"
            placeholder="input generated dislinkt token"
            required
            onChange={(e) => handleTokenInput(e)}
          />
          <button
            className={styles.connectBtn}
            onClick={connectToDislinktAccount}
          >
            connect
          </button>
        </div>
      )}
    </div>
  );
};
export default UserProfileCard;
