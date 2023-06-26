import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { RiUserLine } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import { FaMapMarkerAlt, FaBuilding, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoMdBusiness } from 'react-icons/io';
import ReactPaginate from 'react-paginate';

const Coproperty = () => {


  const [copropertyData, setCopropertydata] = useState([]);
 
  const [editMode, setEditMode] = useState(false); // État pour activer/désactiver le mode d'édition
  const [syndicList, setSyndicList] = useState([]); // Liste des syndics
  const [selectedSyndic, setSelectedSyndic] = useState(''); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getAllCoproperty');
        const data = await response.json();
        setCopropertydata(data);



      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const IDsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = copropertyData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase())

  );

  const totalPages = Math.ceil(filteredUsers.length / IDsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastID = (currentPage + 1) * IDsPerPage;
  const indexOfFirstID = indexOfLastID - IDsPerPage;
  const currentIDs = filteredUsers.slice(indexOfFirstID, indexOfLastID);


  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // Ajout de l'état pour l'ID de l'utilisateur en cours de modification
  const [data, setData] = useState(copropertyData);


  const handleDelete = (id) => {
    setSelectedUser(id);
    setShowConfirmation(true);
  };


  const handleConfirmDelete = () => {

    if (!selectedUser) {
      return;
    }

    axios.delete(`http://127.0.0.1:8000/api/coproperty/delete/${selectedUser}`)
      .then(response => {
        console.log('User deleted:', response.data);
        // Mettre à jour la liste des utilisateurs en supprimant l'utilisateur supprimé
        const updatedData = data.filter(item => item.id !== selectedUser);
        setCopropertydata(updatedData);
        setShowConfirmation(false);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };




  const handleView = (id_copropriete) => {
    const user = currentIDs.find((user) => user.id_copropriete === id_copropriete);
    if (user) {
      setSelectedUser(user);
      console.log(id_copropriete);
      setShowUserProfile(true);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getAllCoproperty');
        const data = await response.json();
        setCopropertydata(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    // Effectuez votre appel API pour récupérer les numéros d'appartement en utilisant le code PHP
    // Utilisez une méthode appropriée pour effectuer l'appel API, comme fetch() ou axios

    const fetchNameSyndic = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getUsersWithRoleAndNotInCopropriete`);
        const data = await response.json();
        console.log(data);
        const syndicList = Object.values(data);
        setSyndicList(syndicList);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des numéros d\'appartement :', error);
      }
    };

    fetchNameSyndic();
  }, []);

  const handleEdit = (id_copropriete) => {
    const user = currentIDs.find((user) => user.id_copropriete === id_copropriete);
    
    if (user) {
      setSelectedUser(user);
    
     setEditMode(true);
    }
   
  };

  const handleSave = () => {
    if (!selectedUser) {
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/api/updateCopropriete/${selectedUser.id_copropriete}`, {
        email: selectedSyndic,
     

      })
      .then((response) => {
        console.log('User updated:', response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <>
    <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Coproperties</div>
        <Link to="/AddCoproperty">
          <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add
          </button>
        </Link>

      </div>
      <br></br>
      <input
        type="text"
        className="w-46 h-12 rounded focus:outline-none px-3 focus:shadow-md dark:bg-gray-600 dark:text-white "
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />


      <div className="overflow-auto mt-5">
        <table className="table text-gray-400 border-separate space-y-6 text-sm dark:bg-gray-800 w-full">
          <thead className="bg-white text-gray-500 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left"> ID</th>
              <th className="p-3 text-left"> Name</th>
              <th className="p-3 text-left">Adress</th>
              <th className="p-3 text-left">Zip Code</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Appartements</th>
              <th className="p-3 text-left">Floors</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentIDs.map((user) => (
              <tr className="bg-white dark:bg-gray-800" key={user.id_copropriete}>
                <td className="p-3">{user.id_copropriete}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.adress}</td>
                <td className="p-3">{user.zip_code}</td>
                <td className="p-3">{user.city}</td>
                <td className="p-3">{user.nbr_appartement}</td>
                <td className="p-3">{user.etage}</td>

                <td className="p-3">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleView(user.id_copropriete)}
                      className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                      <BiShow className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(user.id_copropriete)}
                      className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
                    >
                      <AiOutlineEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id_copropriete)}
                      className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-red-500 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                    >
                      <AiOutlineDelete className="h-4 w-4" />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex justify-center space-x-2 dark:bg-gray-800 dark:text-gray-200'}
          activeClassName={'active'}
        />
      </div>
    </div>

      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AiOutlineDelete className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Remove coproperty
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to remove this coproperty?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

{showUserProfile && selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex justify-center items-center z-50">
          <div className="max-w-md">
            <div className="bg-white px-6 py-8 sm:py-4 rounded-md lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-200">
                  Coproperty Information
                </h2>
              </div>
              <div className="w-full mt-6 flex">
                <div className="w-1/2 pr-4">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-200">
                    <RiUserLine className="inline-block mr-2 text-lg" />
                    Name
                  </label>
                  <span className="block text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {selectedUser.name}
                  </span>
                </div>
                <div className="w-1/2 pl-4">
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-200">
                    <HiLocationMarker className="inline-block mr-2 text-lg" />
                    Address
                  </label>
                  <span className="block text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {selectedUser.adress}
                  </span>
                </div>
              </div>
              <div className="w-full mt-4 flex">
                <div className="w-1/2 pr-4">
                  <label htmlFor="zip_code" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-200">
                    <FaMapMarkerAlt className="inline-block mr-2 text-lg" />
                    Zip Code
                  </label>
                  <span className="block text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {selectedUser.zip_code}
                  </span>
                </div>
                <div className="w-1/2 pl-4">
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-200">
                    <FaBuilding className="inline-block mr-2 text-lg" />
                    City
                  </label>
                  <span className="block text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {selectedUser.city}
                  </span>
                </div>
              </div>
              <div className="w-full mt-4 flex">
                <div className="w-1/2 pr-4">
                  <label htmlFor="nbr_appartement" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-200">
                    <IoMdBusiness className="inline-block mr-2 text-lg" />
                    Appartements
                  </label>
                  <span className="block text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {selectedUser.nbr_appartement}
                  </span>
                </div>
                <div className="w-1/2 pl-4">
                  <label htmlFor="etage" className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-200">
                    <HiLocationMarker className="inline-block mr-2 text-lg" />
                    Floors
                  </label>
                  <span className="block text-lg font-semibold text-gray-900 dark:text-gray-200">
                    {selectedUser.etage}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowUserProfile(false)}
                  className="block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  Close
                </button>
              </div>
            </div>

          </div></div>



      )}


      {editMode && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AiOutlineEdit className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Modifier le syndic
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm">Sélectionnez un syndic:</p>
                      <select
                        className="border border-gray-300 rounded-md py-2 px-4 mt-1 block w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedSyndic}
                        onChange={(e) => setSelectedSyndic(e.target.value)}
                      >
                        <option> Select Syndic </option>
                        {syndicList.map((syndic) => (
                          <option key={syndic.id} value={`${syndic.email} `}>
                            {`${syndic.email}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
   
    </>
  );
};

export default Coproperty;