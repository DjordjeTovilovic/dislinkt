import UserArticle from "../../posts/userPosts";
import About from "../about/about";
import Jobs from "../jobs/jobs";
import Dislinkt from "../dislinkt/Dislinkt"
import UserDetails from "../userDetails/userDetails";
import UserDetailsHeader from "../userDetails/detailsHeader/userDetailsHeader";
import { Container, Content, MainContent, Page, Tab, Tabs, UserDetailBox } from "./styles";
import Rightside from "../../home/rightSide";
import { useState, useEffect } from 'react'
import userService from '../../../services/user'
import { getPostsForUserId } from '../../../services/post'

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [user, setUser] = useState({})
  const [skills, setSkills] = useState([])
  const [experience, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [interests, setInterests] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    userService
      .getMe()
      .then((gotUser) => {
        setUser(gotUser)
        userService
          .getEducationsForUser(gotUser.id)
          .then((gotEdus) => setEducation(gotEdus))
          .catch((err) => console.log(err));
        userService
          .getExperiencesForUser(gotUser.id)
          .then((gotExps) => setExperiences(gotExps))
          .catch((err) => console.log(err));
        userService
          .getInterestsForUser(gotUser.id)
          .then((gotInts) => setInterests(gotInts))
          .catch((err) => console.log(err));
        userService
          .getSkillsForUser(gotUser.id)
          .then((gotSkills) => setSkills(gotSkills))
          .catch((err) => console.log(err));
        getPostsForUserId(gotUser.id).then((gotPosts) => setPosts(gotPosts))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

  }, []);

  const setTab = (name) => {
    setActiveTab(name);
  }

  return (
    <Container>
      <Page>
        <MainContent>
          <UserDetailBox>
            <UserDetailsHeader />
            <UserDetails user={user} isMy={true} />

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
              <Tab onClick={() => setTab("dislinkt")} className={activeTab == "dislinkt" ? 'active' : null}>
                <a><span>Joberty</span></a>
              </Tab>
            </Tabs>
          </UserDetailBox>

          <Content>
            {activeTab == "about" && <About bio={user.bio} />}
            {activeTab == "posts" && <UserArticle postss={posts} />}
            {activeTab == "jobs" && <Jobs other={
              {
                skills: skills.skills,
                experiences: experience.experiences,
                educations: education.educations,
                interests: interests.interests
              }
            } isMy={true} />}
            {activeTab == "dislinkt" && <Dislinkt />}
          </Content>

        </MainContent>
        <Rightside />
      </Page>
    </Container>
  )
}

export default MyProfile;

