import React, { useEffect, useState } from 'react';

const Conversation = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Faites une requête HTTP GET pour récupérer les messages de la conversation depuis l'API
    fetch(`http://127.0.0.1:8000/api/conversations/${conversationId}/messages`)
      .then(response => response.json())
      .then(data => setMessages(data));
  }, [conversationId]);

  return (
    <div className="conversation">
      <h2>Conversation</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
