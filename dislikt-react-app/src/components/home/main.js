import styled from "styled-components";
import Article from "../posts";
import PostModal from "../posts/postModal";
import { useState } from "react";

const Main = (props) => {
  
  const [showModal, setShowModal] = useState('close');

  const handleClick = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget) {
      return;
    }

    switch(showModal) {
      case "open" :
        setShowModal('close');
        break;
      case "close" :
        setShowModal('open');
        break;
      default: 
        setShowModal('close');
        break;
    }
  }

  return (
    <Container>
      <ShareBox>
        Share
        <div>
          <img src="/images/user.svg"></img>
          <button onClick={handleClick}>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/picture.svg"></img>
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video.svg"></img>
            <span>Video</span>
          </button>

          <button>
            <img src="/images/event.svg"></img>
            <span>Event</span>
          </button>

          <button>
            <img src="/images/picture-svgrepo-com.svg"></img>
            <span>Article</span>
          </button>
        </div>
      </ShareBox>
        <Article/>

      <PostModal showModal={showModal} handleClick={handleClick}/> 
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {

      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        cursor: pointer;
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
export default Main;
