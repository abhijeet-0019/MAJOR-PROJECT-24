'use client';

import React from 'react';

const downloadBrochure = () => {
  saveAs('/utils/pdf/Placement_Brochure_2024.pdf', 'Placement_Brochure.pdf');
};

const PlacementProcedure = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'darkblue', fontSize: '30px', marginTop: '10px', fontWeight: 'bold', marginBottom: '10px' }}>Placement Procedure</h1>
      </div>
      <section>
        <h2 style={{ color: 'darkblue', fontSize: '25px', marginBottom: '10px' }}>For Company</h2>
        <ol style={{ counterReset: 'item', listStyleType: 'none', marginLeft: '0', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'1) '}`}</span>
              The company fills in the Interest Form available on the college website and submits it online. The Interest Form includes company domain, contact person details, company website, and its nature.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'2) '}`}</span>
              If found suitable, TPO cell sends a brochure and placement procedure details to the company.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'3) '}`}</span>
              The company then fills in a detailed registration form including information related to job profile, location, CTC, eligibility criteria, and selection round.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'4) '}`}</span>
              TPO cell sends shortlisted students’ details to the company as per the eligibility criteria.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'5) '}`}</span>
              The company can shortlist them before the beginning of the placement process.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'6) '}`}</span>
              The company is allotted slots and dates for conducting Pre-Placement Talk (PPT)/Written Test/Online Test/ Group Discussion (GD)/Interview with a request to confirm the same by a specified date. On failing to do so, the allotted slot may be given to other companies on their request. Request for any change in the slot can be entertained subject to its availability.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'7) '}`}</span>
              The companies are advised to conduct the PPT much before the final placement commences. This will provide ample time to the students for making a considered decision in joining the company.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'8) '}`}</span>
              The company conducts the selection rounds and confirms the list of selected students.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'9) '}`}</span>
              Company submits an online feedback form after the completion of the placement process.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'10) '}`}</span>
              The company may also, if interested, conduct selections for summer internships during their visit. Internship Policy along with Placement Calendar can be referred to for this purpose.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'11) '}`}</span>
              The company is required to send offer letters to the TPO cell, who will then hand them over to the concerned students.
            </span>
          </li>
        </ol>
      </section>
      <section>
        <h2 style={{ color: 'darkblue', fontSize: '25px', marginTop: '10px', marginBottom: '10px' }}>For Students</h2>
        <ol style={{ counterReset: 'item', listStyleType: 'none', marginLeft: '0', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'1) '}`}</span>
              The relevant information of the company is electronically broadcasted to all the students along with the other additional information furnished by the company.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'2) '}`}</span>
              Students fill in detail form which includes basic details along with information related to academic performance, technical and soft skills. Students need to verify these details.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'3) '}`}</span>
              TPO cell does screening to shortlist the eligible students.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'4) '}`}</span>
              Students submit an online feedback form after the completion of the placement process.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'5) '}`}</span>
              The Institute follows “One Student, One Job” policy. Low paid jobs are not counted towards this. Job opportunities from Government/PSUs will also be made available to all the students who are not already placed in a PSU. Once a student is offered a job in the PSUs/Government, he/she will not be allowed to sit for any further campus recruitment drive and will decline any other job he/she might have earned from campus.
            </span>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <span style={{ counterIncrement: 'item' }}>
              <span style={{ marginRight: '5px' }}>{`${'6) '}`}</span>
              As an exception to the “One Student, One Job” policy, a student who has secured a job, say from a company can appear for the placement procedure of another company if he/she is allowed for the same by the Professor Incharge, Training and Placement Cell. The discretion of the Professor Incharge of TPO cell should be final in this regard.
            </span>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default PlacementProcedure;
