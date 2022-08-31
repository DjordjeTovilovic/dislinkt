import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('about');
  
  const setTab = (name) => {
    setActiveTab(name);
  }

  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg"></img>
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search"></input>
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg"></img>
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList onClick={() => {setTab('home'); navigate('/home') }} className={activeTab == "home" ? 'active' : null}>
              <a>
                <img src="/images/nav-home.svg"></img>
                <span>Home</span>
              </a>
            </NavList>
            <NavList onClick={() => {setTab('network'); navigate('/person-recommendation') }} className={activeTab == "network" ? 'active' : null}>
              <a>
                <img src="/images/nav-network.svg"></img>
                <span>Network</span>
              </a>
            </NavList>

            <NavList onClick={() => {setTab('jobs'); navigate('/job-offer')  }} className={activeTab == "jobs" ? 'active' : null}>
              <a>
                <img src="/images/nav-jobs.svg"></img>
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList onClick={() => {setTab('messages'); navigate('/messenger')}} className={activeTab == "messages" ? 'active' : null}>
              <a>
                <img src="/images/nav-messaging.svg"></img>
                <span>Messaging</span>
              </a>
            </NavList>

            <NavListNotifications>
              <a>
                <img src="/images/nav-notifications.svg"></img>
                <div className="notifications-icon">
                  <span>Notifications</span>
                  <img src="/images/down-icon.svg"></img>
                </div>
              </a>
              <Notifications>
                <ul>
                  <li><a>Milan Pavkov liked your post</a></li>     
                </ul>
              </Notifications>
            </NavListNotifications>

            <User>
              <a>
                <img onClick={() => {setTab('profile'); navigate('/profile')}} className={activeTab == "profile" ? 'active' : null} src="/images/user.svg"></img>
                <span>Me</span>
                <img src="/images/down-icon.svg"></img>
              </a>
              <SignOut>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img onClick={() => {setTab('settings'); navigate('/settings')}} className={activeTab == "settings" ? 'active' : null}  src="/images/nav-work.svg"></img>
                <span>
                  Settings
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

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

const NavList = styled.li`
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
      color: rgba(0, 0, 0, 0.6);
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

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const Notifications = styled.div`
  z-index: 200;
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 5px 5px 5px 5px;
  border: 2px solid gray;
  width: 300px;
  height: 300px;
  font-size: 16px;
  min-height: 200px;
  transition-duration: 167ms;
  text-align: left;
  display: none;
  list-style: none;
  overflow-y: auto;

  ul {
    list-style: none;
    width: 100%;

  }

  ul > li {
    padding: 10px;
    border: 1px solid lightgray;
  }
`;

const NavListNotifications = styled(NavList)`

  display: flex;
  align-items: center;
  flex-direction: column;
  align-self: center;
  
  .notifications-icon{
    display: flex;
    flex-direction: row;
  }

  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${Notifications} {
      align-items: left;
      display: flex;
      justify-content: flex-start;
    }
  }
`;
