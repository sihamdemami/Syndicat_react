import React, { useState, useEffect } from 'react';
import { MdOutlineCancel, MdAdd, MdCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'; // Import the moment library
import { Button } from '../components';

const Kanban = ({ idCoproperty, id_user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateDebut, setSelectedDateDebut] = useState('');
  const [selectedDateFin, setSelectedDateFin] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [travauxList, setTravauxList] = useState([]);
  const [id,setid]=useState('');
  const [filteredTravauxList, setFilteredTravauxList] = useState([]);
  useEffect(() => {
    const fetchTravauxData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/demandes-travaux/${idCoproperty}`);
        const data = await response.json();
        setTravauxList(data);
        setFilteredTravauxList(data);
        console.log(data);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données des travaux.", error);
      }
    };

    fetchTravauxData();
  }, [idCoproperty]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm) {
      const filteredTravaux = travauxList.filter((travail) => {
        const travailDate = moment(travail.date_creation_demande, 'YYYY-MM-DD');
        const selectedDate = moment(searchTerm, 'YYYY-MM-DD');
        return travailDate.isSame(selectedDate, 'day');
      });
      setFilteredTravauxList(filteredTravaux);
    } else {
      setFilteredTravauxList(travauxList);
    }
  };

  const handleDateDebutChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDateDebut(selectedDate);
  };

  const handleDateFinChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDateFin(selectedDate);
  };

  const handleItemClick = (travail) => {
    setSelectedItem(travail);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handleAddTravail = async (e) => {
    e.preventDefault();

    if (!selectedItem) {
      console.error("Aucun travail n'est sélectionné");
      return;
    }
  
    
    handleItemClick(selectedItem);
  
    const startDate = moment(selectedDateDebut, 'YYYY-MM-DD');
    const endDate = moment(selectedDateFin, 'YYYY-MM-DD');
    const currentDate = moment().startOf('day');
    
    if (!startDate.isValid() || !endDate.isValid() || startDate.isBefore(currentDate) || startDate.isAfter(endDate) || endDate.isBefore(startDate)) {
      toast.error('Veuillez entrer des dates valides.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const data = {
      id_demande: selectedItem.id_demande_travaux,
      description: selectedItem.description,
      date_debut: selectedDateDebut,
      date_fin: selectedDateFin
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/Addtravaux/${idCoproperty}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setDescription('');
      setSelectedDateDebut('');
      setSelectedDateFin('');
      setSuccessMessage('New work added succesfully.');
      console.log(selectedItem.id_demande_travaux);

     
      toast.success("New work added succesfully.");

      handleClose();
    } catch (error) {
      console.error("Une erreur s'est produite lors de la communication avec l'API.", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full h-86 p-4 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Added Works</h2>
        </div>
        <div className="mb-4">
          <input
           value={searchTerm}
           onChange={handleSearch}
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          <ul role="list" className="divide-y divide-gray-300">
          {filteredTravauxList.map((travail) => (
              <li
                key={travail.id_demande_travaux}
                className="flex justify-between gap-x-6 py-5 dark:text-white cursor-pointer"
                onClick={() => handleItemClick(travail)}
              >
                <div className="flex gap-x-4">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Name : {travail.firstname} {travail.lastname}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Num Apartment : {travail.num_appartement}
                  </p>
                  <p className="mt-1 truncate text-s leading-5 text-gray-900 dark:text-white">
                    Description : {travail.description}
                  </p>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900 dark:text-white">
                    Added : {travail.date_creation_demande}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center justify-center h-screen rounded-md">
            <div className="w-full max-w-xl rounded-md">
              <div className="bg-white px-6 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-md">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">
                    Add new Work
                  </h2>
                </div>
                <form
                  action="#"
                  method="POST"
                  className="mx-auto mt-16 max-w-xl sm:mt-20"
                  onSubmit={handleAddTravail}
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="title"
                        className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        Start date
                      </label>
                      <div className="mt-2.5">
                        <input
                          placeholder=""
                          type="date"
                          value={selectedDateDebut}
                          onChange={(e) => setSelectedDateDebut(e.target.value)}
                          id="title"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="montant"
                        className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        End Date
                      </label>
                      <div className="mt-2.5">
                        <input
                          placeholder=""
                          type="date"
                          value={selectedDateFin}
                          onChange={(e) => setSelectedDateFin(e.target.value)}
                          id="montant"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        Description
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          placeholder=""
                          value={selectedItem.description}
                          onChange={handleDescriptionChange}
                          id="description"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 sm:mt-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <button
                        type="submit"
                        className="w-full py-3 text-sm font-medium leading-5 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:bg-indigo-700 bg-gray-500"
                      >
                        Add
                      </button>
                      <button
                        className="w-full py-3 text-sm font-medium leading-5 text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red dark:bg-red-600 dark:hover:bg-red-500 dark:focus:bg-red-700"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div> <ToastContainer position="bottom-right" />
            </div>
          </div>
        </div>
      )}
     
        
  
    </div>
  );
};

export default Kanban;
