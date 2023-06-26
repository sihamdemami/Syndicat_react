import React, { useState } from 'react';
import axios from 'axios';

const NotificationForm = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send-notification', {
        email,
        description,
        id_evenement: eventId,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to send notification');
    }
  };

  return (
    <div>
      <h1>Send Notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Event ID:</label>
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Notification</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NotificationForm;
