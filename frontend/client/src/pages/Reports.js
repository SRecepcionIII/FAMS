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
    <div  className="container">
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
          <div  className="nav-item active">
            <span>Reports</span>
          </div>
        </div>

        <button onClick={goToLogout} className="logout-btn">Logout</button>
      </div>

        <div class="reports-section">
            <h1 class="section-title">Reports</h1>
            
            <div class="reports-grid">
                <div class="report-card">
                    <i class="fas fa-coins report-icon"></i>
                    <div class="report-info">
                        <div class="report-title">Income Statement</div>
                        <div class="report-desc">View Revenue, Expenses, and Net Income</div>
                    </div>
                </div>
                
                <div class="report-card">
                    <i class="fas fa-scale-balanced report-icon"></i>
                    <div class="report-info">
                        <div class="report-title">Balance Sheet</div>
                        <div class="report-desc">View Assets, Liabilities, and Equity</div>
                    </div>
                </div>
                
                <div class="report-card">
                    <i class="fas fa-money-bill report-icon"></i>
                    <div class="report-info">
                        <div class="report-title">Cash Flow System</div>
                        <div class="report-desc">View Cash Inflows and Outflows</div>
                    </div>
                </div>
                
                <div class="report-card">
                    <i class="fas fa-people-arrows report-icon"></i>
                    <div class="report-info">
                        <div class="report-title">Accounts Receivable</div>
                        <div class="report-desc">View Outstanding Customer Invoices</div>
                    </div>
                </div>
                
                <div class="report-card">
                    <i class="fas fa-file-invoice-dollar report-icon"></i>
                    <div class="report-info">
                        <div class="report-title">Accounts Payable</div>
                        <div class="report-desc">View Outstanding Vendor Bills</div>
                    </div>
                </div>
                
                <div class="report-card">
                    <i class="fas fa-receipt report-icon"></i>
                    <div class="report-info">
                        <div class="report-title">Expense Report</div>
                        <div class="report-desc">View and Analyze Business Expenses</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}