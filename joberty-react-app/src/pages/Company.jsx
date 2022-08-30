import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyProfileCard from "../components/Cards/CompanyProfileCard/CompanyProfileCard";
import companyService from "../service/company";

const Company = () => {
  const [company, setCompany] = useState({});
  const { companyId } = useParams();
  useEffect(() => {
    companyService
      .getCompanyById(companyId)
      .then((gotCompany) => setCompany(gotCompany))
      .catch((err) => console.log(err));
  }, [companyId]);
  return <CompanyProfileCard company={company} />;
};
export default Company;
