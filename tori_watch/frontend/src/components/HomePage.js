import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

import UserPage from "./UserManagementPage";

import { Dashboard } from "./Dashboard";
import {Test} from "./Test";
import { LandingPage } from "./LandingPage";
import { Test2 } from "./Test2";

const HomePage = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="sign_in" element={<SignInPage />} />
        <Route path="sign_up" element={<SignUpPage />} />
        <Route path="dashboard/:uid" element={<Dashboard/>} />
        <Route path="test" element={<Test />} />
        <Route path="test2" element={<Test2 />} />
        <Route path="admins/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default HomePage;
