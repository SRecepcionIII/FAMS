import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential; // Google ID Token
    localStorage.setItem("token", token); // Store token in local storage
    console.log("Login Success:", token);
    navigate("/dashboard"); // Redirect to Dashboard
  };

  function goToDashboard() {
    window.location.href = "/dashboard"; 
  }

  return (
    <div>
         <h1>Financial &<br></br>Acounting</h1>
         <p>User<input type="text"></input></p>
         <p>Password<input type="text"></input></p>
         <button onClick={goToDashboard}>Login</button>
         //<GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
    </div>
  );
}

