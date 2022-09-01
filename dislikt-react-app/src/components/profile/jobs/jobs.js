import AddSkillModal from "./skillsModals/addModal/addModal";
import { Container, List } from './styled'
import { useState } from "react";
import AddInterestsModal from "./interestsModals/addModal/addInterestsModal";
import AddEducationModal from "./educationModals/addModal/addEducationModal";
import AddExperianceModal from "./experianceModals/addModal/addExperianceModal";
import userService from '../../../services/user'

const Jobs = ({ other, isMy }) => {
	const [showAddSkillModal, setShowAddSkillModal] = useState(false);
	const [showAddInterestsModal, setshowAddInterestsModal] = useState(false);
	const [showAddEducationModal, setshowAddEducationModal] = useState(false);
	const [showAddExperianceModal, setshowAddExperianceModal] = useState(false);

	const [expDel, setExpDel] = useState(new Array(other.experiences ? other.experiences.length : 0).fill(false));
	const [eduDel, setEduDel] = useState(new Array(other.educations ? other.educations.length : 0).fill(false));
	const [intDel, setIntDel] = useState(new Array(other.interests ? other.interests.length : 0).fill(false));
	const [skillDel, setSkillDel] = useState(new Array(other.skills ? other.skills.length : 0).fill(false));
	const [experiences, setexperiences] = useState(new Array(other.experiences ? other.experiences.length : 0).fill(null));
	const [educations, seteducations] = useState(new Array(other.educations ? other.educations.length : 0).fill(null));
	const [interests, setinterests] = useState(new Array(other.interests ? other.interests.length : 0).fill(null));
	const [skills, setskills] = useState(new Array(other.skills ? other.skills.length : 0).fill(null));

	const addExpDel = (index) => {
		let exp = [...expDel];
		exp[index] = !exp[index]
		setExpDel(exp)
		let exps = [...experiences]
		if (exp[index]) exps[index] = other.experiences[index]
		else exps[index] = null
		setexperiences(exps)
	}

	const addEduDel = (index) => {
		let edu = [...eduDel];
		edu[index] = !edu[index]
		setEduDel(edu)
		let edus = [...educations]
		if (edu[index]) edus[index] = other.educations[index]
		else edus[index] = null
		seteducations(edus)
	}

	const addIntDel = (index) => {
		let int = [...intDel];
		int[index] = !int[index]
		setIntDel(int)
		let ints = [...interests]
		if (int[index]) ints[index] = other.interests[index]
		else ints[index] = null
		setinterests(ints)
	}

	const addSkillDel = (index) => {
		let skill = [...skillDel];
		skill[index] = !skill[index]
		setSkillDel(skill)
		let sks = [...skills]
		if (skill[index]) sks[index] = other.skills[index]
		else sks[index] = null
		setskills(sks)
	}

	const delExperianceHandler = () => {
		userService.removeExperience({ experiences: experiences.filter((exp) => exp !== null) })
			.then(() => window.location.reload())
			.catch((err) => console.log(err))

	}

	const delEducationHandler = () => {
		userService.removeEducations({ educations: educations.filter((edu) => edu !== null) })
			.then(() => window.location.reload())
			.catch((err) => console.log(err))
	}

	const delInterestHandler = () => {
		userService.removeInterests({ interests: interests.filter((int) => int !== null) })
			.then(() => window.location.reload())
			.catch((err) => console.log(err))
	}

	const delSkillHandler = () => {
		userService.removeSkill({ skills: skills.filter((skill) => skill !== null) })
			.then(() => window.location.reload())
			.catch((err) => console.log(err))
	}

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

		setshowAddInterestsModal(!showAddInterestsModal);
	}

	const addSkillHandler = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) { return; }
		setShowAddSkillModal(!showAddSkillModal);
	}


	return (
		<>
			<Container>
				<List>
					<div>
						<h1>Experiences:</h1>
						<ul>
							{other.experiences && other.experiences.map((exp, index) => (
								<li key={`${exp.id}-${exp.position}`} style={{ borderBottom: "1px dashed black" }}>
									{exp.position} in {exp.company}. Started: {exp.startDate} Ended: {exp.endDate}
									<button className={expDel[index] ? "delBtnClicked" : "delBtn"} onClick={() => addExpDel(index)}>
										{expDel[index] ? "for deletion" : "delete"}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div>{isMy && <>
						<button onClick={addExperianceHandler}>Add</button>
						<button onClick={delExperianceHandler}>Delete</button>
					</>}
					</div>

				</List>
				<List>
					<div>
						<h1>Education</h1>
						<ul>
							{other.educations && other.educations.map((edu, index) => (
								<li key={`${edu.id}-${edu.institution}`} style={{ borderBottom: "1px dashed black" }}>
									{edu.institution}. Started: {edu.startDate} Ended: {edu.endDate}
									<button className={eduDel[index] ? "delBtnClicked" : "delBtn"} onClick={() => addEduDel(index)}>
										{eduDel[index] ? "for deletion" : "delete"}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div>{isMy && <>
						<button onClick={addEducationHandler}>Add</button>
						<button onClick={delEducationHandler}>Delete</button>
					</>}
					</div>
				</List>
				<List>
					<div>
						<h1>Interests</h1>
						<ul>
							{other.interests && other.interests.map((interest, index) => (
								<li key={interest.id} style={{ borderBottom: "1px dashed black" }}>
									- {interest.name}
									<button className={intDel[index] ? "delBtnClicked" : "delBtn"} onClick={() => addIntDel(index)}>
										{intDel[index] ? "for deletion" : "delete"}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div>{isMy && <>
						<button onClick={addInterestHandler}>Add</button>
						<button onClick={delInterestHandler}>Delete</button>
					</>}
					</div>
				</List>
				<List>
					<div>
						<h1>Skills</h1>
						<ul>
							{other.skills && other.skills.map((skill, index) => (
								<li key={skill.id} style={{ borderBottom: "1px dashed black" }}>
									- {skill.name}
									<button className={skillDel[index] ? "delBtnClicked" : "delBtn"} onClick={() => addSkillDel(index)}>
										{skillDel[index] ? "for deletion" : "delete"}
									</button>
								</li>
							))}
						</ul>

					</div>
					<div>{isMy && <>
						<button onClick={addSkillHandler}>Add</button>
						<button onClick={delSkillHandler}>Delete</button>
					</>}
					</div>
				</List>
			</Container>
			<AddSkillModal showAddSkillModal={showAddSkillModal} addSkillHandler={addSkillHandler} />
			<AddInterestsModal showAddInterestsModal={showAddInterestsModal} addInterestHandler={addInterestHandler} />
			<AddEducationModal showAddEducationModal={showAddEducationModal} addEducationHandler={addEducationHandler} />
			<AddExperianceModal showAddExperianceModal={showAddExperianceModal} addExperianceHandler={addExperianceHandler} />
		</>
	);

}

export default Jobs;

