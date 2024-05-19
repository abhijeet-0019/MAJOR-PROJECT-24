'use client'
import React from 'react';
import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';

const CompanyConnect = () => {
  const handleMailTo = () => {
    window.location.href = 'mailto:tpo@mbm.ac.in';
  };

  return (
    <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Connect to TPO MBM
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '2rem',
          marginTop: '2rem',
          backgroundColor: '#bacee0'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Button
          variant="contained"
          startIcon={<EmailIcon />}
          onClick={handleMailTo}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: 'white',
            },
          }}
        >
          Send Mail
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom style={{ marginTop: '4rem' }}>
        Past Recruiters
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Image
          src="/utils/companies.png" 
          width={800}
          height={600}
        />
      </Box>
    </Container>
  );
};

export default CompanyConnect;
