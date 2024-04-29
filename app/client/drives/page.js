'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const Drives = () => {
  const router = useRouter();

  const handleOngoingDrivesClick = () => {
    router.push('/client/drives/ongoing_drives');
  };
  const handleUpcomingDrivesClick = () => {
    router.push('/client/drives/upcoming_drives');
  };

  return (
    <div>
      <h1>TPO DRIVES</h1>
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