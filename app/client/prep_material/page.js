import React from 'react';
import { Box, Container, Typography, Link, CssBaseline } from '@mui/material';

const PlacementGuide = () => {
  return (
    <>
      <CssBaseline />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Placement Preparation Guide
        </Typography>

        <Box mb={4}>
          <Typography variant="h6">1. Core Technical Subjects:</Typography>
          <Typography variant="body1" paragraph>
            Emphasize subjects related to your specific branch of engineering, such as Computer Science, Mechanical, Civil, Electrical, Electronics, etc. Study fundamentals and advanced topics in your chosen field. Stay up-to-date with the latest developments in your field.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">2. Coding and Programming:</Typography>
          <Typography variant="body1" paragraph>
            Develop strong programming skills in languages commonly used in your field (e.g., Python, Java, C++, etc.). Practice data structures and algorithms. Solve coding challenges and participate in coding competitions.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=bm0OyhwFDuY&list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5" target="_blank">📌Java</Link><br />
          <Link href="https://www.youtube.com/watch?v=7wnove7K-ZQ&list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg" target="_blank">📌Python</Link><br />
          <Link href="https://www.youtube.com/watch?v=z9bZufPHFLU&list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ" target="_blank">📌C++</Link><br />
          <Link href="https://www.youtube.com/watch?v=ER9SspLe4Hg&list=PLu0W_9lII9ahR1blWXxgSlL4y9iQBnLpR" target="_blank">📌JavaScript</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">3. Data Structures and Algorithms:</Typography>
          <Typography variant="body1" paragraph>
            Master data structures and algorithms as these are essential for technical interviews. Study sorting algorithms, searching algorithms, and data structures like arrays, linked lists, trees, and graphs.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=6iCHf7OZn6c&list=PL6Zs6LgrJj3tDXv8a_elC6eT_4R5gfX4d" target="_blank">📌DSA with Java</Link><br />
          <Link href="https://www.youtube.com/watch?v=WQoB2z67hvY&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA" target="_blank">📌DSA with C++</Link><br />
          <Link href="https://www.youtube.com/watch?v=8e_PwxYGZrA&list=PLzgPDYo_3xukPJdH6hVQ6Iic7KiJuoA-l&index=1" target="_blank">📌DSA with JavaScript</Link><br />
          <Link href="https://www.youtube.com/watch?v=8e_PwxYGZrA&list=PLzgPDYo_3xukPJdH6hVQ6Iic7KiJuoA-l&index=1" target="_blank">📌DSA with Python</Link><br />
          <Link href="https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O" target="_blank">📌Complete Algorithm playlist</Link><br />
          <Link href="https://www.youtube.com/watch?v=yVdKa8dnKiE&list=PLgUwDviBIf0rGlzIn_7rsaR2FQ5e6ZOL9" target="_blank">📌Recursion and Backtracking</Link><br />
          <Link href="https://www.youtube.com/watch?v=_ANrF3FJm7I&list=PLJ_vPQ_vraNz90tiB1HNgUWjivW07RcXC" target="_blank">📌Trees</Link><br />
          <Link href="https://www.youtube.com/watch?v=dBGUmUQhjaM&list=PLgUwDviBIf0pcIDCZnxhv0LkHf5KzG9zp" target="_blank">📌Trie</Link><br />
          <Link href="https://www.youtube.com/watch?v=M3_pLsDdeuU&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn" target="_blank">📌Graphs</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">4. Database Management:</Typography>
          <Typography variant="body1" paragraph>
            Understand database concepts, SQL, and database management systems (e.g., MySQL, PostgreSQL, Oracle). Learn about data modeling and database design.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=wjfeGxqAQOY&list=PLrjkTql3jnm-CLxHftqLgkrZbM8fUt0vn" target="_blank">📌DBMS</Link><br />
          <Link href="https://www.youtube.com/watch?v=323H_mOOWQ4&list=PLxCzCOWd7aiHqU4HKL7-SITyuSIcD93id" target="_blank">📌SQL</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">5. Web Development and Software Engineering:</Typography>
          <Typography variant="body1" paragraph>
            Learn web development technologies (HTML, CSS, JavaScript). Understand software development methodologies (Agile, Scrum) and version control (e.g., Git).
          </Typography>
          <Link href="https://www.youtube.com/watch?v=6mbwJ2xhgzM&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg" target="_blank">📌Web dev in Hindi</Link><br />
          <Link href="https://www.youtube.com/watch?v=gQojMIhELvM&list=PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc" target="_blank">📌Web dev in English</Link><br />
          <Link href="https://www.youtube.com/watch?v=FN_HSCp7ctw&list=PLmXKhU9FNesTrw7n8ouPsSLEcduRlENHr" target="_blank">📌Software Engineering</Link><br />
          <Link href="https://www.youtube.com/watch?v=apGV9Kg7ics" target="_blank">📌Git and Github</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">6. Operating Systems and Computer Networks:</Typography>
          <Typography variant="body1" paragraph>
            Gain knowledge in operating system principles and network protocols. Learn about TCP/IP, routing, and network security.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=vBURTt97EkA&list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O" target="_blank">📌Operating System</Link><br />
          <Link href="https://www.youtube.com/watch?v=VwN91x5i25g&list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx" target="_blank">📌Computer Networks</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">7. Machine Learning and Artificial Intelligence (if applicable):</Typography>
          <Typography variant="body1" paragraph>
            Study machine learning algorithms, deep learning, and AI concepts. Gain hands-on experience with tools like TensorFlow, PyTorch, or scikit-learn.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=GwIo3gDZCVQ" target="_blank">📌Free material</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">8. Soft Skills:</Typography>
          <Typography variant="body1" paragraph>
            Develop strong communication skills, both written and verbal. Work on problem-solving, critical thinking, and analytical skills. Improve your time management and teamwork abilities.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=x60GHpQ8gJk&list=PLWPirh4EWFpFIElSxplDlEhRDZHkBD-0n" target="_blank">📌Free material</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">9. Professional Development:</Typography>
          <Typography variant="body1" paragraph>
            Build a strong LinkedIn profile. Attend seminars, workshops, and webinars related to your field. Participate in hackathons, coding competitions, and open-source projects.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=S3qx4rt_Enk" target="_blank">📌LinkedIn</Link><br />
          <Link href="https://dev.to/avinash201199/how-to-ask-for-a-referral-on-linkedin-1g7e" target="_blank">📌How to ask for a referral on LinkedIn</Link>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">10. Projects and Internships:</Typography>
          <Typography variant="body1" paragraph>
            Engage in meaningful projects related to your field. Pursue internships to gain practical experience in real-world settings.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h6">11. Resume and Interview Preparation:</Typography>
          <Typography variant="body1" paragraph>
            Create a well-structured resume highlighting your skills, projects, and achievements. Practice for technical and HR interviews through mock interviews. Learn about common interview questions and how to approach them.
          </Typography>
          <Link href="https://www.youtube.com/watch?v=y8YH0Qbu5h4" target="_blank">📌Resume tips</Link><br />
          <Link href="https://drive.google.com/file/d/1cT_brbJ80A_aVq4QdR4jDlRB06UFcyYy/view?usp=sharing" target="_blank">📌Complete Resume guide</Link><br />
          <Link href="https://github.com/avinash201199/Resume-Templates" target="_blank">📌Resume Templates</Link><br />
          <Link href="https://github.com/avinash201199/Interviews-Resources" target="_blank">📌Interview questions PDFs</Link>
        </Box>
      </Container>
    </>
  );
};

export default PlacementGuide;
