'use client'
import React, { useEffect, useState } from 'react';
import useAPIData from '../../../../apiConfig/useAPIData';
import useAPIAuth from '../../../../apiConfig/useAPIAuth';
import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Checkbox, TextField } from '@mui/material';

const OngoingDrives = () => {
  const { getItems, updateItem } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [ongoingDrives, setOngoingDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [openDriveDialog, setOpenDriveDialog] = useState(false);
  const [driveRounds, setDriveRounds] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [studentTableData, setStudentTableData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [newRound, setNewRound] = useState('');
  const [defaultRound, setDefaultRound] = useState('');

  useEffect(() => {
    if (selectedDrive) {
      setDefaultRound(selectedDrive.OngoingRound);
    }
  }, [selectedDrive]);

  useEffect(() => {
    async function fetchData() {
      try {
        const driveStatus = 'Ongoing';
        const ongoingDrives = await getItems('TPO_Drive', '*,RoundsInDrive.*', null, null, { 'DriveStatus': { '_eq': driveStatus } }, null, null, true);
        setOngoingDrives(ongoingDrives.data);

        const tempDriveRounds = await getItems('TPO_DriveRound', null, null, null, null, null, null, true);
        setDriveRounds(tempDriveRounds);

        const ongoingApplicants = await getItems('TPO_Application', null, null, null, { 'Status': { '_eq': 'Ongoing' } }, null, null, true);
        setApplicants(ongoingApplicants.data);
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
    setSelectedDrive({ ...drive, roundName });

    const filteredApplicants = applicants.filter(applicant => applicant.Drive === drive.id);
    const studentIds = filteredApplicants.map(applicant => applicant.Applicant);

    const studentPersonalDetails = await getItems('TPO_students_personal_details', null, null, null, null, null, null, true);
    const filteredStudentDetails = studentPersonalDetails.data.filter(student => studentIds.includes(student.user_id));

    const studentAcademicDetails = await getItems('TPO_academic_details', null, null, null, null, null, null, true);
    const filteredStudentAcademicDetails = studentAcademicDetails.data.filter(student => studentIds.includes(student.user_id));

    const combinedStudentData = filteredStudentDetails.map(student => {
      const academicDetails = filteredStudentAcademicDetails.find(academic => academic.user_id === student.user_id);
      return { ...student, roll_no: academicDetails.roll_no, user_id: academicDetails.user_id };
    });

    const updatedStudentData = combinedStudentData.map(student => ({ ...student, roundsindrive: drive.RoundsInDrive }));

    const finalStudentData = updatedStudentData.map(student => {
      const currentRound = student.roundsindrive.find(round => round.TPO_DriveRound_id === ongoingRound);
      return { ...student, currentRound: currentRound ? currentRound.Description : 'N/A' };
    });

    const updatedFinalStudentData = finalStudentData.map(student => {
      const applicant = filteredApplicants.find(applicant => applicant.Applicant === student.user_id);
      return { ...student, status: applicant ? applicant.Status : 'N/A' };
    });

    setStudentTableData(updatedFinalStudentData.map(student => ({
      name: student.name,
      branch: student.branch_id,
      roll_no: student.roll_no,
      roundsindrive: student.roundsindrive,
      status: student.status
    })));
    console.log("updated f", updatedFinalStudentData)
    setFilteredStudentData(updatedFinalStudentData.map(student => ({
      name: student.name,
      branch: student.branch_id,
      roll_no: student.roll_no,
      roundsindrive: student.roundsindrive,
      status: student.status,
      user_id: student.user_id
    })));

    setOpenDriveDialog(true);
  };

  const handleNewRoundChange = (event) => {
    setNewRound(event.target.value);
  };

  const handleSelectionStatusChange = (event, student) => {
    const { checked } = event.target;
    setFilteredStudentData(prevData =>
      prevData.map(s =>
        s.name === student.name ? { ...s, isSelected: checked } : s
      )
    );
  };

  const handleRoundFilterChange = (event) => {
    const selectedRound = event.target.value;
    if (selectedRound === '') {
      setFilteredStudentData(studentTableData);
    } else {
      setFilteredStudentData(studentTableData.filter(student => student.currentRound === selectedRound));
    }
  };

  const getApplicantByUserId = (userId) => {
    return applicants.find((applicant) => applicant.Applicant === userId);
  };

  const handleProcess = async (event) => {
    event.preventDefault();

    const formData = {
      newRound: newRound || defaultRound,
      studentData: filteredStudentData.map(student => ({
        name: student.name,
        selectedRound: student.selectedRound || defaultRound,
        isSelected: student.isSelected !== undefined ? student.isSelected : false
      }))
    };

    const updatedDrive = { ...selectedDrive, OngoingRound: formData.newRound };
    // const applicant_c = getApplicantByUserId(formData.studentData) 
    // const updatedApplicant = {}
    try {
      console.log("applicants data", filteredStudentData);
      const accessT = getAccessToken();
      await updateItem('TPO_Drive', selectedDrive.id, updatedDrive, true, accessT);
      setSelectedDrive(updatedDrive);
      console.log("Drive updated successfully:", updatedDrive);


      window.alert('Drive updated successfully.');
      window.location.reload();
    } catch (error) {
      console.error("Error updating drive:", error);
      window.alert('An error occurred while updating the drive. Please try again later.');
    }
    
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
      <Dialog open={openDriveDialog} onClose={() => setOpenDriveDialog(false)} fullWidth maxWidth="md" >
        <DialogContent sx={{ py: 3, px: 5 }}>
          <Typography variant="h6" fontFamily="Roboto, sans-serif" sx={{ mb: 1, textAlign: 'center' }}>
            Students
          </Typography>
          {selectedDrive && (
            <TextField
              label="Ongoing Round"
              value={selectedDrive.roundName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="new-round-select-label">Update Current Round of Drive</InputLabel>
            <Select
              labelId="new-round-select-label"
              id="new-round-select"
              value={newRound}
              label="Update Current Round of Drive"
              onChange={handleNewRoundChange}
            >
              {studentTableData[0]?.roundsindrive.map((round, index) => (
                <MenuItem key={round.id} value={round.TPO_DriveRound_id}>
                  {round.Order} - {round.Description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form onSubmit={handleProcess}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Selection Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudentData.map((student) => (
                  <TableRow key={student.name}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.roll_no}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={student.isSelected || false}
                        onChange={(e) => handleSelectionStatusChange(e, student)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <DialogActions sx={{ py: 3, justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                Process
              </Button>
              <Button onClick={() => setOpenDriveDialog(false)} variant="contained" color="primary" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default OngoingDrives;