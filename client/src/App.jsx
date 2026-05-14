
// import Dashboard from "./Dashboard";

// function App() {
//   return <Dashboard />;
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Candidates from "./pages/Candidates";
import VoterList from "./pages/VoterList";
import Results from "./pages/Results";
import VotingPage from "./pages/VotingPage"
import VoteDashboard from "./pages/VoteDashboard"
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

        <Route path="/candidates" element={<Candidates  />} />
        <Route path="/voters" element={<VoterList />} />
          <Route path="/results" element={<Results />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/VoteDashboard" element={<VoteDashboard/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

    </Router>
  );
}

export default App;