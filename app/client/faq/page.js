'use client'
import React, { useEffect, useState } from 'react'
import useAPIData from '../../../apiConfig/useAPIData';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const FAQPage = () => {
  const { getItems } = useAPIData();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getItems('TPO_FAQ', null, null, null, null, null, null, true);
      setFaqs(response.data);
      console.log("faqs --> ",faqs);
    }
    fetchData();
  }, []);

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
    </div>
  )
}

export default FAQPage
