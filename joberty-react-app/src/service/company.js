import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const addCompany = async (companyInfo) => {
  const res = await axios.post(`${baseUrl}companies`, companyInfo, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res;
}

const updateCompany = async (companyId, companyInfo) => {
  const res = await axios.patch(`${baseUrl}companies/${companyId}`, companyInfo, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res;
}

const getCompanyById = async (companyId) => {
  const res = await axios.get(`${baseUrl}companies/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}

const getAllCompanies = async () => {
  const res = await axios.get(`${baseUrl}companies/`)
  return res.data;
}

const addJobOffer = async (companyId, jobOffer) => {
  const res = await axios.post(`${baseUrl}companies/${companyId}/jobs`, jobOffer, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res;
}

const addReview = async (companyId, review) => {
  const res = await axios.post(`${baseUrl}companies/${companyId}/reviews`, review, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res;
}

const addInterview = async (companyId, interview) => {
  const res = await axios.post(`${baseUrl}companies/${companyId}/interviews`, interview, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res;
}

const addSalary = async (companyId, salary) => {
  const res = await axios.post(`${baseUrl}companies/${companyId}/salaries`, salary, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res;
}

const companyService = {
  addCompany,
  updateCompany,
  getCompanyById,
  getAllCompanies,
  addJobOffer,
  addInterview,
  addReview,
  addSalary
}

export default companyService