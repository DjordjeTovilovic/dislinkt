import styled from "styled-components";

export const Container = styled.div`
 padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background-color: white;
`;

export const SharedActor = styled.div`
 padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

export const Description = styled.div`
padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

export const SharedImage = styled.div`

    margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

export const SocialCounts = styled.div`
line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      width: 60px;
      height: 35px;
      align-items: center;
      cursor: pointer;
    }
    
    .active {
      background: green;
    }

    a {
      font-size: 20px;

      &:hover {
        color: blue;
        cursor: pointer;
      }
    }
  }`;

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightgray;
  background-color: lightgray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  button {
    width: 170px;
    height: 40px;
    align-self: center;
    border-radius: 24px;
    background-color: white ;
    border: none;
    color: #0a66c2 ;
    cursor: pointer;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #0a66c2;

    &:hover {
      background-color: #00b3db;
      border-color: #285e8e;
      color: white;
    }}
`;

export const Comments = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
`;

  
export const CommentBox = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px 10px 5px 10px;
  justify-content: space-evenly;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .comment-info {
    width: 90%;
    background-color: whitesmoke;
    border-radius: 15px;
    border: 1px solid gray;
    display: flex;
    flex-direction: column;

    h3 {
      padding-left: 6px;
    }

    p {padding-left: 8px}

    .date {
      align-self: flex-end;
      font-size: x-small;
      padding-right: 10px;
    }
  }

`;

export const Comment = styled.div`
  
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  padding: 5px 10px 5px 10px;
  align-items: center;
  justify-content: space-between;

  textarea {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem; 
    padding-left: 0.5rem;
    padding-right: 0.5rem; 
    width: 77%; 
    height: fit-content;
    height: 55px;
    border-radius: 15px;
    border: 1px solid lightblue;
  }

  button {
    width: 100px;
    border-radius: 24px;
    background-color: #0a66c2 ;
    border: none;
    color: white ;
    cursor: pointer;
    padding: 8px;
    border: 1px solid lightcyan;

    &:hover {
      background-color: #00b3db;
      border-color: #285e8e;
      color: white;
    }
  }
`;
