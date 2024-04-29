'use client'
import React, { useEffect, useState } from 'react';
import useAPIData from '../../../../apiConfig/useAPIData';
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
    const { getItems } = useAPIData();
    const [upcomingDrives, setUpcomingDrives] = useState([]);
    const [selectedDrive, setSelectedDrive] = useState(null);
    const [openDriveDialog, setOpenDriveDialog] = useState(false);
    const [openApplyDialog, setOpenApplyDialog] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await getItems('TPO_Drive',null, null, null, null, null, null, true);
            const upcomingDrives = response.data.filter(drive => drive.DriveStatus === "Upcoming");
            setUpcomingDrives(upcomingDrives);
        }
        fetchData();
    }, []);

    const handleShowDetails = (drive) => {
        setSelectedDrive(drive);
        setOpenDriveDialog(true);
    };

    const handleApply = () => {
        setOpenApplyDialog(true);
    };

    const handleUploadResume = () => {
        // Handle resume upload logic
        alert('Resume uploaded successfully');
    };

    const handleSubmitApplication = () => {
        // Handle application submission logic
        setOpenDriveDialog(false);
        setOpenApplyDialog(false);
        alert('Your application is being submitted');
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
                    <input type="file" accept=".pdf,.doc,.docx" />
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
