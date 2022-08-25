import { Avatar, IconButton } from "@material-ui/core";
import { InsertEmoticon, Mic, SearchOutlined } from "@material-ui/icons";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Messenger = (props) => {

  return (
    <Container>
      <Body>
        <Sidebar>
        
          <SidebarSearch>
            <Search>
              <SearchOutlined />
              <input placeholder="Search or start new chat"></input>
            </Search>
          </SidebarSearch>

          <SidebarChats>
            <SidebarChat>
              <h2>Add new Chat</h2>
            </SidebarChat>

            <SidebarChat>
              <Avatar />
              <SidebarChatInfo>
                <h2>Room name</h2>
                <p>Last message..</p>
              </SidebarChatInfo>
            </SidebarChat>

            <SidebarChat>
              <Avatar />

              <SidebarChatInfo>
                <h2>Room name</h2>
                <p>Last message..</p>
              </SidebarChatInfo>
            </SidebarChat>
          </SidebarChats>
        </Sidebar>

        <Chat>
          <ChatHeader>
            <Avatar />
            <ChatHeaderInfo>
              <h3>Room name</h3>
              <p>Last seen</p>
            </ChatHeaderInfo>
            <ChatHeaderRight>
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </ChatHeaderRight>
          </ChatHeader>

          <ChatBoddy>
            <Message>
                <span>Aca Faca</span>
                Hey bro
                <p>3:52 PM</p>
            </Message>
            <Message prop={"reciver"}>
                <span>Elon Musk</span>
                Hey m8
                <p>3:53 PM</p>
            </Message>
          </ChatBoddy>

          <ChatFooter>
          <InsertEmoticon/>
          <form>
            <input placeholder="Type a message" type="text"></input>
            <button>Send a message</button>
          </form>
          <Mic/>
          </ChatFooter>
        </Chat>
      </Body>
    </Container>
  );
};

export default Messenger;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;

`;

const Body = styled.div`
  display: flex;
  width: 90vw;
  height: 90vh;
  background-color: #ededed;
  box-shadow: -1px 4px 20px -6xp rgba(0, 0, 0, 0.75);
  margin-top: 50px;
  border: 2px solid lightgray;
  border-radius: 10px;

`;

const Sidebar = styled.div`
  flex: 0.35;
  display: flex;
  flex-direction: column;

`;

const SidebarSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 39px;
  padding: 10px;
  border-left: 1px solid lightgray;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;

  .MuiSvgIcon-root {
    color: gray;
    padding: 10px;
  }

  input {
    border: none;
    margin: 10px;
    flex:1
  }
`;

const SidebarChats = styled.div`
  background-color: whitesmoke;
  flex: 1;
  overflow-y: auto;
`;

const SidebarChat = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;

  &:hover {
    background-color: #ebebeb;
  }
`;

const SidebarChatInfo = styled.div`
  margin-left: 15px;

  h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;


const Chat = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 2px 10px 2px 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;

`;

const ChatBoddy = styled.div`
  background-color: lightgray;
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

const ChatHeaderInfo = styled.div`
  flex: 1;
  padding: 20px;

  h3 {
    margin-bottom: 3px;
    font-weight: 500;
  }

  p {
    color: gray;
  }
`;

const ChatHeaderRight = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 100px;
`;

const Message = styled.p.attrs(props => ({
  className: props.className
}))`
  position: relative;
  font-size: 16px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;

  span {
    position: absolute;
    top: -15px;
    font-weight: 500;
    font-size: xx-small;
  }
  p {
      padding-top: 6px;
      margin-left: 10px;
      font-size: xx-small;
  }

  .reciver {
    margin-left: auto;
    background-color: #dcf8c6
  }

`;

const ChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;

  form {
    flex: 1;
    display: flex;

    input {
      flex: 1;
      border-radius: 30px;
      padding: 10px;
      border: none;
      background-color: lightgray;
    }

    button {
      display: none;
    }
  }

  .MuiSvgIcon-root {
    padding: 10px;
    color: gray;
  }

  @media (max-width: 768px) {
    position: fixed;
    right: 27px;
    bottom: 63px;
    background: white;
    width: 43%;
  }
`;
