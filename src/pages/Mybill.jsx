import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbHexagonNumber1, TbHexagonNumber2, TbHexagonNumber3, TbHexagonNumber4 } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Logo from '../data/Logo.png';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '../components';
import { BiCalendarAlt, BiDollar, BiUser } from 'react-icons/bi';

const Mybill = ({ userType, firstname, lastname, email, phoneNumber, birthday, genre, image, id_user }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/facture/${id_user}`).then(response => {
      // Mise à jour de l'état avec les données reçues
      setData(response.data.factures);
    }).catch(error => {
      // Gérer les erreurs de requête
      console.error(error);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const createInvoiceData = (message) => {
    let invoiceData = `month: ${message.month}\n`;
    invoiceData += `First Name: ${firstname}\n`;
    invoiceData += `Last Name: ${lastname}\n`;
    invoiceData += `montantFacture: ${message.montant}\n`;
    invoiceData += `Payment Date: ${message.updated_at}\n`;

    return invoiceData;
  };

  const handleSelectMessage = (messageId) => {
    const selectedMessage = data.find((message) => message.id_facture === messageId);
    setSelectedMessage(selectedMessage);
    setShowOverlay(true);
  };

  const handleClose = () => {
    setShowOverlay(false);
    setSelectedMessageId(null);
  };

  const handlePrint = () => {
    if (selectedMessage) {
      const doc = new jsPDF();
  
      // Logo de la société
      const logo = new Image();
      logo.src = Logo; // Remplacez 'Logo' par le chemin vers votre image de logo
      logo.addEventListener('load', () => {
        const logoWidth = 50;
        const logoHeight = 50;
        const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2; // Centrer le logo horizontalement
        const logoY = 20;
        const logoRadius = 5; // Rayon arrondi du logo
        doc.roundedRect(logoX, logoY, logoWidth, logoHeight, logoRadius, logoRadius, 'S');
        doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
        // Informations utilisateur
        const userInfo = [
          { label: 'First Name:', value: firstname },
          { label: 'Last Name:', value: lastname },
          { label: 'Email:', value: email },
          { label: 'Number:    ', value: phoneNumber },
          { label: 'Gender:', value: genre },
          { label: 'Birthday:', value: birthday },
        ];
        const userInfoX = 20;// Position horizontale des informations utilisateur
        const userInfoY = logoY + logoHeight + 10; // Position verticale des informations utilisateur
        const userInfoSpacing = 5; // Espacement vertical entre chaque information
        userInfo.forEach((info, index) => {
          doc.setFontSize(10);
          doc.text(info.label, userInfoX, userInfoY + index * userInfoSpacing, { align: 'left' });
           // Couleur du texte en gray-600
          doc.text(info.label, userInfoX, userInfoY + index * userInfoSpacing);
          doc.setTextColor(0, 0, 0); // Couleur du texte en noir
          doc.text(info.value, userInfoX + 20, userInfoY + index * userInfoSpacing);
        });
  
        // Tableau des données de facture
        const tableHeaders = ['ID Facture', 'Month', 'Montant', 'Date de paiement'];
        const tableData = [
          [selectedMessage.id_facture, selectedMessage.month, selectedMessage.montant, selectedMessage.updated_at],
        ];
        const tableY = userInfoY + userInfo.length * userInfoSpacing + 15; // Position verticale du tableau
        doc.autoTable({
          startY: tableY,
          head: [tableHeaders],
          body: tableData,
          theme: 'grid', // Ajouter des bordures à la table
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 30 },
            2: { cellWidth: 30 },
            3: { cellWidth: 40 },
          },
          styles: {
            fontSize: 10,
            textColor: [102, 102, 102], // Couleur du texte en gray-600
            halign: 'center', // Alignement horizontal centré
          },
        });
  
        
       
  
        doc.save('Facture.pdf');
      });
    }
  };
  
  
  

  return (
    <div className="py-10 h-screen bg-gray-100 dark:bg-gray-800 px-2">
      <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">My bills</div>
        </div>

        <div className="md:flex h-full w-full">
          <div className="w-full p-4 h-[400px]">
            <div className="relative">
              <input
                type="text"
                className="w-full h-12 rounded focus:outline-none pr-8 pl-4 border border-gray-400 dark:bg-gray-700 dark:border-transparent dark:text-gray-100"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="absolute top-3 right-4">
                <svg
                  className="h-6 w-6 text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-5.5-5.5M9.5 9.5l5.5 5.5M20 20l-4.4-4.4"
                  ></path>
                </svg>
              </span>
            </div>

            <div className="mt-8">
              <ul className="overflow-auto h-full">
                {data
                  
                  .map((message, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white dark:bg-gray-600 mt-4 p-4 hover:shadow-lg rounded cursor-pointer transition"
                      onClick={() => handleSelectMessage(message.id_facture)}
                    >
                      <div>
                        <div className="text-md font-semibold">{message.montant}</div>
                        <div className="text-sm text-gray-500">
                         
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-md font-semibold">{message.month}</div>
                        <div className="text-md text-gray-500">{message.updated_at}</div>
                      
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {selectedMessage && (
          <div
            className={`fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${
              showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full max-w-3xl mx-auto bg-white rounded shadow-lg">
              <div className="flex justify-end items-center p-4">
                <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <GrFormClose className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4">
                <div className="text-xl font-semibold">{selectedMessage.month}</div>
                <div className="flex items-center mt-4">
                  <TbHexagonNumber1 className="h-6 w-6 text-primary-500" />
                  <div className="ml-2">
                    <div className="text-sm text-gray-500">First Name</div>
                    <div className="text-md font-semibold">{firstname}</div>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TbHexagonNumber2 className="h-6 w-6 text-primary-500" />
                  <div className="ml-2">
                    <div className="text-sm text-gray-500">Last Name</div>
                    <div className="text-md font-semibold">{lastname}</div>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <BiDollar className="h-6 w-6 text-primary-500" />
                  <div className="ml-2">
                    <div className="text-sm text-gray-500">montantFacture</div>
                    <div className="text-md font-semibold">{selectedMessage.montant}</div>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <BiCalendarAlt className="h-6 w-6 text-primary-500" />
                  <div className="ml-2">
                    <div className="text-sm text-gray-500">Payment Date</div>
                    <div className="text-md font-semibold">{selectedMessage.updated_at}</div>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button onClick={handlePrint}>Print </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybill;
