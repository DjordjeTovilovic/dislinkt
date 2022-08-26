import styled from "styled-components";

export const Container = styled.div`
    height: 160px;
    background-color: #0a66c2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    
    div { 
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100px; height: 100px;
      border: 5px solid white;
      position: absolute;
      left: 60px;
      top: 70px ;
      background-color: #0a66c2;
    }
  
    img { 
      width: 80px;
      height:80px;
      border-radius: 50%;
    }
`; 
