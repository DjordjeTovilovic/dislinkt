import AddSkillModal from "./skillsModals/addModal/addModal";
import { Container, List } from './styled'
import { useState } from "react";
import UpdateSkillModal from "./skillsModals/updateModal/updateSkillModal";
import AddInterestsModal from "./interestsModals/addModal/addInterestsModal";
import UpdateInterestModal from "./interestsModals/updateModal/updateInterestsModal";
import AddEducationModal from "./educationModals/addModal/addEducationModal";
import UpdateEducationModal from "./educationModals/updateModal/updateEducationModal";
import AddExperianceModal from "./experianceModals/addModal/addExperianceModal";
import UpdateExperianceModal from "./experianceModals/updateModal/updateExperianceModa";

const Jobs = ({ other, isMy }) => {
	const [showAddSkillModal, setShowAddSkillModal] = useState('close');
	const [showUpdateSkillModal, setshowUpdateSkillModal] = useState(false);
	const [showAddInterestsModal, setshowAddInterestsModal] = useState(false);
	const [showUpdateInterestsModal, setshowUpdateInterestsModal] = useState(false);
	const [showAddEducationModal, setshowAddEducationModal] = useState(false);
	const [showUpdateEducationModal, setshowUpdateEducationModal] = useState(false);
	const [showAddExperianceModal, setshowAddExperianceModal] = useState(false);
	const [showUpdateExperianceModal, setshowUpdateExperianceModal] = useState(false);

	const addExperianceHandler = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) return
		if (showAddExperianceModal === true) setshowAddExperianceModal(false)
		else setshowAddExperianceModal(true)

	}

	const addEducationHandler = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) return
		if (showAddEducationModal === true) setshowAddEducationModal(false)
		else setshowAddEducationModal(true)
	}

	const addInterestHandler = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) { return }

		if (showAddInterestsModal === true) setshowAddInterestsModal(false)
		else setshowAddInterestsModal(true);
	}

	const addSkillHandler = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) { return; }

		switch (showAddSkillModal) {
			case 'open':
				setShowAddSkillModal('close');
				break;
			case 'close':
				setShowAddSkillModal('open');
				break;
			default:
				setShowAddSkillModal('close');
				break;
		}
	}

	const updateSkillHandler = (e) => {
		e.preventDefault();
		if (e.target != e.currentTarget) { return }

		if (showUpdateSkillModal === true) setshowUpdateSkillModal(false)
		else setshowUpdateSkillModal(true)
	}

	const updateInterestHandler = (e) => {
		e.preventDefault();
		if (e.target != e.currentTarget) { return }

		if (showUpdateInterestsModal === true) setshowUpdateInterestsModal(false)
		else setshowUpdateInterestsModal(true)
	}

	const updateEducationHandler = (e) => {
		e.preventDefault();
		if (e.target != e.currentTarget) { return }

		if (showUpdateEducationModal === true) setshowUpdateEducationModal(false)
		else setshowUpdateEducationModal(true)
	}

	const updateExperianceHandler = (e) => {
		e.preventDefault();
		if (e.target != e.currentTarget) { return }

		if (showUpdateExperianceModal === true) setshowUpdateExperianceModal(false)
		else setshowUpdateExperianceModal(true)
	}

	return (
		<>
			<Container>
				<List>
					<div>
						<h1>Experiences:</h1>
						<ul>
							{other.experiences && other.experiences.map((exp) => (
								<li key={exp.id} style={{ borderBottom: "1px dashed black" }}>{exp.position} in {exp.company}. Started: {exp.startDate} Ended: {exp.endDate} </li>
							))}
						</ul>
					</div>
					{isMy && <button onClick={addExperianceHandler}>Add</button>}
				</List>
				<List>
					<div>
						<h1>Education</h1>
						<ul>
							{other.educations && other.educations.map((edu) => (
								<li key={edu.id} style={{ borderBottom: "1px dashed black" }}>{edu.institution}. Started: {edu.startDate} Ended: {edu.endDate} </li>
							))}
						</ul>
					</div>
					{isMy && <button onClick={addEducationHandler}>Add</button>}
				</List>
				<List>
					<div>
						<h1>Interests</h1>
						<ul>
							{other.interests && other.interests.map((interest) => (
								<li key={interest.id} style={{ borderBottom: "1px dashed black" }}>- {interest.name}</li>
							))}
						</ul>
					</div>
					{isMy && <button onClick={addInterestHandler}>Add</button>}
				</List>
				<List>
					<div>
						<h1>Skills</h1>
						<ul>
							{other.skills && other.skills.map((skill) => (
								<li key={skill.id} style={{ borderBottom: "1px dashed black" }}>- {skill.name}</li>
							))}
						</ul>

					</div>
					{isMy && <button onClick={addSkillHandler}>Add</button>}
				</List>
			</Container>
			<AddSkillModal showAddSkillModal={showAddSkillModal} addSkillHandler={addSkillHandler} />
			<UpdateSkillModal showUpdateSkillModal={showUpdateSkillModal} updateSkillHandler={updateSkillHandler} />
			<AddInterestsModal showAddInterestsModal={showAddInterestsModal} addInterestHandler={addInterestHandler} />
			<UpdateInterestModal showUpdateInterestsModal={showUpdateInterestsModal} updateInterestHandler={updateInterestHandler} />
			<AddEducationModal showAddEducationModal={showAddEducationModal} addEducationHandler={addEducationHandler} />
			<UpdateEducationModal showUpdateEducationModal={showUpdateEducationModal} updateEducationHandler={updateEducationHandler} />
			<AddExperianceModal showAddExperianceModal={showAddExperianceModal} addExperianceHandler={addExperianceHandler} />
			<UpdateExperianceModal showUpdateExperianceModal={showUpdateExperianceModal} updateExperianceHandler={updateExperianceHandler} />

		</>
	);

}

export default Jobs;

