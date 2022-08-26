import styled from "styled-components";
import {Container,List} from './styled'

const Jobs = (props) => {

    return (
        <Container>
            <List>
                <div>
                    <h1>Expiriances:</h1>
                    <ul>
                      <li>Internship in VegaIT</li>
                      <li>Internship in Synechron </li>
                      <li>Internship in Levi9</li>
                    </ul>
                    <button>Add</button>
                </div>
                <button>Update</button>
            </List>
            <List>
                <div>
                    <h1>Education</h1>
                    <ul>
                      <li>Elementary school Neka</li>
                      <li>High school neka druga </li>
                      <li>FTN</li>
                    </ul>
                    <button>Add</button>
                </div>
                <button>Update</button>                   
            </List>
            <List>
                <div>
                    <h1>Interests</h1>
                    <ul>
                      <li>Java programming</li>
                      <li>Django</li>
                      <li>MySQL</li>
                    </ul>
                    <button>Add</button>
                </div>
                <button>Update</button>
            </List>
            <List>
                <div>
                    <h1>Skills</h1>
                    <ul>
                      <li>Elementary school Neka</li>
                      <li>High school neka druga </li>
                      <li>FTN</li>
                    </ul>
                    <button>Add</button>
                </div>
                <button>Update</button>   
            </List>
        </Container>
    );

}

export default Jobs;

