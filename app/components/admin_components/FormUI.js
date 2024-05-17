// FormUI.js
import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function FormUI({ formData, handleChange, handleSubmit }) {
  const driveModes = [
    {
      value: "Offline",
      label: "Offline",
    },
    {
      value: "Online",
      label: "Online",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={3}
        style={{ paddingTop: 30, paddingLeft: 40, paddingRight: 40 }}
      >
        <Grid item xs={12}>
          <TextField
            id="Name"
            label="Name"
            variant="outlined"
            size="small"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="Description"
            label="Description"
            variant="outlined"
            size="small"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="Mode"
            select
            label="Drive Mode"
            variant="outlined"
            size="small"
            name="Mode"
            value={formData.Mode}
            onChange={handleChange}
            fullWidth
            required
          >
            {driveModes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="MinCTC"
            label="Minimum CTC"
            type="number"
            variant="outlined"
            size="small"
            name="MinCTC"
            value={formData.MinCTC}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="MaxCTC"
            label="Maximum CTC"
            type="number"
            variant="outlined"
            size="small"
            name="MaxCTC"
            value={formData.MaxCTC}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="Slab"
            select
            label="Select Slab"
            variant="outlined"
            size="small"
            name="Slab"
            value={formData.Slab}
            onChange={handleChange}
            fullWidth
            required
          >
            {["Dream", "Core", "Steady"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="RolesOffered"
            label="Roles Offered"
            variant="outlined"
            size="small"
            name="RolesOffered"
            value={formData.RolesOffered}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="NumRounds"
            label="Number of Rounds"
            type="number"
            variant="outlined"
            size="small"
            name="NumRounds"
            value={formData.NumRounds}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="Criteria10"
            label="Criteria- 10th class"
            type="number"
            variant="outlined"
            size="small"
            name="Criteria10"
            value={formData.Criteria10}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="Criteria12"
            label="Criteria- 12th class"
            type="number"
            variant="outlined"
            size="small"
            name="Criteria12"
            value={formData.Criteria12}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaActiveKT"
            label="Criteria Active KT"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaActiveKT"
            value={formData.CriteriaActiveKT}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaDeadKT"
            label="Criteria Dead KT"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaDeadKT"
            value={formData.CriteriaDeadKT}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaDiploma"
            label="Criteria Diploma"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaDiploma"
            value={formData.CriteriaDiploma}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaGap12"
            label="Criteria Gap 12"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaGap12"
            value={formData.CriteriaGap12}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaGap10"
            label="Criteria Gap 10"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaGap10"
            value={formData.CriteriaGap10}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaGapDiplloma"
            label="Criteria Gap Diploma"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaGapDiplloma"
            value={formData.CriteriaGapDiplloma}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaGender"
            select
            label="Criteria Gender"
            variant="outlined"
            size="small"
            name="CriteriaGender"
            value={formData.CriteriaGender}
            onChange={handleChange}
            fullWidth
            required
          >
            {["Male", "Female", "Open"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaUG"
            label="Criteria UG"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaUG"
            value={formData.CriteriaUG}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="CriteriaSemBackCount"
            label="Criteria Sem Back Count"
            type="number"
            variant="outlined"
            size="small"
            name="CriteriaSemBackCount"
            value={formData.CriteriaSemBackCount}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="StartDate"
            label="Start Date"
            type="date"
            variant="outlined"
            size="small"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="EndDate"
            label="End Date"
            type="date"
            variant="outlined"
            size="small"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="HRName"
            label="HR Name"
            variant="outlined"
            size="small"
            name="HRName"
            value={formData.HRName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="HREmail"
            label="HR Email"
            variant="outlined"
            size="small"
            name="HREmail"
            value={formData.HREmail}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="HRContact"
            label="HR Contact"
            variant="outlined"
            size="small"
            name="HRContact"
            value={formData.HRContact}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="DriveStatus"
            select
            label="Drive Status"
            variant="outlined"
            size="small"
            name="DriveStatus"
            value={formData.DriveStatus}
            onChange={handleChange}
            fullWidth
            required
          >
            {["Upcoming", "Ongoing", "Completed"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
