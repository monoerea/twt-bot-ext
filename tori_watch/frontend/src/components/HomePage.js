import React, { Component } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('RENDER');
    return (
      <Router>
        <Routes>
          <Route path="/" element={ <p>HELL</p>} />
          <Route path="sign_in" element={<SignInPage />} />
          <Route path="sign_up" element={<SignUpPage />} />
        
        </Routes>
      </Router>
    );
  }
}
