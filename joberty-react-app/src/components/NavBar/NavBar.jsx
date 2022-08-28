import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import userService from "../../service/user";

const NavBar = () => {
  const token = localStorage.getItem("token");
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <ul className={styles.ull}>
            <li className={styles.lii}>
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.li}>
          <ul className={styles.ull}>
            {token ? (
              <li className={styles.lii}>
                <button
                  className={styles.button}
                  onClick={() =>
                    userService
                      .logout()
                      .then(() => window.location.replace("/"))
                  }
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className={styles.lii}>
                  <Link to="/signup" className={styles.link}>
                    Signup
                  </Link>
                </li>
                <li className={styles.lii}>
                  <Link to="/login" className={styles.link}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
