import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../style/reportstyle.css";

export default function Reports() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [activeTab, setActiveTab] = useState("monthly");

  // Dummy Data Reports
  const reports = {
    // Income Statement Report
    incomeStatement: {
      title: "Income Statement",
      description: "View & Download Revenue, Expenses, and Net Income",
      icon: "fa-coins",
      data: {
        monthly: [
          { period: "January", revenue: 50000, expenses: 30000, netIncome: 20000 },
          { period: "February", revenue: 55000, expenses: 32000, netIncome: 23000 },
          { period: "March", revenue: 60000, expenses: 35000, netIncome: 25000 }
        ],
        quarterly: [
          { period: "Q1", revenue: 165000, expenses: 97000, netIncome: 68000 },
          { period: "Q2", revenue: 180000, expenses: 102000, netIncome: 78000 }
        ],
        annual: [
          { period: "2023", revenue: 720000, expenses: 420000, netIncome: 300000 }
        ]
      }
    },
   // Balance Report
    balanceSheet: {
      title: "Balance Sheet",
      description: "View Assets, Liabilities, and Equity",
      icon: "fa-scale-balanced",
      data: {
        assets: 500000,
        liabilities: 200000,
        equity: 300000
      }
    }
  };

  function goToTransactions() {
    navigate("/Transactions");
  }

  function goToLogout() {
    navigate("/");
  }

  const handleReportClick = (reportKey) => {
    setCurrentReport(reports[reportKey]);
    setReportData(reports[reportKey].data);
    setActiveTab("monthly");
    setShowModal(true);
  };

  // Download PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(currentReport.title, 14, 20);
    
    if (currentReport.title === "Income Statement") {
      let tableData = [];
      let headers = [];
      let title = "";
      
      if (activeTab === "monthly") {
        title = "Monthly Data";
        headers = ["Month", "Revenue", "Expenses", "Net Income"];
        tableData = reportData.monthly.map(item => [
          item.period,
          `₱${item.revenue.toLocaleString()}`,
          `₱${item.expenses.toLocaleString()}`,
          `₱${item.netIncome.toLocaleString()}`
        ]);
      } else if (activeTab === "quarterly") {
        title = "Quarterly Data";
        headers = ["Quarter", "Revenue", "Expenses", "Net Income"];
        tableData = reportData.quarterly.map(item => [
          item.period,
          `₱${item.revenue.toLocaleString()}`,
          `₱${item.expenses.toLocaleString()}`,
          `₱${item.netIncome.toLocaleString()}`
        ]);
      } else {
        title = "Annual Data";
        headers = ["Year", "Revenue", "Expenses", "Net Income"];
        tableData = reportData.annual.map(item => [
          item.period,
          `₱${item.revenue.toLocaleString()}`,
          `₱${item.expenses.toLocaleString()}`,
          `₱${item.netIncome.toLocaleString()}`
        ]);
      }
      
      doc.text(title, 14, 30);
      autoTable(doc, {
        startY: 35,
        head: [headers],
        body: tableData
      });
    } else {
      autoTable(doc, {
        startY: 30,
        head: [["Category", "Amount"]],
        body: [
          ["Assets", `₱${reportData.assets.toLocaleString()}`],
          ["Liabilities", `₱${reportData.liabilities.toLocaleString()}`],
          ["Equity", `₱${reportData.equity.toLocaleString()}`]
        ]
      });
    }
    
    doc.save(`${currentReport.title} - ${activeTab}.pdf`);
  };

  // Download xcls
  const generateExcel = () => {
    let worksheetData = [];
    
    if (currentReport.title === "Income Statement") {
      if (activeTab === "monthly") {
        worksheetData = [
          ["Income Statement - Monthly Data"],
          ["Month", "Revenue", "Expenses", "Net Income"],
          ...reportData.monthly.map(item => [
            item.period,
            item.revenue,
            item.expenses,
            item.netIncome
          ])
        ];
      } else if (activeTab === "quarterly") {
        worksheetData = [
          ["Income Statement - Quarterly Data"],
          ["Quarter", "Revenue", "Expenses", "Net Income"],
          ...reportData.quarterly.map(item => [
            item.period,
            item.revenue,
            item.expenses,
            item.netIncome
          ])
        ];
      } else {
        worksheetData = [
          ["Income Statement - Annual Data"],
          ["Year", "Revenue", "Expenses", "Net Income"],
          ...reportData.annual.map(item => [
            item.period,
            item.revenue,
            item.expenses,
            item.netIncome
          ])
        ];
      }
    } else {
      worksheetData = [
        ["Balance Sheet"],
        [],
        ["Category", "Amount"],
        ["Assets", reportData.assets],
        ["Liabilities", reportData.liabilities],
        ["Equity", reportData.equity]
      ];
    }
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${currentReport.title} - ${activeTab}.xlsx`);
  };

  // Choose Income Periods
  const renderReportContent = () => {
    if (currentReport.title === "Income Statement") {
      return (
        <div>
          <div className="period-tabs">
            {/* Monthly */}
            <button
              className={`tab-btn ${activeTab === "monthly" ? "active" : ""}`}
              onClick={() => setActiveTab("monthly")}
            >
              Monthly
            </button>

             {/* Quarterly */}
            <button
              className={`tab-btn ${activeTab === "quarterly" ? "active" : ""}`}
              onClick={() => setActiveTab("quarterly")}
            >
              Quarterly
            </button>
             {/* Annual */}
            <button
              className={`tab-btn ${activeTab === "annual" ? "active" : ""}`}
              onClick={() => setActiveTab("annual")}
            >
              Annual
            </button>
          </div>

          {activeTab === "monthly" && (
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                  <th>Expenses</th>
                  <th>Net Income</th>
                </tr>
              </thead>
              <tbody>
                {reportData.monthly.map((item, index) => (
                  <tr key={index}>
                    <td>{item.period}</td>
                    <td>₱{item.revenue.toLocaleString()}</td>
                    <td>₱{item.expenses.toLocaleString()}</td>
                    <td>₱{item.netIncome.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "quarterly" && (
            <table>
              <thead>
                <tr>
                  <th>Quarter</th>
                  <th>Revenue</th>
                  <th>Expenses</th>
                  <th>Net Income</th>
                </tr>
              </thead>
              <tbody>
                {reportData.quarterly.map((item, index) => (
                  <tr key={index}>
                    <td>{item.period}</td>
                    <td>₱{item.revenue.toLocaleString()}</td>
                    <td>₱{item.expenses.toLocaleString()}</td>
                    <td>₱{item.netIncome.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "annual" && (
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Revenue</th>
                  <th>Expenses</th>
                  <th>Net Income</th>
                </tr>
              </thead>
              <tbody>
                {reportData.annual.map((item, index) => (
                  <tr key={index}>
                    <td>{item.period}</td>
                    <td>₱{item.revenue.toLocaleString()}</td>
                    <td>₱{item.expenses.toLocaleString()}</td>
                    <td>₱{item.netIncome.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Assets</td>
              <td>₱{reportData.assets.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Liabilities</td>
              <td>₱{reportData.liabilities.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Equity</td>
              <td>₱{reportData.equity.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="profile">
          <i className="fas fa-cog settings-icon"></i>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Employee"
            className="profile-img"
          />
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
            />
            <input
              type="text"
              placeholder="Search Tasks, Projects, Goals"
            />
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
            <div className="report-card" onClick={() => handleReportClick("incomeStatement")}>
              <i className={`fas ${reports.incomeStatement.icon} report-icon`}></i>
              <div className="report-info">
                <div className="report-title">{reports.incomeStatement.title}</div>
                <div className="report-desc">{reports.incomeStatement.description}</div>
              </div>
            </div>
            
            <div className="report-card" onClick={() => handleReportClick("balanceSheet")}>
              <i className={`fas ${reports.balanceSheet.icon} report-icon`}></i>
              <div className="report-info">
                <div className="report-title">{reports.balanceSheet.title}</div>
                <div className="report-desc">{reports.balanceSheet.description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Report */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h2>{currentReport.title}</h2>
              
              <div className="report-preview">
                {renderReportContent()}
              </div>

              <div className="modal-actions">
                <button className="download-btn" onClick={generatePDF}>
                  Download PDF
                </button>
                <button className="download-btn" onClick={generateExcel}>
                  Download Excel
                </button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}