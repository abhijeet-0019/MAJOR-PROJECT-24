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
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import moment from 'moment';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Notifications = () => {
  const { getItems, createItem } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [notifications, setNotifications] = useState([]);
  const [drives, setDrives] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    drive_id: '',
    notification_id: '',
    content: ''
  });

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitNotification = async () => {
    try {
      const notificationPayload = {
        content: formData.content,
        date: moment().format('DD/MM/YYYY'),
        link: null,
        drive_id: parseInt(formData.drive_id, 10),
        notification_id: parseInt(formData.notification_id, 10),
      };
      const accessT = getAccessToken();
      await createItem("TPO_NOTIFICATION", notificationPayload, true, accessT);
      alert('Notification Submitted Successfully');
      fetchNotifications(); // refresh the list
    } catch (error) {
      console.error("Error Submitting Notification:", error);
      alert("Failed to Submit Notification. Please try again later or contact the TPO Representative");
    }
    handleCloseDialog();
  };

  const handleWhatsAppClick = () => {
    alert("Under construction");
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '40px auto', padding: 3 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Notifications
      </Typography>
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        sx={{
          marginBottom: 3,
          backgroundColor: '#1976d2',
          color: 'black',
          borderBlockColor: 'black',
          '&:hover': {
            backgroundColor: '#1565c0',
            color: 'white' // Maintain text color on hover
          }
        }}
      >
        Add Notification
      </Button>
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new notification.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="drive_id"
            label="Drive ID"
            type="number"
            fullWidth
            variant="standard"
            value={formData.drive_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="notification_id"
            label="Notification ID"
            type="number"
            fullWidth
            variant="standard"
            value={formData.notification_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleWhatsAppClick} color="primary" sx={{ marginRight: 'auto' }}>
            <WhatsAppIcon />
          </IconButton>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitNotification} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications;