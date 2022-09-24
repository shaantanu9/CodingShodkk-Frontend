import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const Navigate = useNavigate();
  const [token, setToken] = useState(null);
  useEffect(() => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.reload();
  }, []);
  return Navigate("/");
  // return <Navigate to="/login" />;
}

export default Logout;
