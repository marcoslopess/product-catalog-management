import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? children : <Navigate to="/registerLogin" />;
};

export default PrivateRoute;
