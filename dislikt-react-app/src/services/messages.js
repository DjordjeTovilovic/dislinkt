import axios from 'axios'
// const baseUrl = process.env.API_URL
const baseUrl = 'http://localhost:3000/'

export const getMessagesForUsers = async (users) => {
	const res = await axios.post(baseUrl + 'messages', users)
	return res.data
}

export const sendMessage = async (message) => {
	const res = await axios.post(baseUrl + 'messages/send', message)
	return res.data
}