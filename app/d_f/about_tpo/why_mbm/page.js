// pages/d_f/why_MBM.js
import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const WhyMBM = () => {
  const headingStyle = {
    color: '#00008B', 
    fontWeight: 'bold'
  };

  return (
    <Container style={{margin:'20px'}}>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          WHY CHOOSE MBM?
        </Typography>
        <Typography variant="body1" paragraph>
          MBM University boasts of its high standards of education, prestigious legacy, and a flourishing environment that caters to the overall development of our students, faculties, and staff members. Since its inception in 1951, it has always held a reputed position among the academic community and associated industries. Our students are true professionals and job-ready engineers, maintaining excellence in academics and research.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          ACADEMICS
        </Typography>
        <Typography variant="body1" paragraph>
          MBM University ensures high standards in teaching, cutting-edge curriculum, and effective assessment techniques. The institute offers 14 undergraduate and 25 postgraduate programs, along with core and interdisciplinary Doctoral (PhD) research programs. Our curriculum is regularly updated to meet the latest industry standards and technological advancements.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          INFRASTRUCTURE
        </Typography>
        <Typography variant="body1" paragraph>
          MBM University is located on a 98-acre campus in Jodhpur, Rajasthan. The campus boasts modern facilities including smart classrooms, subsidized hostels, a dedicated training and placement cell, and extensive sports and recreational facilities. The university is well-connected and easily accessible, providing a conducive environment for learning and development.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          STUDENTS
        </Typography>
        <Typography variant="body1" paragraph>
          MBM University has a total intake of 620 seats in UG programs and 334 seats in PG programs. The institute provides scholarships to over 300 students and offers a supportive environment for both academic and personal growth. Our students excel in various competitive exams and have a strong presence in both national and international platforms.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          STUDENT DEVELOPMENT
        </Typography>
        <Typography variant="body1" paragraph>
          MBM encourages students to take on responsibilities and engage in various activities, including training & placement, startup & entrepreneurship, and curriculum development. Initiatives like TEQIP-III improve employability and technical skills. Students are also involved in community service and leadership roles, contributing to their holistic development.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          BEYOND ACADEMICS
        </Typography>
        <Typography variant="body1" paragraph>
          MBM offers numerous co-curricular and extra-curricular activities through student clubs, which help in the overall personality development of students. The institute organizes several state-level competitive events annually. These activities foster a spirit of teamwork, innovation, and cultural awareness among students.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          EXCELLENCE
        </Typography>
        <Typography variant="body1" paragraph>
          MBM students and faculties are recognized for their achievements, including high ranks in GATE, successful startups, and contributions to major research projects. The institute's alumni hold top positions in various sectors. Our commitment to excellence is reflected in our consistent performance in academics, research, and extracurricular activities.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" style={headingStyle} gutterBottom>
          CONCLUDING REMARKS
        </Typography>
        <Typography variant="body1" paragraph>
          MBM University, as one of the oldest engineering institutions, continues to be a pioneer in providing skilled human resources and cutting-edge R&D solutions. We invite prospective recruiters to visit our campus and explore the capabilities of our students. Our graduates are well-equipped to meet the demands of the industry and contribute significantly to society.
        </Typography>
      </Box>
    </Container>
  );
};

export default WhyMBM;
