'use client'
import React, { useEffect, useState } from 'react'
import useAPIData from '../../../apiConfig/useAPIData';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';

const FAQPage = () => {
  const { getItems } = useAPIData();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getItems('TPO_FAQ', null, null, null, null, null, null, true);
      setFaqs(response.data);
      setLoading(false);
      console.log("faqs --> ", faqs);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${faq.id}-content`}
              id={`panel${faq.id}-header`}
            >
              <Typography variant="h7">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default FAQPage;
