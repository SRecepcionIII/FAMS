import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/Reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
