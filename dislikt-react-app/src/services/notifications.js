import axios from 'axios'
// const baseUrl = process.env.API_URL
const baseUrl = 'http://localhost:3000/'

export const getNotificationsForUser = async () => {
	const res = await axios.get(baseUrl + 'notifications')
	return res.data
}