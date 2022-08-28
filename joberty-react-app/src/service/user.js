import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL

const signup = async (credentials) => {
  const res = await axios.post(`${baseUrl}auth/registration`, credentials)
  return res;
}

const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}auth/login`, credentials)
  if (res.data.token) window.localStorage.setItem("token", res.data.token);
  else throw new Error("User does not exist with these credentials!");
  return res.data;
}

const logout = async () => {
  window.localStorage.clear();
}

const getMe = async () => {
  const res = await axios.get(`${baseUrl}users/profile/me`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}

const userService = {
  signup,
  login,
  logout,
  getMe
}

export default userService;