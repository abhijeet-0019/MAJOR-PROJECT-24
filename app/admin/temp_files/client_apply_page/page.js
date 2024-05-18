'use client'
import React, { useEffect, useState } from 'react';
import useAPIData from '../../../../apiConfig/useAPIData';
import useAPIAuth from '../../../../apiConfig/useAPIAuth';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/CloudUpload';

const UpcomingDrives = () => {
  const { getItems, updateItem, createItem } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [openDriveDialog, setOpenDriveDialog] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [driveID, setDriveID] = useState(null);
  const [placeHolderRound, serPlaceHolderRound] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getItems('TPO_Drive', '*,RoundsInDrive.*', null, null, null, null, null, true);
      console.log('drive: ', response.data);
      const upcomingDrives = response.data.filter(drive => drive.DriveStatus === "Upcoming");
      setUpcomingDrives(upcomingDrives);
    }
    fetchData();
  }, []);

  const handleShowDetails = async (drive) => {
    setSelectedDrive(drive);
    setOpenDriveDialog(true);
    setDriveID(drive.id);
    const ph = drive.RoundsInDrive.find(round => round.Order === "0");
    serPlaceHolderRound(ph);
    const userEmail = sessionStorage.getItem('userEmail');
    const response = await getItems('TPO_students_personal_details', null, null, null, { 'email': { '_eq': userEmail } }, null, null, true);
    setUserID(response.data[0].user_id);
    console.log('userID', userID);
    console.log('placeholder', placeHolderRound)
  };

  const handleApply = () => {
    setOpenApplyDialog(true);
  };

  const handleUploadResume = async () => {
    try {

      const formData = new FormData();
      formData.append('resume', resumeFile);

      const accessT = getAccessToken();
      await updateItem("TPO_RESUME", userID, formData, true, accessT);
      alert('Resume uploaded successfully');
    } catch (error) {
      console.error("Error uploading Resume:", error);
      alert("Failed to upload Resume. Please try again later.");
    }
  };

  const handleSubmitApplication = async () => {
    try {
      const applicantPayload = {
        "Applicant": userID,
        "CurrentRound": 7,
        "Drive": driveID,
        "Status": "Applied",
      }
      console.log("application payload: ", applicantPayload);
      const accessT = getAccessToken();
      await createItem("TPO_Application", applicantPayload, true, accessT);
      alert('Application Submitted Successfully');
    } catch (error) {
      console.error("Error Submitting Application:", error);
      alert("Failed to Submit Application. Please try again later or contact the TPO Representative");
    }
    setOpenDriveDialog(false);
    setOpenApplyDialog(false);
  };

  return (
    <div>
      <h1>Upcoming Drives</h1>
      <TableContainer component={Paper}>
        <Table aria-label="upcoming drives table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CTC</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingDrives.map(drive => (
              <TableRow key={drive.id}>
                <TableCell>{drive.Name}</TableCell>
                <TableCell>{`${drive.MinCTC} - ${drive.MaxCTC}`}</TableCell>
                <TableCell>{drive.RolesOffered}</TableCell>
                <TableCell>
                  <Button onClick={() => handleShowDetails(drive)}>Show Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDriveDialog} onClose={() => setOpenDriveDialog(false)}>
        <DialogTitle>{selectedDrive && selectedDrive.Name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Description:</strong> {selectedDrive && selectedDrive.Description}
          </DialogContentText>
          <DialogContentText>
            <strong>Roles Offered:</strong> {selectedDrive && selectedDrive.RolesOffered}
          </DialogContentText>
          <DialogContentText>
            <strong>Branches Allowed in Drive:</strong> {selectedDrive && selectedDrive.DriveBranchMapping.join(', ')}
          </DialogContentText>
          <DialogContentText>
            <strong>Start Date:</strong> {selectedDrive && selectedDrive.StartDate}
          </DialogContentText>
          <DialogContentText>
            <strong>Slab:</strong> {selectedDrive && selectedDrive.Slab}
          </DialogContentText>
          <DialogContentText>
            <strong>Mode:</strong> {selectedDrive && selectedDrive.Mode}
          </DialogContentText>
          <DialogContentText>
            <strong>Number of Rounds in Drive:</strong> {selectedDrive && selectedDrive.RoundsInDrive.length}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openApplyDialog} onClose={() => setOpenApplyDialog(false)}>
        <DialogTitle>Apply for {selectedDrive && selectedDrive.Name}</DialogTitle>
        <IconButton aria-label="close" onClick={() => setOpenApplyDialog(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Upload your resume:
          </DialogContentText>
          <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<UploadIcon />} onClick={handleUploadResume}>Upload</Button>
          <Button onClick={handleSubmitApplication}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpcomingDrives;