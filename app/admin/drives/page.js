'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Drives = () => {
  const router = useRouter();

  const handleOngoingDrivesClick = () => {
    router.push('/admin/drives/ongoing_drives');
  };
  const handleUpcomingDrivesClick = () => {
    router.push('/admin/drives/upcoming_drives');
  };

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
      <h1>ADMIN DRIVE MANAGEMENT TPO DRIVES</h1>
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleOngoingDrivesClick}
      >
        Ongoing Drives
      </Button>
      <Button
        variant="outlined"
        endIcon={<SendIcon />}
        onClick={handleUpcomingDrivesClick}
      >
        Upcoming Drives
      </Button>
    </div>
  );
};

export default Drives;