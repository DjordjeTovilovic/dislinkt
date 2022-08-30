import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/header";
import Home from "./components/home/home";
import Signin from "./components/signin";
import Messenger from "./components/messenger/messenger";
import Profile from "./components/profile/src";
import Settings from "./components/notification-settings/settings/settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <>
                <Header /> <Home />
              </>
            }
          ></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route
            path="/messenger/:receiverId"
            element={
              <>
                <Header />
                <Messenger />
              </>
            }
          ></Route>
          <Route path="/profile" element={<><Header/><Profile/></>}></Route>
          <Route path="/settings" element={<><Header/><Settings/></>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
