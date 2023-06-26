import React, { useState ,useEffect} from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { RiUserLine } from 'react-icons/ri';
import { HiLocationMarker } from 'react-icons/hi';
import { FaMapMarkerAlt, FaBuilding, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoMdBusiness, IoMdCalendar, IoMdTransgender } from 'react-icons/io';

import ReactPaginate from 'react-paginate';
import axios from 'axios';

const Customers = () => {

   const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/usersSyndic')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [birthday, setBirthday] = useState('');
  const [editedUser, setEditedUser] = useState(users);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState(users);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItemValue, setEditedItemValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = user => {
    setEditedUser(user);
  };

  const onSaveChanges = user => {
    // Envoyer les modifications au serveur
    axios
      .put(`http://127.0.0.1:8000/api/users/update/${user.id}`, user)
      .then(response => {
        console.log('User updated:', response.data);
        // Mettre à jour la liste des utilisateurs avec les modifications
        const updatedUsers = users.map(u => (u.id === user.id ? user : u));
        setUsers(updatedUsers);
        setEditedUser(null);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  

  
  const handleSaveClick = () => {
    onSaveChanges(editedUser);
  };

  const handleInputChange = (e) => {
    setEditedItemValue(e.target.value);
  };

  const handleSaveChanges = () => {
    alert('Les modifications ont été enregistrées avec succès !');
  };

  const handleDelete = (id_user) => {
    setSelectedUser(id_user);
    setShowConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
    
    if (!selectedUser) {
      return;
    }
  
    axios.delete(`http://127.0.0.1:8000/api/users/delete/${selectedUser}`)
      .then(response => {
        console.log('User deleted:', response.data);
        // Mettre à jour la liste des utilisateurs en supprimant l'utilisateur supprimé
        const updatedData = data.filter(item => item.id !== selectedUser);
        setData(updatedData);
        setShowConfirmation(false);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  
  
  
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleView = (userId) => {
    const user = users.find((user) => user.id_user === userId);
    if (user) {
      setSelectedUser(user);
      setShowUserProfile(true);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const IDsPerPage = 5;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [search, setSearch] = useState('');
  const filteredIDs = users.filter((user) =>
    user.firstname.toLowerCase().includes(search.toLowerCase()) ||
    user.lastname.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastID = (currentPage + 1) * IDsPerPage;
  const indexOfFirstID = indexOfLastID - IDsPerPage;
  const currentIDs = filteredIDs.slice(indexOfFirstID, indexOfLastID);

  const totalPages = Math.ceil(filteredIDs.length / IDsPerPage);

  return (
    <>
      <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Users</div>
        </div>
        <br />
        <br />
        <div className="flex justify-between items-center">
          <Link to="/AddUser">
            <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add
            </button>
          </Link>
          <input
            type="text"
            className="w-46 h-12 rounded focus:outline-none px-3 focus:shadow-md dark:bg-gray-600 dark:text-white"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-auto mt-5">
          <table className="table text-gray-400 border-separate space-y-6 text-sm dark:bg-gray-800 w-full rounded-md">
            <thead className="bg-white text-gray-500 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">CIN</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentIDs.map((user) => (
                <tr className="bg-white dark:bg-gray-800" key={user.id_user}>
                  <td className="p-3">{user.firstname}</td>
                  <td className="p-3">{user.lastname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.CIN}</td>
                  <td className="p-3">{user.phonenumber}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleView(user.id_user)}
                        className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        <BiShow className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id_user)}
                        className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-red-500 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                      >
                        <AiOutlineDelete className="h-4 w-4" />
                      </button>
                   
                      <Link to={`/edit/${user.id_user}`} className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700">
  <AiOutlineEdit className="h-4 w-4" />
</Link>


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

      {showConfirmation && selectedUser &&(
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div
              className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AiOutlineDelete className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                      id="modal-headline"
                    >
                      Delete client ?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to remove this client? This action is irreversible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
  <div className="max-w-3xl w-300">
    <div className="bg-white px-8 py-8 sm:py-4 rounded-md lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">
          User Information
        </h2>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-4">
          <label htmlFor="firstName" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <RiUserLine className="inline-block mr-2 text-lg" />
            First Name
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.firstname}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="lastName" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <RiUserLine className="inline-block mr-2 text-lg" />
            Last Name
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.lastname}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="email" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <MdEmail className="inline-block mr-2 text-lg" />
            Email
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.email}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="cin" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <RiUserLine className="inline-block mr-2 text-lg" />
            CIN
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.CIN}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="phoneNumber" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <FaPhone className="inline-block mr-2 text-lg" />
            Phone Number
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.phonenumber}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="birthday" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <IoMdCalendar className="inline-block mr-2 text-lg" />
            Birthday
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.birthday}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="gender" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <IoMdTransgender className="inline-block mr-2 text-lg" />
            Gender
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.genre}
          </span>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="role" className="flex items-center mr-4 text-sm font-medium text-gray-500 dark:text-gray-200">
            <IoMdBusiness className="inline-block mr-2 text-lg" />
            Role
          </label>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            {selectedUser.role}
          </span>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowUserProfile(false)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
      )}
 

     
   
    </>
  );
};         
 


export default Customers;
