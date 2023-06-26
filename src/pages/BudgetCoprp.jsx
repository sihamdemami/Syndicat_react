import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IDTable = ({ id_copropriete }) => {
  const [Budgets, setBudgets] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const IDsPerPage = 5;
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/budgetsCoproperty/${id_copropriete}`);
        const data = await response.json();
        setBudgets(data);
        console.log(data);
       
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id_copropriete]);

  useEffect(() => {
    setData(Budgets);
  }, [Budgets]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Logic for filtering IDs
  let filteredIDs = [];
  if (Array.isArray(Budgets)) {
    filteredIDs = Budgets.filter((Budget) =>
      Budget.annee && Budget.annee.toString().toLowerCase().includes(search.toLowerCase())
    );
  }

  const indexOfLastID = (currentPage + 1) * IDsPerPage;
  const indexOfFirstID = indexOfLastID - IDsPerPage;
  const currentIDs = filteredIDs.slice(indexOfFirstID, indexOfLastID);

  const totalPages = Math.ceil(filteredIDs.length / IDsPerPage);

  return (
    <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Budgets</div>
      </div>
      <br />
      <br />
      <div className="flex justify-between items-center">
        <input
          className="border border-gray-300 rounded-md py-2 px-4 block mb-4 dark:bg-gray-800 dark:text-gray-200"
          type="text"
          placeholder="Search by Year..."
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 m-16">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal dark:bg-gray-800 dark:text-gray-200">
              <th className="py-3 px-6 text-left">Annual amount</th>
              <th className="py-3 px-6 text-left">Year</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light dark:text-white">
            {currentIDs.map((Budget) => (
              <tr key={Budget.id_copropriete} className="bg-gray-100 dark:bg-gray-700">
                <td className="py-3 px-6 text-left">{Budget.montant_annuel}</td>
                <td className="py-3 px-6 text-left">{Budget.annee}</td>
                <td className="py-3 px-6 text-left">{Budget.description}</td>
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
  );
};

export default IDTable;
