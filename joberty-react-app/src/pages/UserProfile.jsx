import { useEffect, useState } from "react";
import UserProfileCard from "../components/Cards/UserProfileCard/UserProfileCard";
import userService from "../service/user";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const handleTokenInput = (e) => {
    const { value } = e.target;
    setToken(value);
  };

  const connectToDislinktAccount = () => {
    if (token)
      userService
        .connectWithDislinktAccount(token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  };

  useEffect(() => {
    userService
      .getMe()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserProfileCard
      user={user}
      handleTokenInput={handleTokenInput}
      connectToDislinktAccount={connectToDislinktAccount}
    />
  );
};
export default UserProfile;
