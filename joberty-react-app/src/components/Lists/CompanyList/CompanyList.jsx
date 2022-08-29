import styles from "./CompanyList.module.scss";
import MyCompanyCard from "../../Cards/MyCompanyCard/MyCompanyCard";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";

const CompanyList = ({ type, companies }) => {
  return (
    <>
      {type === "my"
        ? companies?.map((company) => (
            <MyCompanyCard company={company} key={company.id} />
          ))
        : companies?.map((company) => (
            <CompanyCard company={company} key={company.id} />
          ))}
    </>
  );
};
export default CompanyList;
