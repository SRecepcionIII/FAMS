import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Financial &<br></br> Accounting</h1>
      <p>{message}</p>
    </div>
  );

}

export default App;
