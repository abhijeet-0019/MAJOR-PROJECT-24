'use client';

import React from 'react';
import { saveAs } from 'file-saver';

const downloadBrochure = () => {
  saveAs('/utils/pdf/Placement_Brochure_2024.pdf', 'Placement_Brochure.pdf');
};

const MBMBrochure = () => {
  return (
    <div style={styles.container}>
      <div style={styles.dialogueBox}>
        <h1 style={styles.title}>Download Placement Brochure</h1>
        <button
          onClick={downloadBrochure}
          style={styles.button}
        >
          Download Brochure
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  dialogueBox: {
    padding: '20px 40px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  title: {
    color: 'darkblue',
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'darkblue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MBMBrochure;
