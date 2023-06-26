import React, { useState } from 'react';
import { FiEye, FiPrinter } from 'react-icons/fi';

const TableComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`container mx-auto ${darkMode ? 'dark' : ''}`}>
      <div className="p-8">
        <table className="w-full bg-white dark:bg-gray-100 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Content</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Title 1</td>
              <td className="py-2 px-4">Content 1</td>
              <td className="py-2 px-4">
                <button className="text-blue-500 dark:text-blue-400 mr-2">
                  <FiEye />
                </button>
                <button className="text-green-500 dark:text-green-400">
                  <FiPrinter />
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4">Title 2</td>
              <td className="py-2 px-4">Content 2</td>
              <td className="py-2 px-4">
                <button className="text-blue-500 dark:text-blue-400 mr-2">
                  <FiEye />
                </button>
                <button className="text-green-500 dark:text-green-400">
                  <FiPrinter />
                </button>
              </td>
            </tr>
            {/* Ajoutez d'autres lignes de tableau ici */}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end p-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Mode clair' : 'Mode sombre'}
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
