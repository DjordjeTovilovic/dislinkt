import styled from "styled-components";
import Rightside from "../rightSide";
import Article from "../posts";
import { useState } from "react";

const Profile = (props) => {

  const [activeTab, setActiveTab] = useState('about');

  const setTab = (name) => {
    setActiveTab(name);
  }

    return (
        <Container>
          <Page>
            <MainContent>
                <UserDetailBox>
                  <DetailHeader>
                    <div>
                      <img src="/images/user.svg"></img>
                    </div>
                  </DetailHeader>
                  <UserDetails>
                    <div>
                      <h1>Kevin Hart</h1>
                      <p>Email: email@hart.com</p>
                      <p>Phone number: 042421421</p>
                      <p>Birth day: 20.03.1999.</p>
                      <p>Gender: Male</p>

                      <div className="buttons">  
                        <button>
                          Follow
                        </button>
                        <button>
                          Unfollow
                        </button>
                        <button>
                          Update
                        </button>  
                      </div>
                    </div>
                  </UserDetails>
                  
                  <Tabs>
                    <Tab onClick={() => setTab("about")} className={activeTab == "about" ? 'active' : null}>
                      <a><span>About</span></a>
                    </Tab>
                    <Tab onClick={() => setTab("posts")} className={activeTab == "posts" ? 'active' : null}>  
                      <a><span>Posts</span></a>
                      </Tab>
                      <Tab onClick={() => setTab("jobs")} className={activeTab == "jobs" ? 'active' : null}>
                      <a><span>Jobs</span></a>
                      </Tab>
                      <Tab onClick={() => setTab("people")} className={activeTab == "people" ? 'active' : null}>
                      <a><span>People</span></a>
                      </Tab>
                  
                  </Tabs>
                </UserDetailBox>
                <Content>
                { activeTab == "about" ?
                  <About>
                    <h1>About</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
consequuntur! Commodi minima excepturi repudiandae velit hic maxime
doloremque. Quaerat provident commodi consectetur veniam similique ad 
earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
quasi aliquam eligendi, placeat qui corporis!</p>
                  </About>

                  : null }
    
                  { activeTab == "posts" ? 
                  <Article/>
                  :null }
    
                {activeTab == "jobs" ?
                  <Jobs>
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
      </Jobs>
      : null }

      {activeTab == "people" ?
      <People>
        <FollowedPeople>
          <h1>Following:</h1>

          <ul>
            <li>
              <div>
                <div>
                  <img src="/images/user.svg"></img>
                  <span>Kica</span>
                </div>
                <button>Unfollow</button>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <img src="/images/user.svg"></img>
                  <span>Mali Stanoje</span>
                </div>
                <button>Unfollow</button>
              </div>
            </li>
          </ul>
       
        </FollowedPeople>
        <FollowingMe>
          <h1>Followed by:</h1>
      
          <ul>
            <li>
              <div>
                <div>
                  <img src="/images/user.svg"></img>
                  <span>Elon Musk</span>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <button hidden>Unfollow</button>
                  <button>Follow</button>
                  <button >Block</button>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <img src="/images/user.svg"></img>
                  <span>Ognjen Jaramaz</span>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <button>Unfolow</button>
                  <button hidden>Follow</button>
                  <button >Block</button>
                </div>
              </div>
            </li>
          </ul>
      
          </FollowingMe>
        </People>

                : null }
                
                </Content>
              </MainContent>
              <Rightside />
            </Page>
        </Container>
    )
}

export default Profile;

const Container = styled.div`
    padding: 52px;
  max-width: 100%; 

`;

const Page = styled.div`
  display: grid;
  grid-template-areas: " main rightside";
  grid-template-columns: minmax(0, 17fr)  minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-row: auto;
  margin: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const MainContent = styled.div`
  grid-area: main;  
  display: flex;
  flex-direction: column;
`;

const UserDetailBox = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px; 
  box-shadow: -1px 4px 20px -6xp rgba(0, 0, 0, 0.75);
  margin-bottom: 8px;
`;

