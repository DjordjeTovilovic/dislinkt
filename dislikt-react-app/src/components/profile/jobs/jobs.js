import AddSkillModal from "./skillsModals/addModal/addModal";
import {Container,List} from './styled'
import { useState } from "react";
import UpdateSkillModal from "./skillsModals/updateModal/updateSkillModal";
import AddInterestsModal from "./interestsModals/addModal/addInterestsModal";
import UpdateInterestModal from "./interestsModals/updateModal/updateInterestsModal";
import AddEducationModal from "./educationModals/addModal/addEducationModal";
import UpdateEducationModal from "./educationModals/updateModal/updateEducationModal";
import AddExperianceModal from "./experianceModals/addModal/addExperianceModal";
import UpdateExperiance from "./experianceModals/updateModal/updateExperianceModa";
import UpdateExperianceModal from "./experianceModals/updateModal/updateExperianceModa";

const Jobs = (props) => {
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
        if(e.target !== e.currentTarget) return
        if(showAddExperianceModal === true) setshowAddExperianceModal(false)
        else setshowAddExperianceModal(true)

    }

    const addEducationHandler = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) return
        if(showAddEducationModal === true) setshowAddEducationModal(false)
        else setshowAddEducationModal(true)
    }

    const addInterestHandler = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {return}

        if(showAddInterestsModal === true) setshowAddInterestsModal(false)
        else setshowAddInterestsModal(true);
    }

    const addSkillHandler = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) {return;}
        
        switch(showAddSkillModal){
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
        if(e.target != e.currentTarget) {return}

        if(showUpdateSkillModal === true) setshowUpdateSkillModal(false)
        else setshowUpdateSkillModal(true)
    }

    const updateInterestHandler = (e) => {
        e.preventDefault();
        if(e.target != e.currentTarget) {return}

        if(showUpdateInterestsModal === true) setshowUpdateInterestsModal(false)
        else setshowUpdateInterestsModal(true)   
    }

    const updateEducationHandler = (e) => {
        e.preventDefault();
        if(e.target != e.currentTarget) {return}

        if(showUpdateEducationModal === true) setshowUpdateEducationModal(false)
        else setshowUpdateEducationModal(true)
    }

    const updateExperianceHandler = (e) => {
        e.preventDefault();
        if(e.target != e.currentTarget) {return}

        if(showUpdateExperianceModal === true) setshowUpdateExperianceModal(false)
        else setshowUpdateExperianceModal(true)
    }

    return (
        <>
        <Container>
            <List>
                <div>
                    <h1>Experiences:</h1>
                    <ul>
                      <li>'Internship' in 'VegaIT'. Started: '24.4.2017.' Ended: '26.7.2018.' </li>
                      <li>'Internship' in 'Synechron'. Started: '24.4.2017.' Ended: '26.7.2018.'  </li>
                      <li>'Internship' in 'Levi9'. Started: '24.4.2017.' Ended: '26.7.2018.' </li>
                    </ul>
                    <button onClick={addExperianceHandler}>Add</button>
                </div>
                <button onClick={updateExperianceHandler}>Update</button>
            </List>
            <List>
                <div>
                    <h1>Education</h1>
                    <ul>
                      <li>Elementary school Neka</li>
                      <li>High school neka druga </li>
                      <li>FTN</li>
                    </ul>
                    <button onClick={addEducationHandler}>Add</button>
                </div>
                <button onClick={updateEducationHandler}>Update</button>                   
            </List>
            <List>
                <div>
                    <h1>Interests</h1>
                    <ul>
                      <li>Java programming</li>
                      <li>Django</li>
                      <li>MySQL</li>
                    </ul>
                    <button onClick={addInterestHandler}>Add</button>
                </div>
                <button onClick={updateInterestHandler}>Update</button>
            </List>
            <List>
                <div>
                    <h1>Skills</h1>
                    <ul>
                      <li>Elementary school Neka</li>
                      <li>High school neka druga </li>
                      <li>FTN</li>
                    </ul>
                    <button onClick={addSkillHandler}>Add</button>
                </div>
                <button onClick={updateSkillHandler}>Update</button>   
            </List>
        </Container>
            <AddSkillModal showAddSkillModal={showAddSkillModal} addSkillHandler={addSkillHandler}/>
            <UpdateSkillModal showUpdateSkillModal={showUpdateSkillModal} updateSkillHandler={updateSkillHandler}/>
            <AddInterestsModal showAddInterestsModal={showAddInterestsModal} addInterestHandler={addInterestHandler}/>
            <UpdateInterestModal showUpdateInterestsModal={showUpdateInterestsModal} updateInterestHandler={updateInterestHandler}/>
            <AddEducationModal showAddEducationModal={showAddEducationModal} addEducationHandler={addEducationHandler}/>
            <UpdateEducationModal showUpdateEducationModal={showUpdateEducationModal} updateEducationHandler={updateEducationHandler}/>
            <AddExperianceModal showAddExperianceModal={showAddExperianceModal} addExperianceHandler={addExperianceHandler}/>
            <UpdateExperianceModal showUpdateExperianceModal={showUpdateExperianceModal} updateExperianceHandler={updateExperianceHandler}/>
        
        </>
    );

}

export default Jobs;

