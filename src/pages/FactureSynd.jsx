import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const FactureSynd = ({ idCoproperty }) => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermMonth, setSearchTermMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch table data from the backend
    const fetchTableData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/facturePayeNot/${idCoproperty}`);
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.error('Failed to fetch table data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchTableData();
  }, [idCoproperty]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchMonth = (event) => {
    setSearchTermMonth(event.target.value);
    setCurrentPage(1);
  };

  const handlePayClick = async (id) => {
    try {
      // Update the paid status in the backend
      const response = await fetch(`http://127.0.0.1:8000/api/facture/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paid_yn: 'paid' }),
      });
      if (!response.ok) {
        console.error('Failed to update paid status:', response.status);
        return;
      }

      // Update the paid status in the local table data
      const updatedData = tableData.map((item) =>
        item.id_facture === id ? { ...item, paid_yn: 'paid' } : item
      );
      setTableData(updatedData);
    } catch (error) {
      console.error('Error updating paid status:', error);
    }
  };




  const offset = (currentPage - 1) * itemsPerPage;



  const filteredItems = tableData.filter((data) =>
  (data.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
  data.month.toLowerCase().includes(searchTermMonth.toLowerCase())
);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected + 1);
  };

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex justify-end mt-12">
          <input
            type="text"
            placeholder="Search by name or last name"
            value={searchTerm}
            onChange={handleSearch}
            className="block py-2 px-3 mr-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm"
          />
          <input
            type="text"
            placeholder="Search by month"
            value={searchTermMonth}
            onChange={handleSearchMonth}
            className="block py-2 px-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <table className="rounded-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Month
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Paid?
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 px-6">
                  <div className="flex items-center">{row.id_facture}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="pl-3">
                      <div className="text-base font-semibold">{row.firstname} {row.lastname}</div>
                      <div className="font-normal text-gray-500">{row.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{row.month}</td>
                <td className="px-6 py-4">{row.montant}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        row.paid_yn === 'paid' ? 'bg-green-500' : 'bg-red-500'
                      } mr-2`}
                    ></div>
                    {row.paid_yn}
                    {row.paid_yn === 'nopaid' && (
                      <button
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => handlePayClick(row.id_facture)}
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            breakClassName="inline-block px-2 py-2 text-sm text-gray-500 dark:text-gray-400"
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            pageClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            activeClassName="text-blue-500"
            previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
            disabledClassName="text-gray-300 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default FactureSynd;
