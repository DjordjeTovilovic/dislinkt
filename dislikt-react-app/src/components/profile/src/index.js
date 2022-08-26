import Article from "../../posts";
import { useState } from "react";
import About from "../about/about";
import Jobs from "../jobs/jobs";
import Follows from "../follows/follows";
import UserDetails from "../userDetails/userDetails";
import UserDetailsHeader from "../userDetails/detailsHeader/userDetailsHeader";
import { Container, Content, MainContent, Page, Tab, Tabs, UserDetailBox } from "./styles";
import Rightside from "../../home/rightSide";

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
                  <UserDetailsHeader/>
                  <UserDetails/>

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
                  { activeTab == "about" ? <About/> : null }
                  { activeTab == "posts" ? <Article/> :null }
                  { activeTab == "jobs" ? <Jobs/> : null }
                  { activeTab == "people" ? <Follows/> : null }                
                </Content>

              </MainContent>
              <Rightside />
            </Page>
        </Container>
    )
}

export default Profile;

