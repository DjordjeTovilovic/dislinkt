import { Container, Content, Header, Add } from "./styled";

const AddSkillModal = (props) => {
	const reset = (e) => {
		props.addSkillHandler(e);
	}
	return (
		<> {props.showAddSkillModal === 'open' &&
			<Container>
				<Content>
					<Header>
						<h2>Add skill</h2>
						<button onClick={(event) => reset(event)}>
							<img src="/images/close-icon.svg"></img>
						</button>
					</Header>
					<Add>
						<label>Skill: </label>
						<input id="name" name="name"></input>
					</Add>
					<button className="submit">Submit</button>
				</Content>
			</Container>
		}
		</>
	)
}

export default AddSkillModal;