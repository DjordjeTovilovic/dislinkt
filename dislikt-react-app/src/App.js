import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Header from "./components/header";
import Home from "./components/home/home";
import Signin from "./components/signin";
import Messenger from "./components/messenger/messenger";
import Profile from "./components/profile/src";
import Settings from "./components/notification-settings/settings/settings";
import FollowerRecommendation from "./components/recommendation/people/followerRecommendation";
import AllJobOffers from "./components/recommendation/job-offers/allJobOffers";

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
            path="/messenger"
            element={
              <>
                <Header />
                <Messenger />
              </>
            }
          ></Route>
          <Route path="/profile" element={<><Header/><Profile/></>}></Route>
          <Route path="/settings" element={<><Header/><Settings/></>}></Route>
          <Route path="/person-recommendation" element={<><Header/> <FollowerRecommendation/></>}></Route>
          <Route path="/job-offer" element={<><Header/><AllJobOffers/></>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
