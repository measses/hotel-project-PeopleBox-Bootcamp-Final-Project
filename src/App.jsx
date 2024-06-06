  import React, { useState, useEffect } from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { Spin } from "antd";
  import Navbar from "./components/common/Navbar";
  import Home from "./pages/Home";
  import RoomPage from "./pages/RoomPage";
  import ReservationPage from "./pages/ReservationPage";
  import Finance from "./pages/Finance";
  import Footer from "./components/common/Footer";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import UserManagement from "./pages/UserManagement";
  import PrivateRoute from "./components/common/PrivateRoute";
  import Profile from "./pages/Profile";  
  import ErrorPage from "./pages/ErrorPage";

  const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
      setIsAuthenticated(!!user);
      setLoading(false);
    }, [user]);

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      );
    }

    return (
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/rooms"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RoomPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ReservationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/finance"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                userType={user?.user_type}
                allowedTypes={["admin"]}
              >
                <Finance />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                userType={user?.user_type}
                allowedTypes={["admin"]}
              >
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <div style={{ marginBottom: "50px" }}></div>
        <Footer />
      </Router>
    );
  };

  export default App;
