import styled from 'styled-components'
import userService from '../../../services/user'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const FollowerRecommendation = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([])
	const [type, setType] = useState('mutual')
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
			default: break;
		}
		userService.getRecommendedProfilesThroughMutual().then((gotUsers) => setUsers(gotUsers)).catch((err) => console.log(err))
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
				</div>
				<List>
					{users.users?.length > 0 ? users.users?.map((user) => (
						<Person key={user.id}>
							<div>
								<img src='/images/user.svg'></img>
								<h3>{user.username} ({user.email})</h3>
							</div>
							<button onClick={() => { navigate(`/profile/${user.id}`) }}>View</button>
							<button>Follow</button>
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
       height: 35px;
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