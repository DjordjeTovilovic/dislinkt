import LoginForm from "../components/Forms/Login/LoginForm";
import userService from "../service/user";

const Login = () => {
  const handleLogin = (credentials) => {
    if (
      credentials.username &&
      credentials.password &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/.test(credentials.password)
    )
      userService
        .login(credentials)
        .then(() => window.location.replace("/"))
        .catch((err) => console.log(err));
  };

  return <LoginForm handleLogin={handleLogin} />;
};
export default Login;
