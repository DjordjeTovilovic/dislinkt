import styled from "styled-components";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import userService from '../services/user'

const Login = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({})

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevstate) => ({ ...prevstate, [name]: value }))
  }

  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/signup');
  }

  const login = () => {
    if (loginCredentials.username && loginCredentials.password)
      userService.login(loginCredentials).then(() => navigate('/home')).catch((err) => console.log(err))
  }

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" ></img>
        </a>
        <Search>
          <div>
            <input type="text" placeholder="Search"></input>
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg"></img>
          </SearchIcon>
        </Search>
        <div>
          <SignIn onClick={goToSignIn}>Sign Up</SignIn>
        </div>
      </Nav>

      <Section>
        <HomePicture>
          <h1>Welcome to your professional comunity</h1>
          <img src="/images/login-hero.svg"></img>
        </HomePicture>
        <Form>
          <First>
            <Second>
              <h1>Log in</h1>
              <input placeholder="username" id="username" name="username" onChange={handleOnChange}></input>
              <input type="password" placeholder="password" id="password" name="password" onChange={handleOnChange}></input>
              <button onClick={login}>Log in</button>
              <OrLine>
                <NewAccount>
                  Don't have an account?
                  <a onClick={goToSignIn}> Sign up</a>
                </NewAccount>
              </OrLine>
            </Second>
          </First>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      paddign: 0 5px;
    }
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Section = styled.section`
  align-content: start;
  display: flex;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const HomePicture = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    margin-top: 20px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  display: flex;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  vertical-align: middle;
  flex-direction: column;
  border-color: #e5e7eb;
  row-gap: 5rem;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const First = styled.div`
  width: 100%;
  display: flex;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  flex-direction: column;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  max-width: 24rem;
`;

const Second = styled.div`
  display: flex;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #ffffff;
  color: #000000;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  h1 {
    margin-bottom: 1.75rem;
    color: #2563eb;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 500;
    line-height: 1.25;
  }

  input {
    display: block;
    padding: 0.75rem;
    margin-bottom: 1rem;
    width: 80%;
    border-radius: 0.25rem;
    border-width: 1px;
  }

  button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #3b82f6;
    color: #ffffff;
    font-weight: 700;
    border-radius: 0.25rem;
    border-bottom-width: 4px;
    border-color: #1d4ed8;

    :hover {
      background-color: #60a5fa;
      border-color: #3b82f6;
      cursor: pointer;
    }
  }
`;

const OrLine = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  width: 83.333333%;
  flex-direction: row;
  justify-content: space-evenly;

  p {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 0;
    font-weight: 600;
    text-align: center;
  }
`;

const NewAccount = styled.div`
  padding-top: 0.25rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;

  a {
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    color: #dc2626;
    cursor: pointer;

    :hover {
      color: #b91c1c;
      cursor: pointer;
    }
  }
`;


const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  margin-left: 10px;

  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 12px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      border: 1px solid black;
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


export default Login;
