import { Container } from "./styles";
import { useState } from "react"
import userService from '../../../services/user'
const Dislinkt = () => {
  const [token, setToken] = useState('')

  const generateToken = () => {
    if (token === '') userService.generateDislinktToken()
      .then((res) => setToken(res.apiToken))
      .catch((err) => console.log(err))
  }
  return (

    <Container>
      <h1>Joberty</h1>
      <p>Here you can link your dislinkt account with your jobery account.
        Click on the button to generate the token.
        Copy the generated token into the joberty link-up field.
      </p>
      <button disabled={token !== ''} onClick={generateToken}>GENERATE TOKEN</button>
      <input readOnly value={token} style={{ marginLeft: "15px", minWidth: "200px", maxWidth: "200px" }} />
      {token !== '' && <label style={{ color: "green", marginLeft: "5px" }}>copy this token</label>}
    </Container>
  );
}



export default Dislinkt;