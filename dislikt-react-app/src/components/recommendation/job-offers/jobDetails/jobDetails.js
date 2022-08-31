import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userService from '../../../../services/user'

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({})
  useEffect(() => {
    userService
      .getJobById(jobId)
      .then((gotJob) => setJob(gotJob))
      .catch((err) => console.log(err));
  }, [jobId]);
  return (
    <Container>
      <Content>
        <JobOffer>
          <h1>{job.company}</h1>
          <div className='job'>
            <p className='seniority'>{job.seniority}</p>
            <p className='position'>{job.position}</p>
          </div>
        </JobOffer>
        <div className='description'>{job.description}</div>
        <p className='seniority'>REQUIRED SKILLS</p>
        {job.skillsRequired?.map((skill, index) => (<div className='skills' key={skill}>{index + 1}.{skill}</div>))}
      </Content>
    </Container>
  )
}
export default JobDetails;

const Container = styled.div`
    padding: 62px;
    max-width: 100%;
`;

const Content = styled.div`
min-width: 65%;
  max-width: 65%;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px; 
  background-color: rgba(0,0,0,0.05);

    h1{ 
        font-size: 30px;
    }

  .position {
    margin-block-start: 0px;
    margin-block-end: 0px;
    font-weight: 700;
    font-size: 20px;
  }
  .seniority {
    margin-block-start: 0px;
    margin-block-end: 0px;
    font-weight: 600;
    font-size: 18px;
  }

  .description {
    overflow-y: scroll;
    margin-block-start: 10px;
    margin-block-end: 0px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 10px;
    min-height: 200px;
    max-height: 200px;
    margin-bottom: 8px;
    &::-webkit-scrollbar {
      width: 13px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(196, 27, 27);
      border-radius: 10px;
      &:hover {
        background: rgb(122, 16, 16);
      }
    }
  }
  .skills {
    overflow-y: scroll;
    margin-block-start: 0px;
    margin-block-end: 0px;
    padding: 5px;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    max-height: 45px;
    &::-webkit-scrollbar {
      width: 13px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(196, 27, 27);
      border-radius: 10px;
      &:hover {
        background: rgb(122, 16, 16);
      }
    }
  }
`;

const JobOffer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding-left: 10px;

    .job {
        padding-right: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
`;

