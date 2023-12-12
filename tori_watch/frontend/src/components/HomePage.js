import React from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";
import NotFound404 from "./404";
import UserPage from "./UserManagementPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = () => {
  return (
    <Router>
      <Routes>
        {/* Use the `element` prop with the component directly */}
        <Route path="/" element={<p>HELLO</p>} />
        <Route path="sign_in" element={<SignInPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="dashboard/:uid" element={<Dashboard />} />
        <Route path="test" element={<NotFound404 />} />
        <Route path="admins/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default HomePage;
