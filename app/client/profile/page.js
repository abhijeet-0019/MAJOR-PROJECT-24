'use client'
import React, { useEffect, useState } from 'react';
import { Paper, Grid, CircularProgress, Typography } from '@mui/material';
import useAPIData from '../../../apiConfig/useAPIData';
import styles from './profile.module.css'; // Import CSS file

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [academicDetails, setAcademicDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getItems } = useAPIData();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        
        // Fetch personal details
        const personalResponse = await getItems(
          'TPO_students_personal_details',
          null,
          null,
          null,
          { 'email': { '_eq': userEmail } },
          null,
          null,
          true
        );

        if (personalResponse && personalResponse.data && personalResponse.data.length > 0) {
          const userPersonalDetails = personalResponse.data[0];
          setUserDetails(userPersonalDetails);

          // Fetch academic details
          const academicResponse = await getItems(
            'TPO_academic_details',
            null,
            null,
            null,
            { 'user_id': { '_eq': userPersonalDetails.user_id } },
            null,
            null,
            true
          );

          if (academicResponse && academicResponse.data && academicResponse.data.length > 0) {
            setAcademicDetails(academicResponse.data[0]);
          } else {
            setError('No academic details found');
          }
        } else {
          setError('No personal details found');
        }
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <Paper className={styles.profileBox}>
        <Typography variant="h4" gutterBottom className={styles.header}>Your Profile</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.leftText}><strong>Name:</strong> {userDetails.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.rightText}><strong>Date of Birth:</strong> {userDetails.dob}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.leftText}><strong>Roll number:</strong> {academicDetails.roll_no}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.rightText}><strong>Branch:</strong> {academicDetails.branch_id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.leftText}><strong>Email ID:</strong> {userDetails.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.rightText}><strong>City:</strong> {userDetails.city}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.leftText}><strong>Gender:</strong> {userDetails.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.rightText}><strong>Father's Name:</strong> {userDetails.father_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.leftText}><strong>Mother's Name:</strong> {userDetails.mother_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.rightText}><strong>Mobile Number:</strong> {userDetails.mobile_num}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.leftText}><strong>Category:</strong> {userDetails.category}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={styles.rightText}><strong>State:</strong> {userDetails.state}</Typography>
          </Grid>
          {academicDetails && (
            <>
              <Grid item xs={6}>
                <Typography variant="body1" className={styles.leftText}><strong>10th Percentage:</strong> {academicDetails.percentage10}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={styles.rightText}><strong>12th Percentage:</strong> {academicDetails.percentage12}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={styles.leftText}><strong>Graduation Year:</strong> {academicDetails.current_year}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={styles.rightText}><strong>BE Percentage:</strong> {academicDetails.be_percentage}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={styles.leftText}><strong>Number of Dead KTs:</strong> {academicDetails.dead_kt}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={styles.rightText}><strong>Number of active KT:</strong> {academicDetails.active_kt}</Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
