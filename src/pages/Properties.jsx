import React, { useState,useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiShow , BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import AddProperty from './AddProperty';
import axios from 'axios';

const Properties = ({idCoproperty}) => {
    const [properties,setProperties]=useState([]);
    useEffect(() => {
      if (idCoproperty) {
        axios
          .get(`http://127.0.0.1:8000/api/getProperty/${idCoproperty}`)
          .then(response => {
            setProperties(response.data);
            
          })
          .catch(error => {
            console.error('Error fetching users:', error);
            console.log(idCoproperty);
          });
      }
    }, [idCoproperty]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertydelete, setSelectedPropertydelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [data, setData] = useState(properties);

  const handleShow = (property) => {
    setSelectedProperty(property);
  };

  const handleClose = () => {
    setSelectedProperty(null);
  };

  const handleDelete = (property) => {
    
    setSelectedPropertydelete(property);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/propertyDelete/${selectedPropertydelete.id}`)
      .then((response) => {
        console.log('Property deleted:', response.data);
        // Update the list of properties by removing the deleted property
        const updatedData = data.filter((item) => item.id !== selectedPropertydelete.id);
        setData(updatedData);
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.error('Error deleting property:', error);
      });
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (

    <>
      <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Properties</div>
          
        </div>
   <br/>
   <br/>
   <div className="flex justify-between items-center">
         
   <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by name"
              className="px-3 py-2.5 rounded-md dark:bg-gray-800 border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex justify-end">
            <Link to={`/AddProperty/${idCoproperty}`}>
              <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add Property
              </button>
            </Link>
          </div>
          </div>
          
          <div className="overflow-auto mt-5" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <table className="table text-gray-400 border-separate space-y-6 text-sm dark:bg-gray-800 w-full rounded-md">
            <thead className="bg-white text-gray-500 dark:bg-gray-800 ">
              <tr>
              
                <th className="p-3 text-left">IdUser</th>
                <th className="p-3 text-left">Num_Appartement</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Monthly amount</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr className="bg-white dark:bg-gray-800" key={property.id}>
                  
                  <td className="p-3">{property.id_user}</td>
                  <td className="p-3">{property.num_appartement}</td>
                  <td className="p-3">{property.firstname}</td>
                  <td className="p-3">{property.lastname}</td>
                  <td className="p-3">{property.email}</td>
                  <td className="p-3">{property.montantmensuel}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-4">
                      <button
                        id = "show"
                        onClick={() => handleShow(property)}
                        className="flex items-center justify-center h-7 w-7 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        <BiShow className="h-4 w-4" />
                      </button>
                      <button
                       id = "delete "
                       onClick={() => handleDelete(property)}
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
          </div>
        
      </div>

      {selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" dark:text-white bg-white p-4 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Selected Property</h2>
            <p>IdUser: {selectedProperty.id_user}</p>
            <p>Num_Appartement: {selectedProperty.num_appartement}</p>
            <p>First Name: {selectedProperty.firstname}</p>
            <p>Last Name: {selectedProperty.lastname}</p>
            <p>Email: {selectedProperty.email}</p>
            <p>Monthly amount: {selectedProperty.montantmensuel}</p>
            <button
              className="block rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 mt-4"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
       {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="dark:text-white bg-white p-4 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p>Are you sure you want to delete this property?</p>
            <div className="flex justify-end mt-4">
              <button
                className="block rounded-md bg-red-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 mr-2"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="block rounded-md bg-gray-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
                
   

     
          

     
   
    </>
  );
};         
 


export default Properties;