"use client";
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import useAPIData from "../../../apiConfig/useAPIData";

const StudentTable = () => {
  const [originalStudents, setOriginalStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    branchId: "",
    graduationYear: "",
    rollNoMin: "",
    rollNoMax: "",
    bePercentage: "",
  });
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false); // State to track whether filters should be applied
  const { getItems } = useAPIData();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const academicDetailsResponse = await getItems(
        "TPO_academic_details",
        null,
        null,
        null,
        null,
        null,
        null,
        true
      );
      const academicDetails = academicDetailsResponse.data;

      const personalDetailsResponse = await getItems(
        "TPO_students_personal_details",
        null,
        null,
        null,
        null,
        null,
        null,
        true
      );
      const personalDetails = personalDetailsResponse.data;

      const joinedStudents = academicDetails.map((academic) => {
        const personal = personalDetails.find(
          (personal) => personal.user_id === academic.user_id
        );
        return {
          ...academic,
          name: personal ? personal.name : "Unknown",
          gender: personal ? personal.gender : "Unknown",
        };
      });

      setOriginalStudents(joinedStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const applyFilters = () => {
    let filteredData = originalStudents.filter((student) => {
      let pass = true;
      if (filters.branchId && student.branch_id !== filters.branchId)
        pass = false;
      if (
        filters.graduationYear &&
        student.grad_year !== parseInt(filters.graduationYear)
      )
        pass = false;
      if (filters.rollNoMin && student.roll_no < parseInt(filters.rollNoMin))
        pass = false;
      if (filters.rollNoMax && student.roll_no > parseInt(filters.rollNoMax))
        pass = false;
      if (
        filters.bePercentage &&
        student.be_percentage <= parseInt(filters.bePercentage)
      )
        pass = false;
      return pass;
    });
    setFilteredStudents(filteredData);
  };
  const clearFilters = () => {
    setFilters({
      branchId: "",
      graduationYear: "",
      rollNoMin: "",
      rollNoMax: "",
      bePercentage: "",
    });
    setShouldApplyFilters(false);
    setFilteredStudents(originalStudents);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = () => {
    applyFilters();
    setShouldApplyFilters(true); // Set shouldApplyFilters to true when button is clicked
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: "16px" }}
          >
            <Grid item>
              <TextField
                name="branchId"
                label="Branch ID"
                value={filters.branchId}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="graduationYear"
                label="Graduation Year"
                value={filters.graduationYear}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="rollNoMin"
                label="Roll No Min"
                value={filters.rollNoMin}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="rollNoMax"
                label="Roll No Max"
                value={filters.rollNoMax}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="bePercentage"
                label="BE Percentage"
                value={filters.bePercentage}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleFilterSubmit}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'white',
                  },
                }}
              >
                Apply Filters
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={clearFilters}
                sx={{
                  backgroundColor: 'primary.main', // change the background color to primary.main
                  color: 'black', // change the text color to black
                  '&:hover': {
                    backgroundColor: 'primary.dark', // change the background color on hover to primary.dark
                    color: 'white', // change the text color on hover to white
                  },
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <TableContainer>
            <Table aria-label="student table">
              <TableHead style={{ backgroundColor: "#c1c0cf" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Roll No</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Graduation Year
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {" "}
                    BE Percentage
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {" "}
                    Branch ID
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Gender</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(shouldApplyFilters ? filteredStudents : originalStudents).map(
                  (student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.roll_no}</TableCell>
                      <TableCell>{student.grad_year}</TableCell>
                      <TableCell>{student.be_percentage}</TableCell>
                      <TableCell>{student.branch_id}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StudentTable;
