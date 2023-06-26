import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '../components';

const Kanban = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/gettravaux');
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  const handleItemClick = (person) => {
    setSelectedItem(person);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const filteredPeople = people.filter((person) => {
    const idMatch = person.id.toString().includes(searchTerm);
    const personDate = person.date_debut ? new Date(person.date_debut.split('-').reverse().join('-')) : null;
    const selectedDateTime = selectedDate ? new Date(selectedDate) : null;
    const dateMatch = !selectedDate || (personDate && personDate >= selectedDateTime);
    return idMatch && dateMatch;
  });

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full h-86 p-4 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Travaux en cours</h2>
        </div>
        <div className="mb-4">
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:text-white"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          <ul role="list" className="divide-y divide-gray-300">
            {filteredPeople.map((person) => (
              <li
                key={person.id}
                className="flex justify-between gap-x-6 py-5 dark:text-white"
                onClick={() => handleItemClick(person)}
              >
                <div className="flex gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Date début {person.date_debut}
                  </p>
                  <p className="mt-1 truncate text-s leading-5 text-gray-900 dark:text-white">
                    Description {person.description}
                  </p>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900 dark:text-white">
                    Date fin {person.date_fin}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
          <div className="bg-white dark:bg-gray-700 dark:text-white p-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg dark:text-gray-200">Travail : {selectedItem.id}</p>
              <Button
                icon={<MdOutlineCancel />}
                color="rgb(153, 171, 180)"
                bgHoverColor="light-gray"
                size="2xl"
                borderRadius="50%"
                onClick={handleClose}
              />
            </div>
            <p>Date début: {selectedItem.date_debut}</p>
            <p>Date fin: {selectedItem.date_fin}</p>
            <p>Date prévision fin: {selectedItem.date_previson_fin}</p>
            <p>Description: {selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
