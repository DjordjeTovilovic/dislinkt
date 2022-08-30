import styles from "./CompanyProfileCard.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import AddReviewForm from "../../Forms/AddReviewForm/AddReviewForm";
import companyService from "../../../service/company";
import userService from "../../../service/user";

const CompanyProfileCard = ({ company }) => {
  const [salaries, setSalaries] = useState({});
  const [selector, setSelector] = useState(0);
  const [counts, setCounts] = useState({});
  const [percentages, setPercentages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    userService
      .getMe()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  const changeModalState = () => setIsModalOpen(!isModalOpen);

  const handleAddReview = (review, type) => {
    switch (type) {
      case "interview":
        if (review.seniority && review.position && review.interview)
          companyService
            .addInterview(company.id, review)
            .then(() => window.location.reload())
            .catch((err) => console.log(err));
        break;
      case "review":
        if (review.seniority && review.position && review.review)
          companyService
            .addReview(company.id, review)
            .then(() => window.location.reload())
            .catch((err) => console.log(err));
        break;
      case "salary":
        if (review.seniority && review.position && review.salary > 0)
          companyService
            .addSalary(company.id, review)
            .then(() => window.location.reload())
            .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSalaries({
      low: company.salaries?.filter((salary) => salary.salary < 1000),
      medium: company.salaries?.filter(
        (salary) => salary.salary >= 1000 && salary.salary < 2000
      ),
      good: company.salaries?.filter(
        (salary) => salary.salary >= 2000 && salary.salary < 4000
      ),
      excellent: company.salaries?.filter((salary) => salary.salary >= 4000),
    });
    setCounts({
      low: company.salaries?.filter((salary) => salary.salary < 1000).length,
      medium: company.salaries?.filter(
        (salary) => salary.salary >= 1000 && salary.salary < 2000
      ).length,
      good: company.salaries?.filter(
        (salary) => salary.salary >= 2000 && salary.salary < 4000
      ).length,
      excellent: company.salaries?.filter((salary) => salary.salary >= 4000)
        .length,
    });
    setPercentages({
      low: Math.round(
        (company.salaries?.filter((salary) => salary.salary < 1000).length /
          company.salaries?.length) *
          100
      ),
      medium: Math.round(
        (company.salaries?.filter(
          (salary) => salary.salary >= 1000 && salary.salary < 2000
        ).length /
          company.salaries?.length) *
          100
      ),
      good: Math.round(
        (company.salaries?.filter(
          (salary) => salary.salary >= 2000 && salary.salary < 4000
        ).length /
          company.salaries?.length) *
          100
      ),
      excellent: Math.round(
        (company.salaries?.filter((salary) => salary.salary >= 4000).length /
          company.salaries?.length) *
          100
      ),
    });
  }, [company]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.name}>
            <p>{company.name}</p>
          </div>
          <div className={styles.description}>
            <p>{company.description}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <Link
            to={`/companies/${company.id}/jobOffers`}
            className={styles.jobOfferLink}
          >
            VIEW JOB OFFERS
          </Link>
          {user?.companiesOwned?.id !== company.id && (
            <>
              <button
                type="button"
                onClick={() => {
                  setType("review");
                  changeModalState();
                }}
              >
                Write review
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("interview");
                  changeModalState();
                }}
              >
                Write interview
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("salary");
                  changeModalState();
                }}
              >
                Anonymous salary
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.other}>
        <div className={styles.selectors}>
          <div
            className={selector === 0 ? styles.reviewsClicked : styles.reviews}
            onClick={() => setSelector(0)}
          >
            Reviews({company.reviews?.length})
          </div>
          <div
            className={
              selector === 1 ? styles.interviewsClicked : styles.interviews
            }
            onClick={() => setSelector(1)}
          >
            Interviews({company.interviews?.length})
          </div>
          <div
            className={
              selector === 2 ? styles.salariesClicked : styles.salaries
            }
            onClick={() => setSelector(2)}
          >
            Salaries({company.salaries?.length})
          </div>
        </div>
        <div className={styles.content}>
          {selector === 0 &&
            company.reviews?.map((review, index) => (
              <div className={styles.review} key={index}>
                <p className={styles.reviewTitle}>
                  {review.position} ({review.seniority})
                </p>
                <p className={styles.reviewReview}>{review.review}</p>
              </div>
            ))}
          {selector === 1 &&
            company.interviews?.map((interview, index) => (
              <div className={styles.interview} key={index}>
                <p className={styles.interviewTitle}>
                  {interview.position} ({interview.seniority})
                </p>
                <p className={styles.interviewInterview}>
                  {interview.interview}
                </p>
              </div>
            ))}
          {selector === 2 && (
            <div className={styles.salary}>
              <div className={styles["s0-1000s"]}>
                <p className={styles.amount}>0-1000€</p>
                <p className={styles.count}>({counts.low})</p>
                <div className={styles["single-chart"]}>
                  <svg viewBox="0 0 36 36" className={styles["circular-chart"]}>
                    <path
                      className={styles["circle-bg"]}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={styles["circle"]}
                      strokeDasharray={`${percentages.low}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className={styles["percentage"]}>
                      {percentages.low}%
                    </text>
                  </svg>
                </div>
                <div className={styles.workers}>
                  {salaries.low?.map((salary, index) => (
                    <p key={index} className={styles.worker}>
                      {salary.position}({salary.seniority})
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles["s1000-2000s"]}>
                <p className={styles.amount}>1000-2000€</p>
                <p className={styles.count}>({counts.medium})</p>
                <div className={styles["single-chart"]}>
                  <svg viewBox="0 0 36 36" className={styles["circular-chart"]}>
                    <path
                      className={styles["circle-bg"]}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={styles["circle"]}
                      strokeDasharray={`${percentages.medium}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className={styles["percentage"]}>
                      {percentages.medium}%
                    </text>
                  </svg>
                </div>
                <div className={styles.workers}>
                  {salaries.medium?.map((salary, index) => (
                    <p key={index} className={styles.worker}>
                      {salary.position}({salary.seniority})
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles["s2000-4000s"]}>
                <p className={styles.amount}>2000-4000€</p>
                <p className={styles.count}>({counts.good})</p>
                <div className={styles["single-chart"]}>
                  <svg viewBox="0 0 36 36" className={styles["circular-chart"]}>
                    <path
                      className={styles["circle-bg"]}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={styles["circle"]}
                      strokeDasharray={`${percentages.good}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className={styles["percentage"]}>
                      {percentages.good}%
                    </text>
                  </svg>
                </div>
                <div className={styles.workers}>
                  {salaries.good?.map((salary, index) => (
                    <p key={index} className={styles.worker}>
                      {salary.position}({salary.seniority})
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles["s4000s"]}>
                <p className={styles.amount}>4000+€</p>
                <p className={styles.count}>({counts.excellent})</p>
                <div className={styles["single-chart"]}>
                  <svg viewBox="0 0 36 36" className={styles["circular-chart"]}>
                    <path
                      className={styles["circle-bg"]}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={styles["circle"]}
                      strokeDasharray={`${percentages.excellent}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className={styles["percentage"]}>
                      {percentages.excellent}%
                    </text>
                  </svg>
                </div>
                <div className={styles.workers}>
                  {salaries.excellent?.map((salary, index) => (
                    <p key={index} className={styles.worker}>
                      {salary.position}({salary.seniority})
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        changeModalState={changeModalState}
        isOpenModal={isModalOpen}
        content={
          <AddReviewForm handleAddReview={handleAddReview} type={type} />
        }
      />
    </>
  );
};
export default CompanyProfileCard;
