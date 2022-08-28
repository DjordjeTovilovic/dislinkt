import SignupForm from "../components/Forms/SignupForm/SignupForm";
import userService from "../service/user";

const Signup = () => {
  const handleSignup = (credentials) => {
    if (
      credentials.username &&
      credentials.password &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/.test(credentials.password)
    )
      userService
        .signup(credentials)
        .then(() => window.location.replace("/login"))
        .catch((err) => console.log(err));
  };

  return <SignupForm handleSignup={handleSignup} />;
};
export default Signup;
