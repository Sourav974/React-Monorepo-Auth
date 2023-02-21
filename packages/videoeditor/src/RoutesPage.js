import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/authmodules/pages/Login";
import Signup from "./app/authmodules/pages/Signup";
import ForgotPassword from "./app/authmodules/pages/ForgotPassword";
import ResetPassword from "./app/authmodules/pages/ResetPassword";

import Dashboard from "./app/authmodules/pages/Dashboard";
import { useSelector } from "react-redux";
const RoutesPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("authemticated", isAuthenticated);
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot" element={<ForgotPassword />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
        </>
      )}
    </Routes>
  );
};
export default RoutesPage;
