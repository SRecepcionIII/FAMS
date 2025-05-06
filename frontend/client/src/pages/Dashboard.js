import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
     const navigate = useNavigate();
     const [user, setUser] = useState(null);

     useEffect(() => {
       const token = localStorage.getItem("token");
       if (!token) {
            navigate("/login"); // Redirect to login if no token
       } 
       else {
            setUser({ token });
       }
    }, [navigate]);
    const handleLogout = () => {
         localStorage.removeItem("token");
         navigate("/login");
    };
  
    return (
      <div>
           <h1>Dashboard</h1>
           {user ? <p>Welcome! You are logged in.</p> : <p>Loading...</p>}
           <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }