
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AllCopoperty from './pages/AllCoproperty'
import axios from 'axios';



import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import Ecommerce from './pages/Ecommerce';
import Customers from './pages/Users';
import UserProfile from './pages/UserProfileAdmin';
import UserProfileEdit from './pages/UserEdit';
import AddUser from './pages/AddUser';
import Calendar from './pages/Calendar';
import Employees from './pages/Coproperty';
import Charge from './pages/Charge';
import Factures from './pages/facture';
import Budget from './pages/Budget';
import Rules from './pages/Rules';
import Document from './pages/DocumentAdmin';
import Travaux from './pages/Travaux';
import MapsAdmin from './pages/MapsAdmin'
import succes from './pages/succes';
import Copropriete from './pages/Copropriete';
import './App.css';
import CopropertyManagement from './pages/CopropertyManagement';
import { useStateContext } from './contexts/ContextProvider';
import AddTravaux from './pages/AddTravaux';
import AddBudget from './pages/AddBudget';
import AddCharge from './pages/AddCharge';
import AddRule from './pages/AddRule';
import AddCoproperty from './pages/AddCoproperty';
import NotifFacture from './pages/NotifFacture';
import UsersEdit from './pages/UserProfileEdit';
import ResetPassword from './pages/ResetPassword';

const AppAdmin = ({ id_user }) =>{
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const [idCoproperty,SetIdCoproperty]=useState('');
  const [lastname,setlastname]=useState('');
  const [firstname,setfirstname]=useState('');
  const [phoneNumber,setphoneNumber]=useState('');
  const [email,setEmail]=useState('');
  const [birthday,setbirthday]=useState('');
  const [genre,setgenre]=useState('');
  const [image ,setImage]=useState('');
  const [CIN,setCin]=useState('');
  const [userType,setUserType]=useState('');


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${id_user}`)
      .then(response => {
        setfirstname(response.data.firstname);
        setlastname(response.data.lastname);
        setphoneNumber(response.data.phonenumber);
        setbirthday(response.data.birthday);
        setgenre(response.data.genre);
      setImage(response.data.image);
        setEmail(response.data.email);
        setImage(response.data.image);
        setCin(response.data.CIN);
        setUserType(response.data.role);
     
        
      })
      .catch(error => {
        console.error('Error fetching coproprietes:', error);
      });
  }, []);
  

  return (
    localStorage.getItem("isAuthenticated")?(
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar userType={userType }/>
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar userType={userType }/>
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar  firstname={firstname} lastname={lastname}  email={email} userType={userType} phoneNumber={phoneNumber} image={image}/>
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* dashboard */}
              <Route path="/" element={<Ecommerce />} />

              <Route path="/Home" element={<Ecommerce />} />
              <Route path="/AllCoproperty" element={<AllCopoperty/>} />
              {/* User Managment */}
              <Route path="/Users" element={<Customers />} />
              <Route path="/UserProfile" element={<UserProfile email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} CIN={CIN}/>} />
              <Route path="/EditProfile" element={<UserProfileEdit  email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} CIN={CIN} idCoproperty={idCoproperty} id_user={id_user}/>} />
              <Route path="/AddUser" element={<AddUser />} />

              {/* Notications */}
              <Route path="/calendar" element={<Calendar />} />

              {/* Coproperty Management */}
              <Route path="/Coproperties" element={<Employees />} />
              <Route
                path="/CopropertyManagement"
                element={<CopropertyManagement />}
              />
              <Route path="/Charge" element={<Charge />} />
              <Route path="/Factures" element={<Factures />} />
              <Route path="/Budget" element={<Budget />} />
              <Route path="/Rules" element={<Rules />} />
              <Route path="/Documents" element={<Document />} />
              <Route path="/Travaux" element={<Travaux />} />
              
              <Route path="/AddCoproperty" element={<AddCoproperty />} />
              <Route path="/AddTravaux" element={<AddTravaux />} />
               <Route path="/AddBudget" element={<AddBudget/>}/>
               <Route path="/AddCharge" element={<AddCharge/>}/>
               <Route path="/AddRule" element={<AddRule/>}/>
              {/*Location */}
              <Route path="/Maps" element={<MapsAdmin/>}/>
              <Route path="/edit/:id_user" element={<UsersEdit/>} />
              <Route path="/resetPassword/:idUser" element={<ResetPassword id_user={id_user}/>} />
              <Route path="/Documents/:idCoproperty" element={<Document />} />
              <Route path="/Copropriete/:idCoproperty" element={<Copropriete />} />
              <Route path="/Rules/:idCoproperty" element={<Rules />} />
              <Route path="/succes" element={<succes />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
    ):<Navigate to="/login" replace />
  );
};

export default AppAdmin;


