import React, { useState, useEffect } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { BsCurrencyDollar, BsFillPersonFill, BsFillHouseFill } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Link } from 'react-router-dom';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import Copropriete from './Copropriete';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import CopropertyView from './CopropertyView';
import axios from 'axios';
import Document from './DocumentSyndic';
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const [userCount, setUserCount] = useState(0);
  const [copropertyCount, setCopropertyCount] = useState(0);
  const [userGenderDataMale, setUserGenderDataMale] = useState([]);
  const [userGenderDataFemale, setUserGenderDataFemale] = useState([]);
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/userscount')
      .then(response => {
        setUserCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Coproperties/count')
      .then(response => {
        setCopropertyCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/usercountGenderdash')
      .then(response => {
        setUserGenderDataFemale(response.data.femaleCount);
        setUserGenderDataMale(response.data.maleCount);
        console.log(userGenderDataFemale);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/getCoproprieteData')
      .then(response => {
        setPropertyData(response.data);
        console.log(propertyData.copropertyID);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const pieChartData = [
    {
      label: 'Male',
      value: userGenderDataMale,
    },
    {
      label: 'Female',
      value: userGenderDataFemale,
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl w-80 md:w-120 p-5 m-3 flex justify-center items-center gap-4">
          <div className="flex justify-between items-center dark:text-gray-200 dark:bg-secondary-dark-bg">
            <div className='dark:text-gray-200 dark:bg-secondary-dark-bg'>
              <p className="font-bold text-gray-400">Total users</p>
              <p className="text-2xl">{userCount}</p>
            </div>
            <div
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
            >
              <BsFillPersonFill />
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl w-80 md:w-120 p-5 m-3 flex justify-center items-center gap-4">
          <div className="flex justify-between items-center dark:text-gray-200 dark:bg-secondary-dark-bg">
            <div className="dark:text-gray-200 dark:bg-secondary-dark-bg">
              <p className="font-bold text-gray-400">Total Coproperties</p>
              <p className="text-2xl">{copropertyCount}</p>
            </div>
            <div
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4 dark:text-gray-200 dark:bg-secondary-dark-bg"
            >
              <BsFillHouseFill />
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
     
              <p className="text-gray-400">Gender of Users</p>
            </div>

            <div className="w-40">
              <Pie id="pie-chart"  legendVisiblity={false} height="160px" />
            </div>
          </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="md:w-full h-60 overflow-auto table-container">
            <table className="min-w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded ">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-left">Coproperty</th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-left">Documents</th>
                  <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-left">Rules</th>
                </tr>
              </thead>
              <tbody>
              {propertyData && propertyData.map(property => (
                  <tr key={property.copropriete_name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/Copropriete/${property.copropertyID}`}>
                        {property.copropriete_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/Documents/${property.copropertyID}`}>
                        {property.document_count}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/Rules/${property.copropertyID}`}>
                        {property.rule_count}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-2">
          <CopropertyView />
          <Link to="/AllCoproperty">
            <Button
              className="mt-18"
              color="white"
              bgColor={currentColor}
              text="Show More"
              borderRadius="10px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;