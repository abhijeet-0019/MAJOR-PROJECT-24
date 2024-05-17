'use client'
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useAPIData from '../../../apiConfig/useAPIData'
import { title } from 'process';
import { Padding } from '@mui/icons-material';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const { getItems} = useAPIData();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getItems('TPO_Drive', null, null, null, null, null, null, true);
        setEvents(response.data.map(item => ({
          title: item.Name,
          date: item.StartDate
        })));
        console.log(title);
        console.log(date);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{padding:'50px', paddingTop:'1'}}>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
    </div>
  );
}
