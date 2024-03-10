'use client'
import React from 'react'
import { useEffect } from 'react';

const Drives = () => {
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("reloaded");
    if (!hasReloaded) {
      window.location.reload();
      sessionStorage.setItem("reloaded", true);
      console.log("reload hua from client!!!")
    }
  }, []);

  return (
    <div>
      <h1>DRIVES PAGE !!</h1>
    </div>
  )
}

export default Drives
