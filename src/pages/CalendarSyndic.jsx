import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ idCoproperty }) => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    date_debut: null,
    date_fin: null,
    description: '',
    id_copropriete: idCoproperty,
  });
  const [events, setEvents] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const fetchEvents = () => {
    fetch(`http://127.0.0.1:8000/api/coproperties/event/${idCoproperty}`)
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

  const handleAddEventSubmit = async (event) => {
    event.preventDefault();
    
    
    if (!eventForm.title || !eventForm.date_debut || !eventForm.date_fin || !eventForm.description) {
      toast.error('Veuillez remplir tous les champs du formulaire.');
      return;
    }
    
    
    const startDate = moment(eventForm.date_debut, 'YYYY-MM-DD');
    const endDate = moment(eventForm.date_fin, 'YYYY-MM-DD');
    const currentDate = moment().startOf('day');
    
    if (!startDate.isValid() || !endDate.isValid() || startDate.isBefore(currentDate) || startDate.isAfter(endDate) || endDate.isBefore(startDate)) {
      toast.error('Veuillez entrer des dates valides.');
      return;
    }
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/Addevent/${idCoproperty}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventForm),
      });
    
      const data = await response.json();
      const newEvent = convertEventToCalendarFormat(data);
      setEvents([...events, newEvent]);
    
      
      toast.success('Event added sucessfuly ! ');
    } catch (error) {
      console.log("Erreur lors de l'ajout de l'événement", error);
    }
    
    setEventForm({
      title: '',
      date_debut: null,
      date_fin: null,
      description: '',
      id_copropriete: idCoproperty,
    });
    setShowAddEvent(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowAddEvent(true);
  };

  const handleInputChange = (event) => {
    setEventForm({
      ...eventForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="relative">
      <ToastContainer /> {/* Composant ToastContainer */}
      {showAddEvent && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed top-0 right-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50">
            <div className="dark:bg-gray-800 w-96 p-8 rounded shadow bg-white">
              <h3 className="text-lg font-bold mb-4 dark:text-white">Add Event</h3>
              <form onSubmit={handleAddEventSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-2 font-medium dark:text-white">
                    Title
                  </label>
                  <input
                    placeholder="title"
                    type="text"
                    id="title"
                    name="title"
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    value={eventForm.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date_debut" className="block mb-2 font-medium dark:text-white">
                  Start date
                  </label>
                  <input
                    type="date"
                    id="date_debut"
                    name="date_debut"
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    value={eventForm.date_debut || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date_fin" className="block mb-2 font-medium dark:text-white">
                  End date
                  </label>
                  <input
                    type="date"
                    id="date_fin"
                    name="date_fin"
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    value={eventForm.date_fin || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block mb-2 font-medium dark:text-white">
                    Description
                  </label>
                  <textarea
                    placeholder="description"
                    id="description"
                    name="description"
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    value={eventForm.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 bg-gray-200 dark:bg-gray-500 dark:text-white py-2 px-4 rounded shadow"
                    onClick={() => setShowAddEvent(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded shadow">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-4 mr-4">
        <button
          className=" bg-indigo-600 text-white py-2 px-4 rounded shadow"
          onClick={() => setShowAddEvent(true)}
        >
          Add event
        </button>
      </div>
      <div className="h-500 mt-12 dark:bg-gray-700 dark:text-white">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'day', 'week', 'agenda']}
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
