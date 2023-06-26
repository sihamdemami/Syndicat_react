import React, { useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

const MyDocument = () => {
  const [pdfData] = useState([
    {
      title: 'Apple MacBook Pro 17"',
      description: 'Silver',
      content: 'Laptop',
    },
    {
      title: 'Microsoft Surface Pro',
      description: 'White',
      content: 'Laptop PC',
    },
    {
      title: 'Magic Mouse 2',
      description: 'Black',
      content: 'Accessories',
    },
    {
      title: 'Apple Watch',
      description: 'Black',
      content: '$199',
    },
    {
        title: 'Apple MacBook Pro 17"',
        description: 'Silver',
        content: 'Laptop',
      },
      {
        title: 'Microsoft Surface Pro',
        description: 'White',
        content: 'Laptop PC',
      },
      {
        title: 'Magic Mouse 2',
        description: 'Black',
        content: 'Accessories',
      },
      {
        title: 'Apple Watch',
        description: 'Black',
        content: '$199',
      },
      {
        title: 'Apple MacBook Pro 17"',
        description: 'Silver',
        content: 'Laptop',
      },
      {
        title: 'Microsoft Surface Pro',
        description: 'White',
        content: 'Laptop PC',
      },
      {
        title: 'Magic Mouse 2',
        description: 'Black',
        content: 'Accessories',
      },
      {
        title: 'Apple Watch',
        description: 'Black',
        content: '$199',
      },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = pdfData.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-20 pl-4 pr-4 pl-5">
      <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Documents</div>
         
            <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add
            </button>
      
        </div>
        <br/>
        <br/>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 dark:text-white"
        />
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-3 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.title}
              </td>
              <td className="px-6 py-4">{data.description}</td>
              <td className="px-6 py-4">{data.content}</td>
              <td className="px-8 py-4">
                <button
                  className="text-green-500 dark:text-green-400"
                  onClick={() => handlePrint()}
                >
                  <FiPrinter />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'none' }}>
        {filteredData.map((data, index) => (
          <div key={index} ref={componentRef}>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>{data.content}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {/* Bouton précédent */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Previous
          </button>

          {/* Boutons de page */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === index + 1 ? 'text-blue-500' : 'text-gray-700 dark:text-gray-400'} hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600`}
            >
              {index + 1}
            </button>
          ))}

          {/* Bouton suivant */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </nav>
      </div>
    </div></div>
  );
};

export default MyDocument;
