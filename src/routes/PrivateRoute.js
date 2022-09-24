import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// const token = localStorage.getItem("token");
const getToken = localStorage.getItem("token");
export const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(getToken);

  if (token !== null) return <Navigate to="/" />;
  console.log("token from :gon", token);
  return children;
};

export default PrivateRoute;
