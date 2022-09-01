import styled from "styled-components";
import { Container, FollowedPeople, FollowingMe } from "./styles";

const Follows = ({ userId }) => {

  return (
    <Container>
      <FollowedPeople>
        <h1>Following:</h1>
        <ul>
          <li>
            <div>
              <div>
                <img src="/images/user.svg"></img>
                <span>Kica</span>
              </div>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
              </div>
            </div>
          </li>
        </ul>
      </FollowingMe>
    </Container>
  );
}

export default Follows;

