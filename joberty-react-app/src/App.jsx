import "./App.scss";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddCompany from "./pages/AddCompany";
import Companies from "./pages/Companies";
import JobOffers from "./pages/JobOffers";
import MyCompany from "./pages/MyCompany";
import Company from "./pages/Company";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addCompany" element={<AddCompany />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<Company />} />
        <Route path="/myCompany" element={<MyCompany />} />
        <Route path="/companies/:companyId/jobOffers" element={<JobOffers />} />
        <Route path="*" element={<h1>Not found page</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
