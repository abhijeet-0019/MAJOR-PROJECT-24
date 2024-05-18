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
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const UpcomingDrives = () => {
  const { getItems, updateItem, createItem } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [ongoingDrives, setOngoingDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [openDriveDialog, setOpenDriveDialog] = useState(false);
  const [driveApplicants, setDriveApplicants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getItems('TPO_Drive', '*,RoundsInDrive.*', null, null, null, null, null, true);
      console.log('drive: ', response.data);
      const ongoingDrives = response.data.filter(drive => drive.DriveStatus === "Upcoming");
      setOngoingDrives(ongoingDrives);
    }
    fetchData();
  }, []);

  const handleShowDetails = async (drive) => {
    setSelectedDrive(drive);
    setOpenDriveDialog(true);
  };

  const handleExtractStudentsList = async () => {
    const applications = await getItems('TPO_Application', null, null, null, null, null, null, true);
    console.log('applications: ', applications.data);
    const driveApplicants = applications.data.filter(application => application.Drive === selectedDrive.id);
    console.log('drive applicants: ', driveApplicants);
    setDriveApplicants(driveApplicants);
  };

  const handleExportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(driveApplicants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Drive Applicants');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `drive-applicants-${selectedDrive.Name}.xlsx`);
  };

  return (
    <div>
      <h1>OngoingDrives</h1>
      <TableContainer component={Paper}>
        <Table aria-label="ongoing drives table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Slab</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ongoingDrives.map(drive => (
              <TableRow key={drive.id}>
                <TableCell>{drive.Name}</TableCell>
                <TableCell>{drive.StartDate}</TableCell>
                <TableCell>{drive.Slab}</TableCell>
                <TableCell>
                  <Button onClick={() => handleShowDetails(drive)}>View</Button>
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
          {/* <DialogContentText>
            <strong>Branches Allowed in Drive:</strong>
            {selectedDrive && selectedDrive.DriveBranchMapping.map(branchId => (
              <span key={branchId}>{getBranchName(branchId)}<br /></span>
            ))}
          </DialogContentText> */}
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
          <Button onClick={handleExtractStudentsList}>Extract Students List</Button>
          <Button onClick={handleExportToXLSX}>Export to XLSX</Button>
          <IconButton aria-label="close" onClick={() => setOpenDriveDialog(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpcomingDrives;