import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Transactions.css";

export default function Transactions() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: "$100",
      type: "Credit",
      date: "2023-10-01",
      description: "Payment for services",
      category: "Services",
      source: "Bank Transfer",
      status: "Completed",
    },
    {
      id: 2,
      amount: "$200",
      type: "Debit",
      date: "2023-10-02",
      description: "Purchase of goods",
      category: "Goods",
      source: "Credit Card",
      status: "Pending",
    },
  ]);

  function goToReports() {
    navigate("/Reports");
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
          <div className="nav-item active">
            <span>Transactions</span>
          </div>
          <div onClick={goToReports} className="nav-item">
            <span>Reports</span>
          </div>
        </div>

        <button onClick={goToLogout} className="logout-btn">Logout</button>
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
        <div class="transaction-section">
          
          <h1>Transaction History</h1>
          <div class="controls">
            <button class="add-button">+</button>
            <button class="download-button">Download as...</button>
            <select class="sort-by">
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="status">Status</option>
            </select>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th>Expense Category</th>
                <th>Source</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="transaction-list">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.source}</td>
                  <td>{transaction.status}</td>
                  <td>
                    <button className="action-button">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <div class="pagination">
          {/*<!-- Pagination controls -->*/}
        </div>
      </div>
    </div>
  </div>
  );
}