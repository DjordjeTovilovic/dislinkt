import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const login = async (credentials) => {
  const res = await axios.post(`http://localhost:3000/auth/login`, credentials)
  if (res.data.token) window.localStorage.setItem("token", res.data.token);
  else throw new Error("User does not exist with these credentials!");
  return res.data;
}

const logout = async () => {
  window.localStorage.clear();
}

const getById = async (id) => {
  const res = await axios.get(`http://localhost:3000/users/${id}`)
  return res.data;
}

const getByUsername = async (username) => {
  const res = await axios.get(`http://localhost:3000/users/username/${username}`)
  return res.data;
}

const getMe = async () => {
  const res = await axios.get(`http://localhost:3000/users/users/me`)
  return res.data;
}

const getRecommendedJobs = async () => {
  const res = await axios.get(`http://localhost:3000/jobs/jobOffers/recommended`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}

const getJobById = async (jobId) => {
  const res = await axios.get(`http://localhost:3000/jobs/job/${jobId}`)
  return res.data;
}

const getRecommendedProfilesThroughMutual = async () => {
  const res = await axios.get(`http://localhost:3000/users/users/recommended/mutualProfile/1`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}

const getRecommendedProfilesThroughSkill = async () => {
  const res = await axios.get(`http://localhost:3000/users/users/recommended/skill/1`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}
const getRecommendedProfilesThroughExperience = async () => {
  const res = await axios.get(`http://localhost:3000/users/users/recommended/experience/1`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}
const getRecommendedProfilesThroughEducation = async () => {
  const res = await axios.get(`http://localhost:3000/users/users/recommended/education/1`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}
const getRecommendedProfilesThroughInterest = async () => {
  const res = await axios.get(`http://localhost:3000/users/users/recommended/interest/1`, {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
  })
  return res.data;
}

const getEducationsForUser = async (id) => {
  const res = await axios.get(`http://localhost:3000/users/${id}/education`)
  return res.data;
}

const getInterestsForUser = async (id) => {
  const res = await axios.get(`http://localhost:3000/users/${id}/interests`)
  return res.data;
}

const getSkillsForUser = async (id) => {
  const res = await axios.get(`http://localhost:3000/users/${id}/skills`)
  return res.data;
}

const getExperiencesForUser = async (id) => {
  const res = await axios.get(`http://localhost:3000/users/${id}/experience`)
  return res.data;
}

const userService = {
  login,
  logout,
  getById,
  getByUsername,
  getMe,
  getRecommendedJobs,
  getJobById,
  getRecommendedProfilesThroughMutual,
  getRecommendedProfilesThroughSkill,
  getRecommendedProfilesThroughEducation,
  getRecommendedProfilesThroughExperience,
  getRecommendedProfilesThroughInterest,
  getEducationsForUser,
  getInterestsForUser,
  getSkillsForUser,
  getExperiencesForUser,
}
export default userService;