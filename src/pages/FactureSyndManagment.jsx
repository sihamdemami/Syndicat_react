import React, { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FactureSyndManagment = ({ id_user }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [month, setMonth] = useState('');
  const [message, setMessage] = useState('');
  const [idcoproperty,setid]=useState('');

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleFacturesClick = () => {
   
    console.log('Le bouton Factures a été cliqué !');
  };

  const handleGenererFacturesClick = () => {
   
    console.log('Le bouton Générer les factures a été cliqué !');
    setShowForm(true);
  };

  const handleCloseClick = () => {
    
    setShowForm(false);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getCoproperty/${id_user}`)
      .then(response => {
      console.log(response.data);
      setid(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching coproprietes:', error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('month', selectedMonth);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/notifications/facture/${idcoproperty}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setMonth('');
        console.log(idcoproperty)
        toast.success("Facture Added successfully");
        setSelectedMonth(''); 
      } else {
        setMessage('Some error occurred');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Link to="/Facture/Archives">
        <button
          onClick={handleFacturesClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Factures
        </button>
      </Link>

      <button
        onClick={handleGenererFacturesClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Generate factures
      </button>

      {showForm && (
        <div className="container mt-20 my-60 antialiased ">
          {/* The form */}
          <div>
            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto dark:text-gray-200 dark:bg-gray-500">
              <div className="mt-16">
                <div className="dark:bg-gray-800 bg-white rounded-md p-4 shadow-lg dark:text-white">
                  <h1 className="font-bold text-center text-3xl text-gray-900 dark:text-black">
                  Inform Owners Form 
                  </h1>
                  <form onSubmit={handleSubmit} className="  mt-5 max-w-xl">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="month"
                          className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                        >
                          Month
                        </label>
                        <div className="mt-2.5">
                          <select
                            required
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            name="month"
                            id="month"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                          >
                            <option value="">select Month</option>
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
                    <div className="mt-10 flex justify-end">
                      <button
                        type="submit"
                        className="block rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                      >
                        Send
                      </button>
                      <button
                        type="button"
                        className="block rounded-md bg-gray-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 ml-2"
                        onClick={handleCloseClick} 
                      >
                        Close
                      </button>
                    </div>
                   
                  </form>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactureSyndManagment;
