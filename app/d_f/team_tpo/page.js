'use client';

import React from 'react';
import TeamPhoto from '../../components/TeamPhoto.js';

const coordinators = [
  { name: 'Anuradha Chaturvedi', photo: '/utils/team/1.jpg', branch: 'Information Technology', phone: '+91-9781421922' },
  { name: 'Anushka Mathur', photo: '/utils/team/2.jpg', branch: 'Electronics and Communication Engineering', phone: '+91-8955993533' },
  { name: 'Ayushi Purohit', photo: '/utils/team/3.jpg', branch: 'Petroleum Engineering', phone: '+91-7014438961' },
  { name: 'Deepanshi Jain', photo: '/utils/team/4.jpg', branch: 'Production And Industrial Engineering', phone: '+91-8529270328' },
  { name: 'Kapil Tiwari', photo: '/utils/team/5.jpg', branch: 'Mining Engineering', phone: '+91-9468884886' },
  { name: 'Ketan Porwal', photo: '/utils/team/6.jpg', branch: 'Information Technology', phone: '+91-6377905236' },
  { name: 'Khush Purohit', photo: '/utils/team/7.jpg', branch: 'Computer Science Engineering', phone: '+91-8764737193' },
  { name: 'Prachi Sandu', photo: '/utils/team/8.jpg', branch: 'Mining Engineering', phone: '+91-9636115833' },
  { name: 'Priya Garg', photo: '/utils/team/9.jpg', branch: 'Computer Science Engineering', phone: '+91-6367202155' },
  { name: 'Rimi Mittal', photo: '/utils/team/10.jpg', branch: 'Electronics and Computer Engineering', phone: '+91-7849981755' },
  { name: 'Sejal Choudhary', photo: '/utils/team/11.jpg', branch: 'Mining Engineering', phone: '+91-9636893639' },
  { name: 'Sudhanshu Kumar', photo: '/utils/team/12.jpg', branch: 'Information Technology', phone: '+91-8726242517' },
  { name: 'Vardan Sharma', photo: '/utils/team/13.jpg', branch: 'Computer Science Engineering', phone: '+91-8005763416' },
];

const head = {
  name: 'Prof. Arvind Kumar Verma',
  designation: 'Head Training and Placement Cell',
  photo: '/utils/team/head.JPG',
  phone: '+91-9414918856',
};

const sectionStyle = {
  margin: '40px 0',
};

const cardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  margin: '0 -16px',
};

const h2Style = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#0070f3',
  fontSize: '2rem',
  fontWeight: 'bold',
};

const TeamTPO = () => {
  return (
    <div>
      <section style={sectionStyle}>
        <h2 style={h2Style}>Head of Training and Placement Cell</h2>
        <div style={cardsContainerStyle}>
          <TeamPhoto {...head} />
        </div>
      </section>
      <section style={sectionStyle}>
        <h2 style={h2Style}>Coordinators</h2>
        <div style={cardsContainerStyle}>
          {coordinators.map((coordinator, index) => (
            <TeamPhoto key={index} {...coordinator} />
          ))}
        </div>
      </section>
      <style jsx>{`
        @media (max-width: 1200px) {
          .card {
            width: calc(33.33% - 40px);
          }
        }
        @media (max-width: 900px) {
          .card {
            width: calc(50% - 40px);
          }
        }
        @media (max-width: 600px) {
          .card {
            width: calc(100% - 40px);
          }
        }
      `}</style>
    </div>
  );
};

export default TeamTPO;