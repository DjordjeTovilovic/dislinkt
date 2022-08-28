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

const companyService = {
  addCompany
}

export default companyService