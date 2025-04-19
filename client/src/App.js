import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NewUser from "./NewUser";
import Login from "./Login";
import Student from "./Student";
import Landlord from "./Landlord";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import RoommatesForm from "./RoommatesForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/landlord" element={<Landlord />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/RoommatesForm" element={<RoommatesForm />} />
      </Routes>
    </Router>
  );
}

export default App;
