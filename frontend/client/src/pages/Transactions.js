import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Transactions.css";

export default function Transactions() {
  const navigate = useNavigate();

  function goToReports() {
    navigate("/Reports");
  }

  return (
    <div>
      <div className="sidebar">
        <div className="profile">
          <i className="fas fa-cog settings-icon"></i>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Employee"
            className="profile-img"
          ></img>
          <div className="employee-name">Employee Name</div>
        </div>

        <div className="nav-menu">
          <div className="nav-item active">
            <span>Transactions</span>
          </div>
          <div onClick={goToReports} className="nav-item">
            <span>Reports</span>
          </div>
        </div>

        <button className="logout-btn">Logout</button>
      </div>

      <div className="main-content">
        {/* Top Navigation Bar */}
        <div className="top-bar">
          <div className="search-bar">
            <i
              className="fas fa-search"
              style={{ color: "#95a5a6", marginRight: "10px" }}
            ></i>
            <input
              type="text"
              placeholder="Search Tasks, Projects, Goals"
            ></input>
          </div>

          <div className="icons">
            <div className="icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="icon">
              <i className="fas fa-bell"></i>
            </div>
          </div>
        </div>

        {/* Blank Section */}
        <div className="reports-section">
          <h1 className="section-title">Title Here</h1>
        </div>
      </div>
    </div>
  );
}