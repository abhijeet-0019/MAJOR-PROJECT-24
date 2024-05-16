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

const OngoingDrives = () => {
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
      const userEmail = sessionStorage.getItem('userEmail');
      const res_st_id = await getItems('TPO_students_personal_details', null, null, null, { 'email': { '_eq': userEmail } }, null, null, true);
      setUserID(res_st_id.data[0].user_id);
      console.log('userID', userID);
      const response = await getItems('TPO_Drive', null, null, null, { 'Applicant': { '_eq': 'be6969d5-4b0a-4369-934b-9eb7030efbe7' } }, null, null, true);
      console.log('drive: ', response.data);
      const upcomingDrives = response.data.filter(drive => drive.DriveStatus === "Upcoming");
      setUpcomingDrives(upcomingDrives);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userID) {
      console.log('userID', userID);
    }
  }, [userID]);

  return (
    <div>
      <h1>Ongoing Drives</h1>
    </div>
  );
}

export default OngoingDrives;