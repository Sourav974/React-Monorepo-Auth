import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../redux/authAction";
import {useNavigate} from "react-router-dom";
const Dashboard = ({ logoutUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login")
    window.location.reload();
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const mapStateToProps = () => ({});
const mapActionsToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
