import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingPage() {
    const navigate = useNavigate();
    useEffect(() => {
        window.location.href = "/admin/home";
        // navigate("/admin/login");
    }, []);
  return (
    <div className="App">
      404 not found!!!
    </div>

  );
}

export default LoadingPage;
