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
  const [driveRounds, setDrivesRounds] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [studentTableData, setStudentTableData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [selectedRoundFilter, setSelectedRoundFilter] = useState('');
  const [newRound, setNewRound] = useState('');
  const [defaultRound, setDefaultRound] = useState('');

  useEffect(() => {
    if (selectedDrive) {
      // Set the defaultRound to the ongoing round ID of the drive
      setDefaultRound(selectedDrive.OngoingRound);
    }
  }, [selectedDrive]);

  useEffect(() => {
    async function fetchData() {
      try {
        const driveStatus = 'Ongoing';
        const ongoingDrives = await getItems('TPO_Drive', '*,RoundsInDrive.*', null, null, { 'DriveStatus': { '_eq': driveStatus } }, null, null, true);
        console.log("OngoingDrives --> ", ongoingDrives);
        setOngoingDrives(ongoingDrives.data);

        const TempDriveRouds = await getItems('TPO_DriveRound', null, null, null, null, null, null, true);
        setDrivesRounds(TempDriveRouds);

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

    // Filter students based on drive_id and user_id
    const filteredApplicants = applicants.filter(applicant => applicant.Drive === drive.id);
    const studentIds = filteredApplicants.map(applicant => applicant.Applicant);

    // Fetch student personal details
    const studentPersonalDetails = await getItems('TPO_students_personal_details', null, null, null, null, null, null, true);
    const filteredStudentDetails = studentPersonalDetails.data.filter(student => studentIds.includes(student.user_id));

    // Fetch student academic details
    const studentAcademicDetails = await getItems('TPO_academic_details', null, null, null, null, null, null, true);
    const filteredStudentAcademicDetails = studentAcademicDetails.data.filter(student => studentIds.includes(student.user_id));

    // Combine student personal and academic details
    const combinedStudentData = filteredStudentDetails.map(student => {
      const academicDetails = filteredStudentAcademicDetails.find(academic => academic.user_id === student.user_id);
      return { ...student, roll_no: academicDetails.roll_no, user_id: academicDetails.user_id };
    });

    // Add roundsindrive to the combinedStudentData
    const updatedStudentData = combinedStudentData.map(student => ({ ...student, roundsindrive: drive.RoundsInDrive }));
    // console.log('updatedstudentdata', updatedStudentData);
    // Add current round information
    const finalStudentData = updatedStudentData.map(student => {
      const currentRound = student.roundsindrive.find(round => round.TPO_DriveRound_id === ongoingRound);
     // *****
      console.log(student, filteredApplicants);
      return { ...student, currentRound: currentRound ? currentRound.Description : 'N/A' };
    });

    // Get status for each student from the applicants data
    const updatedFinalStudentData = finalStudentData.map(student => {
      const applicant = filteredApplicants.find(applicant => applicant.Applicant === student.user_id);
      return { ...student, status: applicant ? applicant.Status : 'N/A' };
    });

    // Save the data in state named 'studentTableData' by taking only name, branch, roll_no, currentRound, and roundsindrive of the filtered students
    setStudentTableData(updatedFinalStudentData.map(student => ({ name: student.name, branch: student.branch_id, roll_no: student.roll_no, currentRound: student.currentRound, roundsindrive: student.roundsindrive, status: student.status })));

    setFilteredStudentData(updatedFinalStudentData.map(student => ({ name: student.name, branch: student.branch_id, roll_no: student.roll_no, currentRound: student.currentRound, roundsindrive: student.roundsindrive, status: student.status })));
  
    console.log("updated student data: ", updatedStudentData);
    console.log("final student data: ", finalStudentData);
    console.log("updatedfinal student data: ", updatedFinalStudentData);

    setOpenDriveDialog(true);
  };


  const handleRoundOrderChange = (event, student) => {
    const { value } = event.target;
    console.log('value', value);
    // Find the round object in student's roundsindrive array where the order matches the selected round
    const selectedRoundObject = student.roundsindrive.find(round => round.Order === value);
    const selectedRoundId = selectedRoundObject ? selectedRoundObject.TPO_DriveRound_id : '';

    setFilteredStudentData(prevData =>
      prevData.map(s =>
        s.name === student.name ? { ...s, selectedRound: selectedRoundId } : s
      )
    );
  };

  const handleNewRoundChange = (event) => {
    console.log(event.target.value);
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
    setSelectedRoundFilter(selectedRound);
    if (selectedRound === '') {
      setFilteredStudentData(studentTableData);
    } else {
      setFilteredStudentData(studentTableData.filter(student => student.currentRound === selectedRound));
    }
  };

  const handleProcess = async (event) => {
    event.preventDefault();

    // Collect data from the form
    const formData = {
      newRound: newRound || defaultRound, // Use the default ongoing round ID if no new round selected
      studentData: filteredStudentData.map(student => ({
        name: student.name,
        selectedRound: student.selectedRound || defaultRound, // Use the default ongoing round ID if no round selected
        isSelected: student.isSelected !== undefined ? student.isSelected : false // Default isSelected to false if not defined
      }))
    };
  
    // Log the form values
    console.log("Form Data:", formData);
  
    // Create a temp variable and update the OngoingRound field of the selected drive
    const updatedDrive = { ...selectedDrive, OngoingRound: formData.newRound };
    console.log('updatedDrive', updatedDrive);
    try {
      // Use the API to update the data in the database
      const accessT = getAccessToken();
      await updateItem('TPO_Drive', selectedDrive.id, updatedDrive, true, accessT);
      console.log("Drive updated successfully:", updatedDrive);
      // update the state to reflect in ui
      setSelectedDrive(updatedDrive);
    } catch (error) {
      console.error("Error updating drive:", error);
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
            <InputLabel id="round-filter-select-label">Filter by Round</InputLabel>
            <Select
              labelId="round-filter-select-label"
              id="round-filter-select"
              value={selectedRoundFilter}
              label="Filter by Round"
              onChange={handleRoundFilterChange}
            >
              <MenuItem value="">
                <em>All Rounds</em>
              </MenuItem>
              {studentTableData[0]?.roundsindrive.map((round, index) => (
                <MenuItem key={round.id} value={round.Description}>
                  {round.Order} - {round.Description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                  <TableCell>Current Round</TableCell>
                  <TableCell>Update Round</TableCell>
                  <TableCell>Selection Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudentData.map((student, index) => (
                  <TableRow key={student.name}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.roll_no}</TableCell>
                    <TableCell>{student.currentRound}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <InputLabel id={`round-select-label-${index}`}>Updated Round</InputLabel>
                        <Select
                          labelId={`round-select-label-${index}`}
                          id={`round-select-${index}`}
                          value={student.selectedRound}
                          label="Round"
                          onChange={(e) => handleRoundOrderChange(e, student)}
                          sx={{ minWidth: 150 }} // Set the minimum width to 150px or adjust as needed
                        >
                          {student.roundsindrive.map((round, roundIndex) => (
                            <MenuItem key={round.id} value={round.Order}>
                              {round.Order} - {round.Description}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={student.isSelected || false} onChange={(e) => handleSelectionStatusChange(e, student)} />
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
