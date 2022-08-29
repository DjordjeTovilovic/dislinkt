import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobOffersList from "../components/Lists/JobOffersList/JobOffersList";
import companyService from "../service/company";

const JobOffers = () => {
  const [company, setCompany] = useState({});
  const { companyId } = useParams();

  useEffect(() => {
    companyService
      .getCompanyById(companyId)
      .then((res) => {
        setCompany(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [companyId]);

  const handleAddJobOffer = (jobOffer) => {
    if (jobOffer.position && jobOffer.seniority && jobOffer.description) {
      companyService
        .addJobOffer(companyId, jobOffer)
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  return (
    <JobOffersList
      jobs={company.jobOffers}
      handleAddJobOffer={handleAddJobOffer}
    />
  );
};
export default JobOffers;
