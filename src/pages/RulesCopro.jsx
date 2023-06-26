import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '../components';

const YourComponent = ({id_copropriete}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getRulesByCoproprieteId/${id_copropriete}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessageId(messageId);
    setShowOverlay(true);
  };

  const handleClose = () => {
    setSelectedMessageId(null);
    setShowOverlay(false);
  };

  const selectedMessage = messages.find((message) => message.title === selectedMessageId);

  const filteredMessages = messages.filter((message) =>
    message.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 h-screen bg-gray-100 dark:bg-gray-800 px-2">
      <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Rules</div>
         
          
        </div>

        <div className="md:flex h-full w-full">
          <div className="w-full p-4 h-[400px]">
            <div className="relative">
              <input
                type="text"
                className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md dark:bg-gray-600 dark:text-white"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>
            </div>
            <div className="h-full overflow-y-auto">
              <ul role="list" className="divide-y divide-gray-300">
                {filteredMessages.map((message, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white dark:bg-gray-600 mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition"
                    onClick={() => handleSelectMessage(message.title)}
                  >
                    <div className="flex ml-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400">
                        {message.icon}
                      </div>
                      <div className="flex flex-col ml-2">
                        <span className="font-medium text-black dark:text-white">{message.title}</span>
                        <span className="text-sm text-gray-400 dark:text-gray-300 truncate  w-32">
                          {message.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-300 dark:text-gray-500">{message.created_at}</span>
                      <i className="fa fa-star text-green-400"></i>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {showOverlay && selectedMessageId && (
            <div
              className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 w-88   "
              onClick={handleClose}
            >
              <div className="bg-white p-4 rounded max-w-md  dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg dark:text-gray-200">
                    {messages.find((message) => message.title === selectedMessageId).title}
                  </p>
                  <Button
                    icon={<MdOutlineCancel />}
                    color="rgb(153, 171, 180)"
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="50%"
                    onClick={handleClose}
                  />
                </div>
                <br />

                <div className="text-gray-400 dark:text-gray-500 lowercase text-center">
                  {messages.find((message) => message.title === selectedMessageId).description}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
