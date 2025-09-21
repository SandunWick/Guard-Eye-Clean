import React, { useState, useEffect } from "react";
import "./layout.css";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    const intervalId = setInterval(updateTime, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div>
      <h1 className="title-center">Dashboard</h1>
      <h1 className="blinking-clock">{currentTime}</h1> 
    </div>
  );
}

export default Dashboard;