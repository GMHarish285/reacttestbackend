import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/LeaderBoard";
import TrackProgress from "./pages/Trackprogress";
import Profilelog from "./Auth/Profilelog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/progress" element={<TrackProgress />} />
        <Route path="/profilelog" element={<Profilelog />} />
      </Routes>
    </Router>
  );
}

export default App;