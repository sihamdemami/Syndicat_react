import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    date_debut: null,
    date_fin: null,
    description: '',
    id_copropriete: 4,
  });
  const [events, setEvents] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const fetchEvents = () => {
    fetch('http://127.0.0.1:8000/api/event')
      .then((response) => response.json())
      .then((data) => {
        const calendarEvents = data.map((event) => convertEventToCalendarFormat(event));
        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const convertEventToCalendarFormat = (event) => {
    return {
      ...event,
      start: moment(event.date_debut).toDate(),
      end: moment(event.date_fin).toDate(),
    };
  };


 





  return (
    <div className="relative">
     
      
      <div className="h-500 mt-12  dark:bg-gray-700 dark:text-white">
        <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" views={['month', 'day', 'week','agenda']}
          style={{ height: 500  }} />
      </div>
    </div>
  );
};

export default MyCalendar;