const DetailHeader = styled.div`
 height: 160px;
  background-color: #0a66c2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  div { 
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100px; height: 100px;
    border: 5px solid white;
    position: absolute;
    left: 60px;
    top: 70px ;
    background-color: #0a66c2;
  }

  img { 
    width: 80px;
    height:80px;
    border-radius: 50%;
  }
`;             

const UserDetails = styled.div`
 margin-top: 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 20px 30px 20px 30px;
  justify-content: space-evenly;
  height: 200px;

  div {
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;

    h1 {padding: 10px}
    p {padding: 8px}
    
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 10px;

      button{
        width: 100px;
        height: 40px;
        border-radius: 24px;
        background-color:  #0a66c2 ;
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px;
        margin-top: 5px;
      
        &:hover {
          background-color: #00b3db;
          border-color: #285e8e;
        }
    }
    }
  }
`;

const Tabs = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  border-top: 1px solid lightgray;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: tranition 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const Tab = styled.li`

display: flex;
  align-items: center;
  a {
    cursor: pointer;
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: grey;
      font-weight: 700;
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }

`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const About = styled.div`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background-color: white;
  border-radius: 10px;

  h1 {
    padding: 20px 10px 20px 10px ;
  }

  p {
    padding: 0 10px 10px 10px;
  }
`;

const Jobs = styled.div`
 padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background-color: white;
  border-radius: 10px;
`;

const People = styled.div`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background-color: white;
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 10px
`;

const FollowedPeople = styled.div`
  flex: 1;
  margin-top: 16px;
  border-right: 1px solid lightgray ;

  h1 {
    padding: 10px;
    font-weight: 600;
  }

  ul {
    padding: 10px;

    li{
      margin-top: 4px;
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 20px;
    
      &:hover {
        background-color:  rgba(0, 0, 0, 0.08) ;
        cursor: pointer;
        border-color: #0a66c2;
      }

    }
  }


  ul > li > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
  
    div{
      
      display: flex;
      flex-direction: column ;
      align-items: flex-start;
      justify-content: space-evenly;

      img{ 
        height: 60px;
        width: 60px;
        border-radius: 50%;
        cursor: pointer;
      }

      span {
        padding: 4px
      }
    }

    button {
      width: 100px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
        background-color:  #0a66c2 ;
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px;
        margin-top: 5px;
      
        &:hover {
          background-color: #00b3db;
          border-color: #285e8e;
        }
    }
  }
`;

const FollowingMe = styled.div`
  flex: 1;
  margin-top: 16px;

  h1 {
    padding: 10px;
    font-weight: 600;
  }

  ul {
    padding: 10px;
    list-style: none;

    li{
      padding: 10px;
      margin-top: 4px;
      border: 1px solid lightgray;
      border-radius: 20px;

      &:hover {
        background-color:  rgba(0, 0, 0, 0.08) ;
        cursor: pointer;
        border-color: #0a66c2;
      }
    }
  }


  ul > li > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
  
    div{
      
      display: flex;
      flex-direction: column ;
      align-items: flex-start;
      justify-content: space-evenly;

      img{ 
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }

      span {
        padding: 4px
      }
    }

    button {
      width: 100px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
        background-color:  #0a66c2 ;
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px;
        margin-top: 5px;
      
        &:hover {
          background-color: #00b3db;
          border-color: #285e8e;
        }
    }
  }
`;


const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 10px;

  button {
    width: 100px;
    height: 40px;
    margin-right: 10px;
    border-radius: 24px;
        background-color:  #0a66c2 ;
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px;
        margin-top: 5px;
      
        &:hover {
          background-color: #00b3db;
          border-color: #285e8e;
        }
   
  }

  div {
    padding: 10px;

    h1 {
      padding: 20px 10px 20px 10px;
    }
    
    ul {
      padding: 10px;
      list-style: none;

      li {
        padding: 10px
      }
    }
  
  }
  
`;
