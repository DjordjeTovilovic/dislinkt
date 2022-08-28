import AddCompanyForm from "../components/Forms/AddCompanyForm/AddCompanyForm";
import companyService from "../service/company";

const AddCompany = () => {
  const handleAddCompany = (companyInfo) => {
    if (companyInfo.name && companyInfo.description)
      companyService
        .addCompany(companyInfo)
        .then(() => window.location.replace("/"))
        .catch((err) => console.log(err));
  };

  return <AddCompanyForm handleAddCompany={handleAddCompany} />;
};
export default AddCompany;
