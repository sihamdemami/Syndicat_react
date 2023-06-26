import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd, MdCancel } from 'react-icons/md';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddBudget() {
  const navigate = useNavigate();

  const { idCoproperty } = useParams();

  const [message, setMessage] = useState("");

  const [montant_annuel, setmontantannuel] = useState("");
  const [annee, setannee] = useState("");
  const [description, setdescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!annee) {
      toast.error("Please select a year");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("montant_annuel", montant_annuel);
      formData.append("annee", annee);
      formData.append("description", description);
      formData.append("id_coproprietee", idCoproperty);

      const response = await axios.post("http://127.0.0.1:8000/api/budgets/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setmontantannuel("");
        setannee("");
        setdescription("");

        toast.success("Budget added successfully", {
          autoClose: 3000,
          onClose: () => {
            navigate(-1);
          }
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
    <div className='mx-auto w-full max-w-xl'>
    <div className=" bg-white px-6  sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg h-600">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">ADD BUDGET</h2>
      
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20"  onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        
          <div className="sm:col-span-2">
            <label htmlFor="montantAnnuel" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
           Annual Amount 
            </label>
            <div className="mt-2.5">
              <input
              value={montant_annuel}
               onChange={(e) => setmontantannuel(e.target.value)}
               placeholder='Montant Annuel'
               type="text"
               id="montantAnnuel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="year" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
              Year
            </label>
            <div className="mt-2.5">
              <select
              onChange={(e) => setannee(e.target.value)}
              value={annee}
                id="annee"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              >
                 <option value="">Sélectionnez une année</option>
                {Array.from({ length: 11 }, (_, i) => 2030 - i).map((year) => (
                  <option key={year} value={year}  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="Description" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
              Description
            </label>
            <div className="mt-2.5">
              <textarea
              onChange={(e) => setdescription(e.target.value)}
              value={description}
                placeholder='Description'
                name="Description"
                id="Description"
                autoComplete="Description"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
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
    <ToastContainer /></div>
  );
}
