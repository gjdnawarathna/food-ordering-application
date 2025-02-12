import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
