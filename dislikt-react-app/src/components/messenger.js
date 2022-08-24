import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, DonutLarge, SearchOutlined } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const Messenger = (props) => {
  return (
    <Container>
      <Body>
        <Sidebar>
          <SidebarHeader>
            <IconButton>
              <Avatar />
            </IconButton>

            <SidebarHeaderRight>
              <IconButton>
                <DonutLarge />
              </IconButton>

              <IconButton>
                <ChatIcon />
              </IconButton>

              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </SidebarHeaderRight>
          </SidebarHeader>

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
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </ChatHeaderRight>
          </ChatHeader>

          <ChatBoddy>
            <Message>
              <p>
                <span>Aca Faca</span>
                Hey bro
                <p>3:52 PM</p>
              </p>
            </Message>
            <Message>Hey bro</Message>
          </ChatBoddy>

          <ChatFooter></ChatFooter>
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
`;

const Sidebar = styled.div`
  flex: 0.35;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  pad: 20px;
  border-radius: 1px solid red;
  height: 119px;
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
  }
`;

const SidebarChats = styled.div`
  background-color: white;
  flex: 1;
  overflow: scroll;
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

const SidebarHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;

  > .MuiSvgIcon-root {
    margin-right: 2vw;
    font-size: 24px !important;
  }
`;

const Chat = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const ChatBoddy = styled.div`
  background-color: lightblue;
  flex: 1;
  padding: 30px;
  overflow: scroll;
`;

const ChatFooter = styled.div``;

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

const Message = styled.div`
  position: relative;
  font-size: 16px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 10px;

  span {
    position: absolute;
    top: -15px;
    font-weight: 500;
    font-size: xx-small;
  }

  p {
    p {
      padding-top: 6px;
      margin-left: 10px;
      font-size: xx-small;
    }
  }
`;
