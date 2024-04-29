'use client'
import React, { useEffect, useState } from 'react'
import useAPIData from '../../../apiConfig/useAPIData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAPIAuth from "../../../apiConfig/useAPIAuth";
import { useRouter } from "next/navigation";

const defaultTheme = createTheme();

const FAQPage = () => {
  const { createItem, getItems } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [faqs, setFaqs] = useState([]);

  const [faq_question, setQ] = useState("");
  const [faq_ans, setA] = useState("");
  // const router = useRouter();

  const handleQueChange = (event) => {
    setQ(event.target.value);
  };

  const handleAnsChange = (event) => {
    setA(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getItems('TPO_FAQ', null, null, null, null, null, null, true);
      setFaqs(response.data);
      console.log("faqs --> ",faqs);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const faq = { faq_question, faq_ans };

    await createItem("TPO_FAQ", faq, true, getAccessToken);

  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {faqs.map((faq) => (
              <li key={faq.id}>{faq.question}</li>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            {/* <LockOutlinedIcon /> */}
          {/* </Avatar> */}
          <Typography component="h1" variant="h5" sx={{ color: 'black', fontWeight: 'bold' }}>
            Add New Notification
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="faq_question"
              label="faq_question"
              type='string'
              name="faq_question"
              // autoComplete="faq_question"
              autoFocus
              onChange={handleQueChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="faq_ans"
              label="faq_ans"
              type="string"
              id="faq_ans"
              // autoComplete="current-password"
              onChange={handleAnsChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: 'black' }}
              className=" bg-sky-400"
            >
              Submit
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}

export default FAQPage
