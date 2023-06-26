import React, { useState,useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '.';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';


const TravauxSyndicComponent = ({idCoproperty}) => {
  const { currentColor } = useStateContext();
  const [travaux, setTravaux] = useState([]);
  useEffect(() => {
    // Simulating fetching data from a database or API
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      // Fetch data from your database or API
      // Example:
      const response = await fetch(`http://127.0.0.1:8000/api/demandes-travaux/${idCoproperty}`);
      const data = await response.json();
      setTravaux(data);
    };

    fetchData();
  }, []);

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 h-100">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Added Works</p>
         
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className=" overflow-y-auto h-64">
      {travaux.map((travail) => (
        
        <div key={travail.id} className="flex items-center rounded-md gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer bg-gray-600 shadow-md bg-opacity-10">
        
        <div>
          <p className="font-semibold dark:text-gray-200">{travail.description}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Date fin : {travail.date_creation_demande}</p>

        </div>
      </div>
      
        ))}
        <div className="mt-5">
            <Link to={`/DemandeTravaux/${idCoproperty}`}>
          <Button
            color="white"
            bgColor={currentColor}
            text="See More"
            borderRadius="10px"
            width="full"
          /></Link>
        </div>
      </div>
    </div>
  );
};

export default TravauxSyndicComponent;
