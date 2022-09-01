import styled from "styled-components";

export const Container = styled.div`
 padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  border-radius: 10px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
  background-color: white;

  button {
    width: 100px;
    height: 40px;
    margin-right: 10px;
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
  .delBtn{
    width: 100px;
    height: 20px;
    margin-left: 10px;
    border-radius: 15px;
    background-color:  orange ;
    border: none;
    color: white;
    cursor: pointer;
    line-height:2px;
    &:hover {
      background-color: red;
    }
  }
  .delBtnClicked{
    width: 100px;
    height: 20px;
    margin-left: 10px;
    border-radius: 15px;
    background-color:  red ;
    border: none;
    color: white;
    cursor: pointer;
    line-height:2px;
    &:hover {
      background-color: orange;
    }
  }
  div {
    padding: 10px;
    h1 {
      padding: 20px 10px 20px 10px;
    } 
    ul {
      padding: 10px;
      list-style: none;

      li {
        padding: 10px
      }
    }
  }
`;





