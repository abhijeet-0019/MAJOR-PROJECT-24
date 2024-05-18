'use client'
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useAPIData from '../../../apiConfig/useAPIData';

export default function CalendarWithEvents() {
  const [events, setEvents] = useState([]);
  const { getItems } = useAPIData();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const academicDetailsResponse = await getItems('TPO_Drive', null, null, null, null, null, null, true);
        
        const formattedEvents = academicDetailsResponse.data.map(event => ({
          title: event.Name, 
          start: new Date(event.StartDate), 
          
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []); 

  const renderEventContent = (eventInfo) => (
    <div style={{ padding: '5px', borderRadius: '4px' }}>
      <b>{eventInfo.event.title}</b>
    </div>
  );

  return (
    <div className="calendar-container" style={{ padding: '40px', paddingTop: '20px', backgroundColor: '#dddfeb' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        eventDisplay="title"      
/>
    </div>
  );
}
