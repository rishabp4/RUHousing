import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./LandingPage"; // ✅ new landing page
import NewUser from "./NewUser";
import Login from "./Login";
import Student from "./Student";
import Landlord from "./Landlord";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import RoommatesForm from './RoommatesForm'; 
import MatchedProfiles from './MatchedProfiles';
import SavedHousesPage from "./SavedHousesPage";
import HouseDetail from "./HouseDetail";
import ChatPage from './ChatPage';
function App() {
  /*const handleFormSubmit = (formData) => {
    console.log('Form Data Submitted:', formData);
    alert('Preferences submitted!');
  };*/

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
  <Route path="/new-user" element={<NewUser />} />
  <Route path="/login" element={<Login />} />
  <Route path="/student" element={<Student />} />
  <Route path="/landlord" element={<Landlord />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/find-roommates" element={<RoommatesForm />} />
  <Route path="/matched-profiles" element={<MatchedProfiles />} />
  <Route path="/saved-houses" element={<SavedHousesPage />} />
  <Route path="/house/:id" element={<HouseDetail />} />
  <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
