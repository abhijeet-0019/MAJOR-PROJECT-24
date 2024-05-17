"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


const Drives = () => {
  const router = useRouter();

  const handleCreateDrive = () => {
    router.push("/admin/drives/new_drive");
  };
  const handleCurrrentDrive = () => {
    router.push("/admin/drives/curr_drives");
  };

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("reloaded");
    if (!hasReloaded) {
      window.location.reload();
      sessionStorage.setItem("reloaded", true);
      console.log("reload hua from admin!!!");
    }
  }, []);

  return (
    <div>
    
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleCreateDrive}
      >
        Create a Drive
      </Button>
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleCurrrentDrive}
      >
        Current Drives
      </Button>
    </div>
  );
};

export default Drives;
