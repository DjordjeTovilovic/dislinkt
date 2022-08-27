import styled from "styled-components";

const Signin = (props) => {
  return (
    <Container>
      <Background />
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt=""></img>
        </a>
        <div>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Form>
        <First>
          <Second>
            <h1>Sign in</h1>
            <input placeholder="Email@gmail.com"></input>
            <input type="password" placeholder="password"></input>
            <input type="password" placeholder="Confirm password"></input>

            <button>Create account</button>
            <OrLine>
              <NewAccount>
                Already have an account?
                <a> Log in</a>
              </NewAccount>
            </OrLine>
          </Second>
        </First>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
  width: 100%;
  height: 100vh;
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
  z-index: 100;

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
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  vertical-align: middle;
  flex-direction: column;
  border-color: #e5e7eb;
  row-gap: 5rem;
  align-items: center;
  height: 600px;

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
  z-index: 2;
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
    margin-top: 10px;

    :hover {
      background-color: #60a5fa;
      border-color: #3b82f6;
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

    :hover {
      color: #b91c1c;
      cursor: pointer;
    }
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url("/images/background.png");
  background-repeat: no-repeat;
  background-size: 105% 800px;
  background-position: center;
  position: absolute;
  z-index: 1;
`;

export default Signin;
