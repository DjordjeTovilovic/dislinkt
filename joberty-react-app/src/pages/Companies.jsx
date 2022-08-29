import { useEffect } from "react";
import { useState } from "react";
import CompanyList from "../components/Lists/CompanyList/CompanyList";
import companyService from "../service/company";
import userService from "../service/user";

const Companies = ({ type }) => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    if (type === "my")
      userService
        .getMe()
        .then((gotUser) => setCompanies(gotUser.companiesOwned))
        .catch((err) => console.log(err));
    else if (type === "client")
      companyService
        .getAllCompanies()
        .then((gotCompanies) => setCompanies(gotCompanies))
        .catch((err) => console.log(err));
  }, []);
  if (companies.length > 0)
    return <CompanyList type={type} companies={companies} />;
  return <h1>No companies</h1>;
};
export default Companies;
