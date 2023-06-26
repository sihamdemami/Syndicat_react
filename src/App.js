import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import AppAdmin from './AppAdmin';
import AppSyndic from './AppSyndic';
import Acceuil from './Acceuill';

import { useStateContext } from './contexts/ContextProvider';

import './App.css';

import Login from './pages/Login';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    userid,
    setUserid,
    isAuthenticated,
    userType,
    setIsAuthenticated,
    setUserType,
  } = useStateContext();
  
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [isAuthenticated]);

  const handleLogin = (email, password) => {
    axios
      .post('http://127.0.0.1:8000/api/login', { email, password })
      .then((response) => {
        setUserType(response.data.role);
        setUserid(response.data.iduser)
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated",true)   
        localStorage.setItem("id",userid) 
        localStorage.setItem("type",userType) 
        // Obtenir les informations utilisateur après la connexion réussie
      })
      .catch((error) => {
        // Gérer les erreurs de connexion
        console.log(error);
        
      });
  };
  
  return (
    <Router>
      <Routes>
      isAuthenticated?(
        <Route
          path="*"
          element={
            localStorage.getItem("type") === 'administrateur' ? (
               <AppAdmin  id_user={userid?userid:localStorage.getItem("id")}/>
              ) : localStorage.getItem("type") === 'membre_syndic' ? (
                <AppSyndic  id_user={userid?userid:localStorage.getItem("id")} />
              ) : (
                <Acceuil id_user={userid?userid:localStorage.getItem("id")} />
             )}/>
       ):(
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/unsupported" element={<div>Unsupported User Type</div>} />)
      </Routes>
    </Router>
  );
};
export default App;
