import styled from "styled-components";


export const NotificationsContainer = styled.div`
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