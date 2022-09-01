import axios from 'axios'
// const baseUrl = process.env.API_URL
const baseUrl = 'http://localhost:3000/'

export const getPostsForUsers = async () => {
	const res = await axios.get(baseUrl + 'posts')
	return res.data
}

export const getPostsForUserId = async (userId) => {
	const res = await axios.get(baseUrl + `posts/user/${userId}`)
	return res.data
}

export const getCommentsForPost = async (postId) => {
	const res = await axios.get(baseUrl + `posts/${postId}/comments`)
	return res.data
}

export const commentPost = async (body, postId) => {
	const res = await axios.post(baseUrl + `posts/${postId}/comments`, body)
	return res.data
}

export const likePost = async (body, postId) => {
	const res = await axios.post(baseUrl + `posts/${postId}/like`, body)
	return res.data
}

export const dislikePost = async (body, postId) => {
	const res = await axios.post(baseUrl + `posts/${postId}/dislike`, body)
	return res.data
}