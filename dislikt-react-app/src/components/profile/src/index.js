import UserArticle from "../../posts/userPosts";
import About from "../about/about";
import Jobs from "../jobs/jobs";
import Follows from "../follows/follows";
import UserDetails from "../userDetails/userDetails";
import UserDetailsHeader from "../userDetails/detailsHeader/userDetailsHeader";
import { Container, Content, MainContent, Page, Tab, Tabs, UserDetailBox } from "./styles";
import Rightside from "../../home/rightSide";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userService from '../../../services/user'
import { getPostsForUserId } from '../../../services/post'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const { userId } = useParams();
  const [user, setUser] = useState({})
  const [skills, setSkills] = useState([])
  const [experience, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [interests, setInterests] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    userService
      .getById(userId)
      .then((gotUser) => setUser(gotUser))
      .catch((err) => console.log(err));
    userService
      .getEducationsForUser(userId)
      .then((gotEdus) => setEducation(gotEdus))
      .catch((err) => console.log(err));
    userService
      .getExperiencesForUser(userId)
      .then((gotExps) => setExperiences(gotExps))
      .catch((err) => console.log(err));
    userService
      .getInterestsForUser(userId)
      .then((gotInts) => setInterests(gotInts))
      .catch((err) => console.log(err));
    userService
      .getSkillsForUser(userId)
      .then((gotSkills) => setSkills(gotSkills))
      .catch((err) => console.log(err));
    getPostsForUserId(userId).then((gotPosts) => setPosts(gotPosts))
      .catch((err) => console.log(err));
  }, [userId]);

  const setTab = (name) => {
    setActiveTab(name);
  }

  return (
    <Container>
      <Page>
        <MainContent>
          <UserDetailBox>
            <UserDetailsHeader />
            <UserDetails user={user} />

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
            {activeTab == "about" ? <About bio={user.bio} /> : null}
            {activeTab == "posts" ? <UserArticle postss={posts} /> : null}
            {activeTab == "jobs" ? <Jobs other={
              {
                skills: skills.skills,
                experiences: experience.experiences,
                educations: education.educations,
                interests: interests.interests
              }
            } /> : null}
            {activeTab == "people" ? <Follows /> : null}
          </Content>

        </MainContent>
        <Rightside />
      </Page>
    </Container>
  )
}

export default Profile;

