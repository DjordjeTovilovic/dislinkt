import { Container, Content, Header, Add } from "./styled"
import { useState } from 'react'
import userService from '../../../../../services/user'


const AddInterestsModal = (props) => {
	const [interest, setInterest] = useState({})
	const reset = (e) => {
		props.addInterestHandler(e);
	}

	const add = () => {
		if (interest.name)
			userService.addInterest({ interests: [interest] }).then(() => window.location.reload())
	}

	const change = (e) => {
		const { name, value } = e.target;
		setInterest((prevState) => ({ ...prevState, [name]: value }))
	}
	return (
		<> {props.showAddInterestsModal === true &&

			<Container>
				<Content>
					<Header>
						<h2>Add interest</h2>
						<button onClick={(event) => reset(event)}>
							<img src="/images/close-icon.svg"></img>
						</button>
					</Header>
					<Add>
						<label>Interest: </label>
						<input id="name" name="name" onChange={((e) => change(e))}></input>
					</Add>
					<button className="submit" onClick={add}>Submit</button>
				</Content>

			</Container>}
		</>
	)
}


export default AddInterestsModal