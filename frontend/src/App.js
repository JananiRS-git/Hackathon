import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => {
        console.error("Error fetching backend:", err);
        setData("Backend not connected");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Flask + React Connection Test</h1>
      <p style={{ fontSize: "20px" }}>Message from backend:</p>
      <h2 style={{ color: "green" }}>{data}</h2>
    </div>
  );
}

export default App;
