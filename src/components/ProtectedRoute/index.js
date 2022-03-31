import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useLogin } from "../../containers/Login/loginContext";

const ProtectedRoute = ({ element }) => {
  let location = useLocation();
  const { session } = useLogin();

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default ProtectedRoute;
