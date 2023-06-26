import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LeafletMap = () => {
  useEffect(() => {
    const LATITUDE = 34.024221911622966; // Exemple : Londres
    const LONGITUDE = -5.006472979181445; // Exemple : Londres
    const ZOOM_LEVEL = 13;
    const map = L.map('map').setView([LATITUDE, LONGITUDE], ZOOM_LEVEL);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Définition de l'icône personnalisée
    const customIcon = L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(
        <div>
          <a href="https://mobdie.business.site/" target="_blank" rel="noopener noreferrer">
            <FaMapMarkerAlt className="icon" />
          </a>
          <span className="place-name">Mobdie</span>
        </div>
      ),
    });

    // Ajouter un marqueur à l'emplacement spécifié avec l'icône personnalisée
    const marker = L.marker([LATITUDE, LONGITUDE], {
      icon: customIcon,
    }).addTo(map);

    // Événement de survol sur le marqueur pour afficher le nom de la place
    marker.on('mouseover', () => {
      const placeName = 'Mobdie'; // Remplacez par le nom réel de la place
      const icon = marker.getElement();
      const placeNameElement = icon.querySelector('.place-name');
      placeNameElement.textContent = placeName;
      placeNameElement.style.display = 'block';
    });

    // Événement de sortie du survol sur le marqueur pour masquer le nom de la place
    marker.on('mouseout', () => {
      const icon = marker.getElement();
      const placeNameElement = icon.querySelector('.place-name');
      placeNameElement.style.display = 'none';
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%', marginTop: '20px' }}></div>

      <style jsx>{`
        .custom-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: bleu;
        }

        .custom-icon .icon {
          font-size: 20px;
        }

        .custom-icon .place-name {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          font-weight: bold;
          color: bleu;
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LeafletMap;
