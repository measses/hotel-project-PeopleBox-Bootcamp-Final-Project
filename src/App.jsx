import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";
import ReservationPage from "./pages/ReservationPage";
import Finance from "./pages/Finance";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </Router>
  );
};

export default App;
