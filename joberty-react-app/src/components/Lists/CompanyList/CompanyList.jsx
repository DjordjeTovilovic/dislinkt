//import styles from "./CompanyList.module.scss";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";

const CompanyList = ({ companies }) => {
  return (
    <>
      {companies?.map((company) => (
        <CompanyCard company={company} key={company.id} />
      ))}
    </>
  );
};
export default CompanyList;
