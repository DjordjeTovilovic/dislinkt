import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import userService from "../../service/user";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    userService
      .getMe()
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  }, []);
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
            <li className={styles.lii}>
              <Link to="/companies" className={styles.link}>
                All Companies
              </Link>
            </li>
            {user?.roles?.includes("user") && (
              <li className={styles.lii}>
                <Link to="/addCompany" className={styles.link}>
                  Add Company
                </Link>
              </li>
            )}
            {user?.roles?.includes("owner") && (
              <li className={styles.lii}>
                <Link to="/mYcompany" className={styles.link}>
                  My Company
                </Link>
              </li>
            )}
          </ul>
        </li>
        <li className={styles.li}>
          <ul className={styles.ull}>
            {user ? (
              <>
                <li className={styles.lii}>
                  <Link to="/profile" className={styles.link}>
                    Profile
                  </Link>
                </li>
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
              </>
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
