import React, { useState,useEffect } from 'react';
import Coproperty from '../data/image 3.jpg';

import { BsBuilding, BsHouses, BsGeoAlt, BsGlobeAmericas } from 'react-icons/bs';
import { GiModernCity } from 'react-icons/gi';
import { useParams } from 'react-router-dom';

const Copropriete = () => {

  const [coproprietes, setcopropriete] = useState([]);
  const [totalMales, setTotalMales] = useState(0);
  const [totalFemales, setTotalFemales] = useState(0);

  const { idCoproperty } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getAllCoproperty/${idCoproperty}`);
        const data = await response.json();
        setcopropriete(data);
        setTotalMales(data.totalMales); 
        setTotalFemales(data.totalFemales);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [idCoproperty]);

  useEffect(() => {
    setData(coproprietes);
  }, [coproprietes]);
  const [data, setData] = useState(coproprietes);

 
  const [showTooltipMales, setShowTooltipMales] = useState(false);
  const [showTooltipFemales, setShowTooltipFemales] = useState(false);

  const handleTooltipToggleMales = () => {
    setShowTooltipMales(!showTooltipMales);
  };

  const handleTooltipToggleFemales = () => {
    setShowTooltipFemales(!showTooltipFemales);
  };

  return (
     <div className="container mt-20 my-60 antialiased ">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto dark:text-gray-200 dark:bg-gray-500">
          <div className="flex justify-center">
            <img
              src={Coproperty}
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>
          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900 dark:text-black">Coproperty : {coproprietes.name}</h1>

          

            <div className="flex justify-between items-center my-5 px-6  dark:text-white">
            <a
                    onMouseEnter={handleTooltipToggleMales}
                    onMouseLeave={handleTooltipToggleMales}
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-m text-center w-full py-3 dark:text-black"
               >
                 {showTooltipMales ? `Total males: ${totalMales}` : 'Total males'}
             </a>
              <a
                    onMouseEnter={handleTooltipToggleFemales}
                    onMouseLeave={handleTooltipToggleFemales}
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-m text-center w-full py-3 dark:text-black"
               >
                 {showTooltipFemales ? `Total females: ${totalFemales}` : 'Total females'}
             </a>
             
           
            </div>

            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6 dark:text-black">Informations :</h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-m  ">
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsGeoAlt className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Adresse :{coproprietes.adress}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsGlobeAmericas className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Zip Code :{coproprietes.zipcode}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black ">
                  <GiModernCity className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  City :{coproprietes.city}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsHouses className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Number Appartments : {coproprietes.nbr_appartement}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsBuilding className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                 Floors :{coproprietes.etage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copropriete;