'use client'
import React, { useEffect, useState } from 'react';
import useAPIData from '../../../apiConfig/useAPIData';
import useAPIAuth from '../../../apiConfig/useAPIAuth';
import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';
import moment from 'moment';

const Notifications = () => {
  const { getItems } = useAPIData();
  const [notifications, setNotifications] = useState([]);
  const [drives, setDrives] = useState({});

  useEffect(() => {
    fetchNotifications();
    fetchDrives();
  }, []);

  const fetchNotifications = async () => {
    const response = await getItems('TPO_NOTIFICATION', null, null, null, null, null, null, true);
    if (response.error) {
      console.error("Error fetching notifications --> ", response.error);
      return;
    }
    setNotifications(response.data);
  };

  const fetchDrives = async () => {
    const response = await getItems('TPO_Drive', null, null, null, null, null, null, true);
    if (response.error) {
      console.error("Error fetching drives --> ", response.error);
      return;
    }
    const drivesData = response.data.reduce((acc, drive) => {
      acc[drive.id] = drive.Name;
      return acc;
    }, {});
    setDrives(drivesData);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '40px auto', padding: 3 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Notifications
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: 2 }}>
        <Table aria-label="notifications table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none', width: '20%' }}>Drive Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none', width: '50%' }}>Notification</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none', width: '30%' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell sx={{ borderBottom: 'none', padding: '16px' }}>
                  {drives[notification.drive_id] || 'Unknown'}
                </TableCell>
                <TableCell sx={{ borderBottom: 'none', padding: '16px' }}>{notification.content}</TableCell>
                <TableCell sx={{ borderBottom: 'none', padding: '16px' }}>
                  {moment(notification.date_created).format('MMMM D, YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Notifications;
