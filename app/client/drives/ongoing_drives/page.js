'use client'
import React, { useEffect, useState } from 'react';
import useAPIData from '../../../../apiConfig/useAPIData';
import useAPIAuth from '../../../../apiConfig/useAPIAuth';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const OngoingDrives = () => {
  const { getItems, getItem } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [ongoingDrives, setOngoingDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [openDriveDialog, setOpenDriveDialog] = useState(false);
  const [driveRounds, setDrivesRounds] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userEmail = sessionStorage.getItem('userEmail');
      try {
        const userResponse = await getItems('TPO_students_personal_details', null, null, null, { 'email': { '_eq': userEmail } }, null, null, true);
        const userId = userResponse.data[0].user_id;

        const applicationsResponse = await getItems('TPO_Application', '*,Drive.*', null, null, null, null, null, true);
        if (applicationsResponse.error) {
          console.error("Error fetching applications --> ", applicationsResponse.error);
          return;
        }

        const TempUserApplications = applicationsResponse.data.filter(application => application.Applicant === userId && application.Status === 'Ongoing');
        setUserApplications(TempUserApplications);
        if (TempUserApplications.length === 0) {
          console.log("user id ---", userId);
          console.log("----", TempUserApplications);
          console.log("No ongoing applications found for user");
          return;
        }
        const ongoingDrives = TempUserApplications.map(application => application.Drive);
        console.log("OngoingDrives --> ", ongoingDrives);
        setOngoingDrives(ongoingDrives)

        const TempDriveRouds = await getItems('TPO_DriveRound', null, null, null, null, null, null, true);
        setDrivesRounds(TempDriveRouds);

      } catch (error) {
        console.error("Error fetching data --> ", error);
      }
    }
    fetchData();
  }, []);

  const handleShowDetails = async (drive) => {
    const ongoingRound = drive.OngoingRound;
    const round = driveRounds.data.find(r => r.id === ongoingRound);
    const roundName = round ? round.RoundName : 'Round not found';
    const applicantStatus = userApplications?.find(application => application.Drive.id === drive.id)?.Status;
    // console.log("--- CURRENT DRIVE ID", drive.id);
    // console.log("--->", applicantStatus);
    setSelectedDrive({ ...drive, roundName, applicantStatus });
    setOpenDriveDialog(true);
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Ongoing Drives</h1>
      <TableContainer component={Paper} style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        <Table aria-label="ongoing drives table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Drive</TableCell>
              <TableCell style={{ fontWeight: 600 }}>View Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ongoingDrives.map(drive => (
              <TableRow key={drive.id}>
                <TableCell>{drive.Name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleShowDetails(drive)} variant="contained" color="primary" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDriveDialog} onClose={() => setOpenDriveDialog(false)}>
        {/* <DialogTitle style={{ textAlign: 'center' }}>{selectedDrive && `Drive ID: ${selectedDrive.id}`}</DialogTitle> */}
        <DialogContent sx={{ py: 3, px: 5 }}>
          <Typography variant="h6" fontFamily="Roboto, sans-serif" sx={{ mb: 2, textAlign: 'center' }}>
            Drive Overview
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Ongoing Round:</strong> {selectedDrive && selectedDrive.roundName}
          </Typography>
          {/* <Divider sx={{ mb: 2 }} /> */}
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Applicant Status:</strong> {selectedDrive && selectedDrive.applicantStatus}
          </Typography>
          {/* <Divider sx={{ mb: 3 }} /> */}
          <Typography variant="h6" fontFamily="Roboto, sans-serif" sx={{ mb: 2, textAlign: 'center' }}>
            Drive Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Name:</strong> {selectedDrive && selectedDrive.Name}
          </Typography>
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Description:</strong> {selectedDrive && selectedDrive.Description}
          </Typography>
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Start Date:</strong> {selectedDrive && selectedDrive.StartDate}
          </Typography>
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>MaxCTC:</strong> {selectedDrive && selectedDrive.MaxCTC}
          </Typography>
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Slab:</strong> {selectedDrive && selectedDrive.Slab}
          </Typography>
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Roles Offered:</strong> {selectedDrive && selectedDrive.RolesOffered}
          </Typography>
          <Typography variant="body1" fontFamily="Roboto, sans-serif" sx={{ mb: 1 }}>
            <strong>Mode:</strong> {selectedDrive && selectedDrive.Mode}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ py: 2, justifyContent: 'center' }}>
          <Button onClick={() => setOpenDriveDialog(false)} variant="contained" color="primary" style={{ backgroundColor: '#007bff', color: '#fff' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OngoingDrives;