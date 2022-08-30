import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const getAll = async () => {
    const res = await axios.get(`${baseUrl}requests`);
    return res.data;
}
const confirmRequest = async (requestId) =>{
    const res = await axios.post(`${baseUrl}companies/enable/${requestId}`);
    return res.data;
}

const deleteRequest = async(requestId) =>{
    const res = await axios.delete(`${baseUrl}requests/${requestId}`);
    return res.data;
}

const adminService = {
    getAll,confirmRequest,deleteRequest,
}
  
  export default adminService;