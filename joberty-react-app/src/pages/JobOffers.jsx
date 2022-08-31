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
      .then((gotCompany) => {
        setCompany(gotCompany);
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

  const publishToDislinkt = (jobOffer) => {
    companyService
      .promoteJob({ ...jobOffer, company: company.name })
      .then((res) => {
        if (res.status === 201) alert("JOB OFFER HAS BEEN PUBLISHED");
        else alert("PROBLEM");
      })
      .catch((err) => {
        console.log(err);
        alert("ERROR");
      });
  };

  return (
    <JobOffersList
      company={company}
      handleAddJobOffer={handleAddJobOffer}
      publishToDislinkt={publishToDislinkt}
    />
  );
};
export default JobOffers;
