import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';

import AppCoproprietaire from './AppCoproprietaire';
import video from './data/vid001.mp4';
 // Importer le fichier CSS pour les styles spécifiques à HomePage

  const HomePage = ({id_user}) => {
  const [showPage, setShowPage] = useState(false);
  const {isAuthenticated} = useStateContext();
  
  const handleConsulterPlus = () => {
    // Rediriger vers la page "AppCoproprietaire" lorsque le bouton "Consulter plus" est cliqué
    setShowPage(true);
  };

  if (!showPage) {
    return (
      localStorage.getItem("isAuthenticated")?(
      <div className="relative h-screen">
        <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover">
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 card-container">
          <div className="card">
            <h1 className="text-xl font-bold mb-4 text-white">Bienvenue</h1>
           
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleConsulterPlus}>
              Consulter plus
            </button>
          </div>
        </div>
      </div>
     ):<Navigate to="/login" replace />

    );
  }

  // Rediriger vers la page "AppCoproprietaire" directement sans afficher cette page intermédiaire
  return <AppCoproprietaire id_user={id_user} />;
};

export default HomePage;