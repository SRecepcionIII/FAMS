import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/reportstyle.css";

export default function Transactions() {
  const navigate = useNavigate();

  function goToTransactions() {
    navigate("/Transactions");
  }

  function goToLogout() {
    navigate("/");
  }

  return (
    <div className="container">
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
          <div onClick={goToTransactions} className="nav-item">
            <span>Transactions</span>
          </div>
          <div className="nav-item active">
            <span>Reports</span>
          </div>
        </div>

        <button onClick={goToLogout} className="logout-btn">Logout</button>
      </div>

      <div className="main-content">
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

        <div className="reports-section">
          <h1 className="section-title">Reports</h1>
          <div className="reports-grid">
            <div className="report-card">
              <i className="fas fa-coins report-icon"></i>
              <div className="report-info">
                <div className="report-title">Income Statement</div>
                <div className="report-desc">View Revenue, Expenses, and Net Income</div>
              </div>
            </div>
            <div className="report-card">
              <i className="fas fa-scale-balanced report-icon"></i>
              <div className="report-info">
                <div className="report-title">Balance Sheet</div>
                <div className="report-desc">View Assets, Liabilities, and Equity</div>
              </div>
            </div>
            <div className="report-card">
              <i className="fas fa-money-bill report-icon"></i>
              <div className="report-info">
                <div className="report-title">Cash Flow System</div>
                <div className="report-desc">View Cash Inflows and Outflows</div>
              </div>
            </div>
            <div className="report-card">
              <i className="fas fa-people-arrows report-icon"></i>
              <div className="report-info">
                <div className="report-title">Accounts Receivable</div>
                <div className="report-desc">View Outstanding Customer Invoices</div>
              </div>
            </div>
            <div className="report-card">
              <i className="fas fa-file-invoice-dollar report-icon"></i>
              <div className="report-info">
                <div className="report-title">Accounts Payable</div>
                <div className="report-desc">View Outstanding Vendor Bills</div>
              </div>
            </div>
            <div className="report-card">
              <i className="fas fa-receipt report-icon"></i>
              <div className="report-info">
                <div className="report-title">Expense Report</div>
                <div className="report-desc">View and Analyze Business Expenses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}