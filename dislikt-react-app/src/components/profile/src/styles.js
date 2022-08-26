import styled from "styled-components";

export const Container = styled.div`
    padding: 52px;
  max-width: 100%; 
`;

export const Page = styled.div`
    display: grid;
    grid-template-areas: " main rightside";
    grid-template-columns: minmax(0, 17fr)  minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      padding: 0 5px;
    }
`;

export const MainContent = styled.div`
  grid-area: main;  
  display: flex;
  flex-direction: column;
`;

export const UserDetailBox = styled.div`
  position: relative;
  background-color: white;
  border-radius: 10px; 
  box-shadow: -1px 4px 20px -6xp rgba(0, 0, 0, 0.75);
  margin-bottom: 8px;
`;

export const Tabs = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  border-top: 1px solid lightgray;

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

export const Tab = styled.li`

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
      color: grey;
      font-weight: 700;
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;