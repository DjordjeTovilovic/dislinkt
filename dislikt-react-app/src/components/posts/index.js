import styled from "styled-components";

const Article = (props) => {
   return (
    <Container>
       <SharedActor>
            <a>
              <img src="/images/user.svg"></img>
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="/images/ellipsis.svg"></img>
            </button>
          </SharedActor>
          <Description>Description</Description>
          <SharedImage>
            <a>
              <img src="/images/random-image.png"></img>
            </a>
          </SharedImage>
          <SocialCounts>
            <li>
              <button>
                <img src="/images/like-svgrepo-com.svg" alt=""></img>
                <span>75</span>
              </button>
            </li>
            <li>
              <a>2 comments</a>
            </li>
          </SocialCounts> 
    </Container>
   )
}

export default Article;

const Container = styled.div`
 padding: 0;
  margin: 0 0 8px;
  overflow: visible;
  background-color: white;
`;
const SharedActor = styled.div`
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
const Description = styled.div`
padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
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

const SocialCounts = styled.div`
line-height: 1.3;
  display: flex;
  align-items: flex-start;
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
    }

    a {
      display: flex;
      font-size: 20px;

      &:hover {
        color: blue;
      }
    }
  }`;



