
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import axios from 'axios';



import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { Footer, ThemeSettings } from './components';
import NavbarCoproprietaire from './components/NavbarCoproprietaire';
import SidebarCopr from './components/SidebarCopr';
import Ecommerce from './pages/Ecommerce';
import Customers from './pages/Users';
import UserProfile from './pages/UserProfile';
import UserProfileEdit from './pages/UserEdit';
import AddUser from './pages/AddUser';
import Calendar from './pages/CalendarCopro';
import Employees from './pages/Coproperty';

import Charge from './pages/Charge';
import Factures from './pages/facture';
import Budget from './pages/Budget';
import BudgetCopro from './pages/BudgetCoprp';
import Rules from './pages/Rules';
import RulesCopro from './pages/RulesCopro';
import TravauxSynd from './pages/TravauxSynd'; 

import Kanban from './pages/Kanban';
import Maps from './pages/Maps';
import Mybill from './pages/Mybill';
import succes from './pages/succes';
import ChargeCopro from './pages/ChargeCopro';
import AllCoproperty from './pages/AllCoproperty';

import './App.css';
import CopropertyManagement from './pages/CopropertyManagement';
import { useStateContext } from './contexts/ContextProvider';
import AddTravaux from './pages/AddTravaux';
import MyProperty from './pages/Myproperty';
import PropertyInformation from './pages/PropertyInformation';
import Messagerie from './pages/messagerieCoproprietaire';
import Document from './pages/DocumentCopro';
import ResetPassword from './pages/ResetPassword';

const AppCop = ( {id_user}) =>{
  const {
    isAuthenticated,
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useStateContext();
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
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getidcoproperty/${id_user}`)
      .then(response => {
      console.log(response.data);
      SetIdCoproperty(response.data);
      console.log(idCoproperty);
        
      })
      .catch(error => {
        console.error('Error fetching coproprietes:', error);
      });
  }, []);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  
  const imageUrl = `http://localhost:8000${image}`;

  return (
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
            <SidebarCopr userType={userType}/>
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
             <SidebarCopr userType={userType }/>
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
          <NavbarCoproprietaire  idCoproperty={idCoproperty} firstname={firstname} lastname={lastname} email={email} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} id_user={id_user}/>
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* dashboard */}
              <Route path="/" element={<UserProfile email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} imageUrl={imageUrl} CIN={CIN} idCoproperty={idCoproperty} id_user={id_user}/>}/>
              <Route path="/Home" element={<UserProfile email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} imageUrl={imageUrl} CIN={CIN} idCoproperty={idCoproperty} id_user={id_user}/>}/>
              {/* User Managment */}
              <Route path="/Users" element={<Customers />} />
              <Route path="/Userprofile" element={<UserProfile email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} imageUrl={imageUrl} CIN={CIN} idCoproperty={idCoproperty} id_user={id_user}/>} />
              <Route path="/EditProfile" element={<UserProfileEdit  firstname={firstname} lastname={lastname} email={email} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} id_user={id_user} CIN={CIN}/>} />
              <Route path="/MyCoproperty" element={<MyProperty/>} />
              <Route path="/AllCoproperty" element={<AllCoproperty/>} />
              <Route path='/Chat'  element={<Messagerie id_user={id_user} idCoproperty={idCoproperty}/>}/>
              {/* Notications */}
              <Route path="/calendar" element={<Calendar  idCoproperty={idCoproperty}/>} />
              <Route path="/travaux/:idCoproperty" element={<TravauxSynd />} />
              {/* Coproperty Management */}
              <Route path="/Coproperties" element={<Employees />} />
              <Route path="/CopropertyManagement" element={<CopropertyManagement />}/>
              <Route path="/Charge" element={<Charge />} />
              <Route path="/ChargeCopro" element={<ChargeCopro />} />
              <Route path="/Factures" element={<Factures />} />
              <Route path="/Budget" element={<Budget />} />
              <Route path="/BudgetCopro" element={<BudgetCopro />} />
              <Route path="/Mybill" element={<Mybill  firstname={firstname} lastname={lastname}  email={email} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} id_user={id_user}/>} />
              <Route path='/Rules' element={<Rules/>}/>
              <Route path='/RulesCoproprietaie' element={<RulesCopro/>}/>
              <Route path="/AddWork" element={<AddTravaux id_user={id_user}/>} />
              <Route path='/propertyInformation'  element={<PropertyInformation  firstname={firstname} lastname={lastname} email={email} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} id_user={id_user}/>}/>
              {/*Location */}
              <Route path="/Maps" element={<Maps />} />
              <Route path="/succes" element={<succes />} />
              <Route path="/Document" element={<Document idCoproperty={idCoproperty}/>} />
              <Route path="/resetPassword/:idUser" element={<ResetPassword id_user={id_user}/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppCop;


