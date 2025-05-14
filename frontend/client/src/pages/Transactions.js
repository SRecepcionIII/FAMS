import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Transactions.css";
import { jsPDF } from "jspdf";

import "jspdf-autotable";

export default function Transactions() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([
    {
      id: "0001-11-22",
      amount: "₱ 100,000.00",
      type: "",
      date: "03/14/02",
      description: "Lorem Ipsum...",
      category: "",
      source: "",
      status: "pending",
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

  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    id: "",
    amount: "",
    currency: "₱",
    type: "",
    date: "",
    description: "",
    category: "",
    source: "",
    status: "pending",
  });
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const [downloadMenu, setDownloadMenu] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const filteredTransactions = statusFilter
    ? transactions.filter(t => t.status.toLowerCase() === statusFilter)
    : transactions;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  // Set default date to today when modal opens
  useEffect(() => {
    if (showModal) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;
      setNewTransaction(t => ({ ...t, date: todayStr }));
    }
  }, [showModal]);

  function goToReports() {
    navigate("/Reports");
  }

  function goToLogout() {
    navigate("/");
  }

  function handleAddTransaction() {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: `0001-11-${transactions.length + 22}`, amount: `${newTransaction.currency} ${newTransaction.amount}` },
    ]);
    setShowModal(false);
    setNewTransaction({
      id: "",
      amount: "",
      currency: "₱",
      type: "",
      date: "",
      description: "",
      category: "",
      source: "",
      status: "pending",
    });
  }

  function handleDownloadPDF() {
    const doc = new jsPDF();
    doc.autoTable({
      head: [[
        "Invoice ID", "Amount", "Type", "Date", "Description", "Expense Category", "Source", "Status"
      ]],
      body: transactions.map(t => [
        t.id, t.amount, t.type, t.date, t.description, t.category, t.source, t.status
      ]),
    });
    doc.save("transactions.pdf");
  }

  function handleDownloadWord() {
    let html = `<table border='1'><tr><th>Invoice ID</th><th>Amount</th><th>Type</th><th>Date</th><th>Description</th><th>Expense Category</th><th>Source</th><th>Status</th></tr>`;
    transactions.forEach(t => {
      html += `<tr><td>${t.id}</td><td>${t.amount}</td><td>${t.type}</td><td>${t.date}</td><td>${t.description}</td><td>${t.category}</td><td>${t.source}</td><td>${t.status}</td></tr>`;
    });
    html += `</table>`;
    const blob = new Blob([
      `<!DOCTYPE html><html><head><meta charset='utf-8'></head><body>${html}</body></html>`
    ], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.doc";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSort(option) {
    let sorted = [...transactions];
    if (option === "date") {
      sorted.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (option === "date-asc") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "date-desc") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "amount-asc") {
      sorted.sort((a, b) => parseFloat(a.amount.replace(/[^\d.-]/g, "")) - parseFloat(b.amount.replace(/[^\d.-]/g, "")));
    } else if (option === "amount-desc") {
      sorted.sort((a, b) => parseFloat(b.amount.replace(/[^\d.-]/g, "")) - parseFloat(a.amount.replace(/[^\d.-]/g, "")));
    }
    setTransactions(sorted);
    setSortBy(option);
  }

  function handleSelectRow(id) {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(row => row !== id) : [...prev, id]);
  }

  // Handler for download select
  function handleDownloadSelect(e) {
    const value = e.target.value;
    if (value === "pdf") {
      handleDownloadPDF();
    } else if (value === "word") {
      handleDownloadWord();
    }
    // Reset select to placeholder
    e.target.selectedIndex = 0;
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
        <div className="transaction-section">
          <div className="transaction-header">
            <h1 className="transaction-title">Transaction History</h1>
            <div className="controls">
              <button className="add-button" onClick={() => setShowModal(true)}>+</button>
              {selectedRows.length > 0 && (
                <button className="delete-button" onClick={() => setShowDeleteConfirm(true)} title="Delete selected">
                  🗑️
                </button>
              )}
              <select className="download-select" onChange={handleDownloadSelect} defaultValue="">
                <option value="" disabled>Download as</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
              </select>
              <select className="download-select" onChange={e => handleSort(e.target.value)} value={sortBy}>
                <option value="">Sort by</option>
                <option value="date">Date (Oldest First)</option>
                <option value="date-asc">Date (Ascending)</option>
                <option value="date-desc">Date (Descending)</option>
                <option value="amount-asc">Amount (Ascending)</option>
                <option value="amount-desc">Amount (Descending)</option>
              </select>
              <select className="download-select" onChange={e => setStatusFilter(e.target.value)} value={statusFilter} style={{marginLeft: '12px'}}>
                <option value="">Filter by Status</option>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <table className="transaction-table">
            <thead>
              <tr>
                <th></th>
                <th>Invoice ID</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th>Expense Category</th>
                <th>Source</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction, idx) => (
                <tr key={transaction.id} className={selectedRows.includes(transaction.id) ? "row-selected" : ""}>
                  <td><input type="checkbox" checked={selectedRows.includes(transaction.id)} onChange={() => handleSelectRow(transaction.id)} /></td>
                  <td>{transaction.id}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.source}</td>
                  <td>
                    <span className={`status-text ${transaction.status.toLowerCase()}`}>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                  </td>
                  <td><span className="action-menu">⋮</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              &laquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn${currentPage === i + 1 ? " active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h2>Add Transaction</h2>
            <div className="modal-form">
              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="modal-input" style={{ width: '80px', flex: '0 0 80px' }} value={newTransaction.currency} onChange={e => setNewTransaction({ ...newTransaction, currency: e.target.value })}>
                  <option value="₱">₱ PHP</option>
                  <option value="$">$ USD</option>
                  <option value="€">€ EUR</option>
                  <option value="¥">¥ JPY</option>
                  <option value="£">£ GBP</option>
                </select>
                <input className="modal-input" type="number" min="0" step="0.01" placeholder="Amount" value={newTransaction.amount} onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })} />
              </div>
              <input className="modal-input" placeholder="Type" value={newTransaction.type} onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value })} />
              <input className="modal-input" type="date" value={newTransaction.date} onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })} />
              <input className="modal-input" placeholder="Description" value={newTransaction.description} onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })} />
              <input className="modal-input" placeholder="Expense Category" value={newTransaction.category} onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })} />
              <input className="modal-input" placeholder="Source" value={newTransaction.source} onChange={e => setNewTransaction({ ...newTransaction, source: e.target.value })} />
              <select className="modal-input" value={newTransaction.status} onChange={e => setNewTransaction({ ...newTransaction, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="modal-btn add" onClick={handleAddTransaction}>Add</button>
              <button className="modal-btn cancel" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>&times;</button>
            <h2>Delete Transactions</h2>
            <p>Are you sure you want to delete the selected transaction(s)? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-btn add" onClick={() => {
                setTransactions(transactions.filter(t => !selectedRows.includes(t.id)));
                setSelectedRows([]);
                setShowDeleteConfirm(false);
              }}>Delete</button>
              <button className="modal-btn cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}