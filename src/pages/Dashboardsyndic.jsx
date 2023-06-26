import React, { useState, useEffect } from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';
import { BsCurrencyDollar, BsFillPersonFill, BsFillHouseFill } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Link } from 'react-router-dom';
import { Stacked,    Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import Doughnutsyn  from '../components/Charts/Piesyndic'; // Importez le composant Doughnut

import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import CopropertyView from './CopropertyView';
import axios from 'axios';

const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
        <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
);

const Dashboardsyndic = ({ id_user }) => {
    const { currentColor, currentMode } = useStateContext();
    const [userCount, setUserCount] = useState(0);
    const [copropertyCount, setCopropertyCount] = useState(0);
    const [userGenderDataMale, setUserGenderDataMale] = useState([]);
    const [userGenderDataFemale, setUserGenderDataFemale] = useState([]);
    const [propertyData, setPropertyData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/countCoproprietaires/${id_user}`)
            .then(response => {
                setUserCount(response.data.count);

                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/countFreeApartments/${id_user}`)
            .then(response => {
                setCopropertyCount(response.data.free_apartments);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/usercountGender')
            .then(response => {
                setUserGenderDataFemale(response.data.femaleCount);
                setUserGenderDataMale(response.data.maleCount);
                console.log(userGenderDataFemale);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

  
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getNewUsersByid/${id_user}`)
            .then(response => {
                setNewUsers(response.data);
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
                            <p className="font-bold text-gray-400">Number of users</p>
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
                            <p className="font-bold text-gray-400">Free Appartement </p>
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
                        <Doughnutsyn  id="pie-chart" legendVisiblity={false} height="160px" id_user={id_user} />
                    </div>
                </div>
            </div>

            <div className="flex gap-10 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
  <div className="md:w-full h-60 overflow-auto table-container">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 dark:bg-secondary-dark-bg"> <tr>
          <th className="py-2 text-center text-xl font-medium text-gray-500" colSpan="4">New Users</th>
        </tr>
        <br/>
        <tr>
       
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Image & Name
          </th>
         
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gender
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone Number
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-secondary-dark-bg">
        {newUsers.map(user => (
          <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img src={`http://localhost:8000${user.image}`} alt="User" className="h-8 w-8 rounded-full" />
                <span className="ml-2">{user.firstname} {user.lastname}</span>
              </div>
            </td>
           
            <td className="px-6 py-4 whitespace-nowrap">
              {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.genre}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.phonenumber}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

</div>



                <div className="mb-70">
                    <CopropertyView />
                    <Link to="/CopropertyManagement">
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

export default Dashboardsyndic