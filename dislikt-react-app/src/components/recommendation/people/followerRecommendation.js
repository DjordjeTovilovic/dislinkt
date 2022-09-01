import styled from 'styled-components'
import userService from '../../../services/user'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const FollowerRecommendation = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([])
	const [type, setType] = useState('mutual')
	const [follows, setFollows] = useState([])
	const [approvals, setApprovals] = useState([])
	const [declineals, setDeclineals] = useState([])

	const approveRequest = async (index, username) => {
		if (approvals[index] === "Approve")
			userService.approveRequest(username)
				.then(() => {
					let apps = [...approvals]
					apps[index] = "Approved"
					setApprovals(apps)
				})
				.catch((err) => console.log(err))
		else console.log("already approved")
	}

	const declineRequest = async (index, username) => {
		if (declineals[index] === "Decline")
			userService.declineRequest(username)
				.then(() => {
					let apps = [...approvals]
					apps[index] = "Declined"
					setDeclineals(apps)
				})
				.catch((err) => console.log(err))
		else console.log("already declined")
	}

	const changeFollow = async (index, followType, username) => {
		let folls = [...follows]
		switch (followType) {
			case "Follow": {
				await userService.follow(username);
				folls[index] = "Unfollow"
				setFollows(folls)
				break;
			}
			case "Unfollow": {
				await userService.unfollow(username);
				folls[index] = "Follow"
				setFollows(folls)
				break;
			}
			case "Request Follow": {
				await userService.follow(username);
				folls[index] = "Delete Request"
				setFollows(folls)
				break;
			}
			case "Delete Request": {
				await userService.deleteRequest(username);
				folls[index] = "Request Follow"
				setFollows(folls)
				break;
			}
			case "Approve": {
				await userService.deleteRequest(username);
				folls[index] = "Request Follow"
				setFollows(folls)
				break;
			}
			default: break;
		}
	}

	useEffect(() => {
		if (users?.users?.length > 0) {
			if (type !== "requests" && type !== "following") {
				let fols = Array(users?.users?.length).fill('Follow')
				users?.users?.forEach((user, index) => { if (user.privateProfile) fols[index] = 'Request Follow' })
				setFollows(fols)
			}
			else if (type === "following") setFollows(Array(users?.users?.length).fill('Unfollow'))
			else { setApprovals(Array(users?.users?.length).fill('Approve')); setDeclineals(Array(users?.users?.length).fill('Decline')) }
		}
		else setFollows([])
	}, [users])

	useEffect(() => {
		switch (type) {
			case 'mutual': {
				userService.getRecommendedProfilesThroughMutual()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			case 'interest': {
				userService.getRecommendedProfilesThroughInterest()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			case 'experience': {
				userService.getRecommendedProfilesThroughExperience()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			case 'skill': {
				userService.getRecommendedProfilesThroughSkill()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			case 'education': {
				userService.getRecommendedProfilesThroughEducation()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			case 'requests': {
				userService.getFollowRequests()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			case 'following': {
				userService.getFollowing()
					.then((gotUsers) => setUsers(gotUsers))
					.catch((err) => console.log(err))
				break;
			}
			default: break;
		}
	}, [type])
	return (
		<Container>
			<Content>
				<h1>Recommendations</h1>
				<div className='div'>
					<button className={type === 'mutual' ? 'clicked' : ''} onClick={() => setType('mutual')}>Mutual</button>
					<button className={type === 'interest' ? 'clicked' : ''} onClick={() => setType('interest')}>Interests</button>
					<button className={type === 'skill' ? 'clicked' : ''} onClick={() => setType('skill')}>Skills</button>
					<button className={type === 'experience' ? 'clicked' : ''} onClick={() => setType('experience')}>Experience</button>
					<button className={type === 'education' ? 'clicked' : ''} onClick={() => setType('education')}>Education</button>
					<button className={type === 'requests' ? 'clicked' : ''} onClick={() => setType('requests')}>Requests</button>
					<button className={type === 'following' ? 'clicked' : ''} onClick={() => setType('following')}>Following</button>
				</div>
				<List>
					{users.users?.length > 0 ? users.users?.map((user, index) => (
						<Person key={user.id}>
							<div>
								<img src='/images/user.svg'></img>
								<h3>{user.username} ({user.email})</h3>
							</div>
							<button onClick={() => { navigate(`/profile/${user.id}`) }}>View</button>
							{type === "requests"
								? (<>
									<button onClick={() => { approveRequest(index, user.username) }}>{approvals[index]}</button>
									<button onClick={() => { declineRequest(index, user.username) }}>{declineals[index]}</button>
								</>)
								: (<button onClick={() => { changeFollow(index, follows[index], user.username) }}>{follows[index]}</button>)}
						</Person>)) : <></>}
				</List>
			</Content>
		</Container>
	);
}

export default FollowerRecommendation;

const Container = styled.div`
    padding: 62px;
    max-width: 100%;`;

const Content = styled.div`

    h1{
        padding: 20px 12px 0px 12px;
        font-size: x-large;
    }

    margin:auto;
    width: 40%;
    border: 1px solid lightgray;
    overflow-y: auto;
    background-color: white;

		.div{
			display:flex;
			margin:10px;
			border-bottom:1px solid black;
			padding:5px;
			button{
				width: 80px;
       	height: 35px;
       	border-radius: 24px;
				background-color:  blue;
				border: none;
				color: white;
				cursor: pointer;
				padding: 8px;
				margin-left: 5px;
       	&:hover {
					background-color: #00b3db;
					border-color: #285e8e;
       	}
			}
			.clicked{
				width: 80px;
       	height: 35px;
       	border-radius: 24px;
				background-color:  #00b3db;
				border: none;
				color: white;
				cursor: pointer;
				padding: 8px;
				margin-left: 5px;
       	&:hover {
					background-color: blue;
					border-color: #285e8e;
       	}
			}
		}
`;

const List = styled.li`
    list-style: none;
`;

const Person = styled.div`

    flex-direction: row;
    display: flex;
    padding: 10px;
    width: 95%;
    align-items: center;
    justify-content: space-between;

    button{
       width: 80px;
       height: 40px;
       border-radius: 24px;
       background-color:  #0a66c2 ;
       border: none;
       color: white;
       cursor: pointer;
       padding: 8px;
       margin-top: 5px !important;
     
       &:hover {
         background-color: #00b3db;
         border-color: #285e8e;
       }
   }

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;