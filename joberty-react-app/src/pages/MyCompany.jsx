import { useEffect, useState } from "react";
import MyCompanyCard from "../components/Cards/MyCompanyCard/MyCompanyCard";
import userService from "../service/user";

const MyCompany = () => {
  const [company, setCompany] = useState({});
  useEffect(() => {
    userService
      .getMe()
      .then((gotUser) => setCompany(gotUser.companiesOwned))
      .catch((err) => console.log(err));
  }, []);
  return <MyCompanyCard company={company} />;
};
export default MyCompany;
