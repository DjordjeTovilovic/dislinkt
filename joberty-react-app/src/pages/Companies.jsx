import { useEffect } from "react";
import { useState } from "react";
import CompanyList from "../components/CompanyList/CompanyList";
import userService from "../service/user";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    userService
      .getMe()
      .then((gotUser) => setCompanies(gotUser.companiesOwned))
      .catch((err) => console.log(err));
  }, []);
  if (companies.length > 0) return <CompanyList companies={companies} />;
  return <h1>No companies</h1>;
};
export default Companies;
