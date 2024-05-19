// pages/index.js
import React from 'react';
import { Container, Box, Card, CardContent, Typography, Link } from '@mui/material';

export default function ContactUs() {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0', padding: 2 }}>
      <Card sx={{ maxWidth: 500, width: '100%', borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ textAlign: 'center', padding: 3 }}>
          <Typography variant="h4" component="h1" sx={{ color: '#0070f3', marginBottom: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Address:</strong> Training and Placement Office, MBM University Jodhpur
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Email ID for Companies:</strong> <Link href="mailto:tpo@mbm.ac.in" underline="hover">tpo@mbm.ac.in</Link>
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Email ID for Student Grievances:</strong> <Link href="mailto:tpobackoffice@mbm.ac.in" underline="hover">tpobackoffice@mbm.ac.in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
