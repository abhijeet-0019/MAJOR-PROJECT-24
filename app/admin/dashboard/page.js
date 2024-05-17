'use client'
import React, { useEffect } from 'react';

const Dashboard = () => {

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("reloaded");
    if (!hasReloaded) {
      window.location.reload();
      sessionStorage.setItem("reloaded", true);
      console.log("reload hua from admin!!!")
    }
  }, []);

  return (
    <div>
      <h1>DASHBOARD IT IS</h1>
    </div>
  );
};

export default Dashboard;


