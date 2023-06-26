import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { MdAdd, MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDocument() {
  const { idCoproperty } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('id_copropriete', idCoproperty);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('document', document);

    axios.post('http://127.0.0.1:8000/api/coproprietes/documents/store', formData)
      .then(response => {
        console.log(response.data);
        setTitle('');
        setDescription('');
        setDocument(null);
        setErrorMessage('');
        toast.success('Document added succesfully !');
      })
      .catch(error => {
       
        console.error(error);
        setErrorMessage('Une erreur est survenue lors de l\'enregistrement du document.');
      });
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div>
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <form onSubmit={handleFormSubmit} className="inline-block align-bottom bg-white dark:bg-secondary-dark-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-secondary-dark-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">Add Document</h3>
                <div className="mt-2">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <div className="sm:col-span-3">
                      <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                        Title
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                          id="title"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                        Description
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          placeholder="Description"
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          id="description"
                          rows={4}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="file" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                        File
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="file"
                          onChange={(event) => setDocument(event.target.files[0])}
                          id="file"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 sm:mt-16">
                    <div className="flex justify-center space-x-4">
                      <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <MdAdd className="mr-2" />
                        Add Document
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <MdCancel className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
