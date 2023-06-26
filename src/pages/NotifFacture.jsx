import React, { useState, useEffect } from 'react';

function BoiteMail() {
  const [users, setUsers] = useState([]);
  const [factures, setFactures] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedFacture, setSelectedFacture] = useState('');
  const [message, setMessage] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    // Fetch users with role 'coproprietaire'
    fetch('http://127.0.0.1:8000/api/users/coproprietaire')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));

    // Fetch unpaid factures
    fetch('http://127.0.0.1:8000/api/factures/unpaid')
      .then((response) => response.json())
      .then((data) => setFactures(data))
      .catch((error) => console.log(error));
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleFactureChange = (e) => {
    setSelectedFacture(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendNotification = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: selectedUser,
          facture_id: selectedFacture,
          message: message,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotificationSent(true);
      } else {
        throw new Error('Erreur lors de la requête à l\'API');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <h1>Boîte Mail</h1>
      {notificationSent && <p>Notification sent successfully!</p>}
      <div>
        <label htmlFor="user-select">Select User:</label>
        <select id="user-select" onChange={handleUserChange}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} 
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="facture-select">Select Unpaid Facture:</label>
        <select id="facture-select" onChange={handleFactureChange}>
          <option value="">Select a facture</option>
          {factures.map((facture) => (
            <option key={facture.id} value={facture.id}>
              Facture #{facture.id_facture} - Montant: {facture.montant}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message-input">Message:</label>
        <textarea
          id="message-input"
          rows="4"
          cols="50"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
      </div>
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
}

export default BoiteMail;
