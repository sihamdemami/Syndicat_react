import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LeafletMap = () => {
  useEffect(() => {
    const locations = [
      {
        latitude: 34.024221911622966, 
        longitude: -5.006472979181445,
        name: 'Rahma',
      },
      {
        latitude: 34.024061,
        longitude:-5.006136,
        name: 'Saada',
      },

      {
        latitude: 34.02427884913746,
        longitude:  -5.006774366926078,
        name: 'Al jawhara',
      },
      {
        latitude: 34.02439490444214, 
        longitude: -5.0089331344386165,
        name: 'Al doha',
      },
      {
        latitude: 34.02465277358196,
        longitude:  -5.007715411604219, 
        name: 'Al rayhane',
      },
    ];

    const ZOOM_LEVEL = 13;
    const map = L.map('map').setView([locations[0].latitude, locations[0].longitude], ZOOM_LEVEL);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    locations.forEach(location => {
      const customIcon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(
          <div>
            <a href="https://mobdie.business.site/" target="_blank" rel="noopener noreferrer">
              <FaMapMarkerAlt className="icon" />
            </a>
            <span className="place-name">{location.name}</span>
          </div>
        ),
      });

      const marker = L.marker([location.latitude, location.longitude], {
        icon: customIcon,
      }).addTo(map);

      marker.on('mouseover', () => {
        const icon = marker.getElement();
        const placeNameElement = icon.querySelector('.place-name');
        placeNameElement.style.display = 'block';
      });

      marker.on('mouseout', () => {
        const icon = marker.getElement();
        const placeNameElement = icon.querySelector('.place-name');
        placeNameElement.style.display = 'none';
      });
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
          color: blue;
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
          color: blue;
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LeafletMap;
