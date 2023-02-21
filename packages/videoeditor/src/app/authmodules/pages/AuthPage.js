import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";

const AuthPage = () => {
  return (
    <div>
      <h1>AuthPage</h1>
      <Routes>
        <Route path="/auth/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export default AuthPage;
