import styled from "styled-components";

export const Container = styled.div`
margin-top: 40px;
 width: 90%;
 display: flex;
 flex-direction: column;
 align-items: baseline;
 padding: 20px 30px 20px 30px;
 justify-content: space-evenly;
 height: 200px;

 div {
   height: 100%;
   width: 90%;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   align-items: flex-start;

   h1 {padding: 10px}
   p {padding: 8px}
   
   .buttons {
     display: flex;
     flex-direction: row;
     justify-content: flex-start;
     gap: 10px;

     button{
       width: 100px;
       height: 40px;
       border-radius: 24px;
       background-color:  #0a66c2 ;
       border: none;
       color: white;
       cursor: pointer;
       padding: 8px;
       margin-top: 5px;
     
       &:hover {
         background-color: #00b3db;
         border-color: #285e8e;
       }
   }
   }
 }
`;





