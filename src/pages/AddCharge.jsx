import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { MdAdd, MdCancel } from 'react-icons/md';

export default function AddCharge() {
  const { idCoproperty } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [montant, setmontant] = useState("");
  const [month, setmonth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("montant", montant);
      formData.append("month", month);
      formData.append("id_copropriete", idCoproperty);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/charges/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setTitle("");
        setmontant("");
        setmonth("");
        setMessage("Charge added successfully");
        toast.success("Charge added successfully", {
          autoClose: 3000,
          onClose: () => {
            navigate(-1); 
          },
        });
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-xl'>
        <div className="bg-white px-6 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">ADD Charge</h2>
          </div>
          <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  Title
                </label>
                <div className="mt-2.5">
                  <input
                  placeholder='title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    id="title"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="montant" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                Amount
                </label>
                <div className="mt-2.5">
                  <input
                  placeholder='Montant'
                  value={montant}
                  onChange={(e) => setmontant(e.target.value)}
                    type="text"
                    id="montant"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="month" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  Month
                </label>
                <div className="mt-2.5">
                  <select
                  onChange={(e) => setmonth(e.target.value)}
                  value={month}
                    id="month"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                  >
                    
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
              
            </div>
            <div className="flex justify-between mt-10">
  
  <button
    type="button"
    onClick={handleClose}
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <MdCancel className="inline-block mr-2" />
    Cancel
  </button><button
    type="submit"
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <MdAdd className="inline-block mr-2" />
    Add
  </button>
</div>
          </form>
       
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
