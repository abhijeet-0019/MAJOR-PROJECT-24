'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
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
    <Box>
      <Box mb={4} mt={4}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          TPO DRIVES
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={2}>
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
      </Box>
    </Box>
  );
};

export default Drives;