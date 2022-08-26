import styled from "styled-components";
import {Container, FollowedPeople, FollowingMe} from "./styles";

const Follows = (props) => {
    
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
                <button>Unfollow</button>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <img src="/images/user.svg"></img>
                  <span>Mali Stanoje</span>
                </div>
                <button>Unfollow</button>
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
                <div style={{display: "flex", flexDirection: "row"}}>
                  <button hidden>Unfollow</button>
                  <button>Follow</button>
                  <button >Block</button>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div>
                  <img src="/images/user.svg"></img>
                  <span>Ognjen Jaramaz</span>
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                  <button>Unfolow</button>
                  <button hidden>Follow</button>
                  <button >Block</button>
                </div>
              </div>
            </li>
          </ul>
          </FollowingMe>
    </Container>
    );
}

export default Follows;

