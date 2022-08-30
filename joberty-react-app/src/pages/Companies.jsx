import { useEffect } from "react";
import { useState } from "react";
import CompanyList from "../components/Lists/CompanyList/CompanyList";
import companyService from "../service/company";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    companyService
      .getAllCompanies()
      .then((gotCompanies) => setCompanies(gotCompanies))
      .catch((err) => console.log(err));
  }, []);
  if (companies.length > 0) return <CompanyList companies={companies} />;
  return <h1>No companies</h1>;
};
export default Companies;
