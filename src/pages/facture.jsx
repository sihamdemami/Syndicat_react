import { table } from '@syncfusion/ej2-react-grids';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const YourComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [userId, setUserId] = useState(null);
  const [firstname,setFirstName]=useState('');
  const [lastname,setlastname]=useState('');
  const [email,setemail]=useState('');

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getAllFacture');
        const data = await response.json();
        setTableData(data);
        console.log(tableData)
        setUserId(data[0].id_user); // Utilisez l'ID de la première facture pour récupérer les informations de l'utilisateur
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`);
          const data = await response.json();
          setUserData(data);
          setFirstName(data.firstname);
          setlastname(data.lastname);
          setemail(data.email);
         
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = tableData.filter((data) =>
    data.paid_yn && data.paid_yn.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Factures</div>
       
      </div>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-end mt-12">
            <input
              type="text"
              placeholder="Search by status"
              value={searchTerm}
              onChange={handleSearch}
              className="block py-2 px-3 mr-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm"
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
                  Montant
                </th>
                <th scope="col" className="px-6 py-3">
                  Paid?
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((tableData) => (
                <tr
                  key={tableData.id_facture}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 px-6">
                    <div className="flex items-center">{tableData.id_facture}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="pl-3">
                        <div className="text-base font-semibold">{firstname} {lastname}</div>
                        <div className="font-normal text-gray-500">{email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{tableData.month}</td>
                  <td className="px-6 py-4">{tableData.montant}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          tableData.paid_yn === 'paid' ? 'bg-green-500' : 'bg-red-500'
                        } mr-2`}
                      ></div>
                      {tableData.paid_yn}
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
    </div>
  );
};

export default YourComponent;
