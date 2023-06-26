import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const IDTable = () => {
  const [budgets, setBudgets] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const IDsPerPage = 5;

  const { idCoproperty } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/budgetsCoproperty/${idCoproperty}`);
        const data = response.data;
        setBudgets(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [idCoproperty]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredBudgets = budgets.filter((budget) =>
    budget.annee && budget.annee.toString().toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastID = (currentPage + 1) * IDsPerPage;
  const indexOfFirstID = indexOfLastID - IDsPerPage;
  const currentIDs = filteredBudgets.slice(indexOfFirstID, indexOfLastID);

  const totalPages = Math.ceil(filteredBudgets.length / IDsPerPage);

  return (
    <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Budget</div>
      </div>
      <br />
      <br />
      <div className="flex justify-between items-center">
        <input
          className="border border-gray-300 rounded-md py-2 px-4 block mb-4 dark:bg-gray-800 dark:text-gray-200"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={`/AddBudget/${idCoproperty}`}>
          <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add
          </button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-4 m-16">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal dark:bg-gray-800 dark:text-gray-200">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Annual Amount</th>
              <th className="py-3 px-6 text-left">Year</th>
              <th className="py-3 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light dark:text-white">
            {currentIDs.map((budget) => (
              <tr key={budget.id} className="bg-gray-100 dark:bg-gray-700">
                <td className="py-3 px-6 text-left">{budget.name}</td>
                <td className="py-3 px-6 text-left">{budget.montant_annuel}</td>
                <td className="py-3 px-6 text-left">{budget.annee}</td>
                <td className="py-3 px-6 text-left">{budget.description}</td>
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
