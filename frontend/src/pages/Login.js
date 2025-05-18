import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function goToTransactions(event) {
    event.preventDefault(); // Prevent form submission
    navigate("/Transactions"); // Navigate to the Transactions page
  }

  return (
    <div className="container">
      <div className="login-section">
        <h1>Financial &<br /><span>Accounting</span></h1>
        <form onSubmit={goToTransactions}>
          <label htmlFor="user">User</label>
          <input type="text" id="user" name="user" placeholder="Enter your username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />

          <button type="submit">Log In</button>

          <p className="forgot-password">
            Forgot password? <a href="#">Contact management</a>
          </p>
        </form>
      </div>
      <div className="image-section">
        <img src="accounting.jpg" alt="Finance Image" />
      </div>
    </div>
  );
}

