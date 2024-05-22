import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerList from "./components/pages/CustomerList";
import Dashboard from "./components/pages/Dashboard";
import Sidebar from "./components/common/Sidebar";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10 text-2xl font-bold">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
