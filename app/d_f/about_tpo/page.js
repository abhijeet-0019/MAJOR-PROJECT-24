'use client'
import React from 'react';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import mbmPHOTO from '../../../public/utils/mbmPhoto.jpeg';
import styles from './about.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
      <h1 className={styles.heading}>Training and Placement Cell - MBM University</h1>
      </div>
      <Image src={mbmPHOTO} alt="University Photo" className={styles.image} />
      <div className={styles.details}>
        <Typography variant="body1" paragraph>
          The Training and Placement Cell works ceaselessly to provide smooth
          communication between companies and students. Our students spend over 3
          months in industry as part of their practical training. In addition to
          doing internships in reputed companies across India, our students also
          actively participate in research projects at IIT Jodhpur and other
          institutes of national repute. I extend you a hearty invitation to
          visit our campus for recruitment.
        </Typography>
        <Typography variant="body1" paragraph>
          We work throughout the year to place undergraduates and postgraduates in
          top reputed organisations. We also organize various training programmes
          and sessions to help students improve their technical skills,
          interpersonal skills, and soft skills and personality development.
          LRDI (logical reasoning and data interpretation), training on
          quantitative aptitude, and training on verbal ability are the areas
          which are worked upon for enhancing knowledge. All these efforts help
          in fulfilling the objective of creating maximum employment opportunities
          for students. Students of MBM Jodhpur are also given internship
          opportunities that help in exploring the corporate world, gaining
          valuable experience, and refining the skills they possess.
        </Typography>
      </div>
      <Box className={styles.buttons}>
        <Button variant="contained" color="primary" href="/d_f/about_tpo/why_mbm">
          Why MBM - Click here
        </Button>
        <Button variant="contained" color="primary" href="/d_f/about_tpo/placement_procedure">
          Placement Procedure - Click here
        </Button>
      </Box>
    </div>
  );
};

export default About;
