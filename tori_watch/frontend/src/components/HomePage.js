import React from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";
import UserPage from "./UserManagementPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Test } from "./Test";
const HomePage = () => {
  return (
    <Router>
      <Routes>
        {/* Use the `element` prop with the component directly */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="sign_in" element={<SignInPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="dashboard/:uid" element={<Dashboard />} />
        <Route path="test" element={<Test />} />
        <Route path="admins/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default HomePage;
