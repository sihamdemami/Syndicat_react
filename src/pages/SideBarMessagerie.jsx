import React, { useEffect, useState } from 'react';

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Faites une requête HTTP GET pour récupérer la liste des utilisateurs depuis l'API
    fetch('http://127.0.0.1:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="sidebar">
      <h2>Utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
