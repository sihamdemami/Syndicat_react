import React, { useState } from 'react';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '********',
    profilePicture: 'path/to/profile_picture.jpg'
  });

  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuer ici la logique de mise à jour du profil avec les nouvelles informations
    console.log('Profil mis à jour :', user);
    console.log('Nouveau mot de passe :', newPassword);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <div>
        <img src={user.profilePicture} alt="Profile" />
        <button>Edit Profile Picture</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
