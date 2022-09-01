import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background-color: white;
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
  border-radius: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FollowedPeople = styled.div`
    flex: 1;
    margin-top: 16px;
    border-right: 1px solid lightgray ;

    h1 {
      padding: 10px;
      font-weight: 600;
    }

    ul {
      max-height: 200px;
      overflow-x:hidden;
      overflow-y:scroll;
      list-style: none;
      padding: 10px;
      li{
        margin-top: 4px;
        padding: 10px;
        border: 1px solid lightgray;
        border-radius: 20px;
    
        &:hover {
          background-color:  rgba(0, 0, 0, 0.08) ;
          cursor: pointer;
          border-color: #0a66c2;
        }

      }
    }


    ul > li > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      gap: 20px;
      align-items: center;

      div{

        display: flex;
        flex-direction: column ;
        align-items: flex-start;
        justify-content: space-evenly;

        img{ 
          height: 60px;
          width: 60px;
          border-radius: 50%;
          cursor: pointer;
        }

        span {
          padding: 4px
        }
      }

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
    }
`;

export const FollowingMe = styled.div`
    flex: 1;
    margin-top: 16px;

    h1 {
      padding: 10px;
      font-weight: 600;
    }

    ul {
      max-height: 200px;
      overflow-x:hidden;
      overflow-y:scroll;
      list-style: none;
      padding: 10px;

      li{
        padding: 10px;
        margin-top: 4px;
        border: 1px solid lightgray;
        border-radius: 20px;

        &:hover {
          background-color:  rgba(0, 0, 0, 0.08) ;
          cursor: pointer;
          border-color: #0a66c2;
        }
      }
    }

    ul > li > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      gap: 20px;
      align-items: center;

      div{

        display: flex;
        flex-direction: column ;
        align-items: flex-start;
        justify-content: space-evenly;

        img{ 
          height: 60px;
          width: 60px;
          border-radius: 50%;
        }

    span {
      padding: 4px
    }
  }

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
}
`;


