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

const companyService = {
  addCompany,
  updateCompany
}

export default companyService