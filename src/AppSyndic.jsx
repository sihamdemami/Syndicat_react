import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Footer, ThemeSettings } from './components';
import UserProfile from './pages/userProfileSundic';
import UserProfileEdit from './pages/UserEdit';
import UsersEdit from './pages/UserProfileEdit';
import Calendar from './pages/CalendarSyndic';
import Employees from './pages/Coproperty';
import Charge from './pages/chargeSyndic';
import Factures from './pages/facture';
import Budget from './pages/BudgetSundic';
import Rules from './pages/RulesSyndic';
import Document from './pages/DocumentSyndic';
import AddDocument from './pages/AddDocument';
import Maps from './pages/Maps';
import './App.css';
import CopropertyManagement from './pages/CopropertyManagement';
import { useStateContext } from './contexts/ContextProvider';
import Sidebar_Syndic from './components/SideBar_Syndic';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import AddTravaux from './pages/AddTravaux';
import NavbarSyndic from './components/NabarSyndic';
import AddCoproprietaire from './pages/AddCoproprietaire';
import CopropertyManagementSyndic from './pages/CopropertyManagementSyndic';
import Copropriete from './pages/Copropriete';
import FactureSyndManagment from './pages/FactureSyndManagment';
import FactureSynd from './pages/FactureSynd';
import TravauxSynd from './pages/TravauxSynd';
import AddCharge from './pages/AddCharge';
import AddBudget from './pages/AddBudget';
import axios from 'axios';
import Messagerie from './pages/messagerieSyndic';
import UsersSyndic from './pages/UsersSyndic';
import DemandeTravaux from './pages/Demandetravaux';
import ResetPassword from './pages/ResetPassword';
import AddRule  from './pages/AddRule';
import Dashboardsyndic from './pages/Dashboardsyndic';
const AppSyndic = ({ id_user }) => {
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
        setbirthday(response.data.birthday                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
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
  const imageUrl = `http://localhost:8000${image}`;
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getCoproperty/${id_user}`)
      .then(response => {
      console.log(response.data);
      SetIdCoproperty(response.data);
      console.log(id_user)
        
      })
      .catch(error => {
        console.error('Error fetching coproprietes:', error);
      });
  }, []);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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
            <Sidebar_Syndic userType={userType } />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar_Syndic userType={userType }/>
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
            <NavbarSyndic  firstname={firstname} lastname={lastname}  email={email} userType={userType} phoneNumber={phoneNumber} id_user={id_user} imageUrl={imageUrl} idCoproperty={idCoproperty}/>
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* dashboard */}
              <Route path="/" element={<Dashboardsyndic id_user={id_user}/>} />
              

              {/* User Management */}
              <Route path="/Owners" element={<UsersSyndic id_user={id_user}/>} />
              <Route path="/MyAccount" element={<UserProfile email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} imageUrl={imageUrl} CIN={CIN} idCoproperty={idCoproperty} id_user={id_user}/>} />
              <Route path="/EditProfile" element={<UserProfileEdit  email={email} firstname={firstname} lastname={lastname} userType={userType} phoneNumber={phoneNumber} birthday={birthday} genre={genre} image={image} CIN={CIN} idCoproperty={idCoproperty} id_user={id_user}/>} />
              <Route path="/AddUser/:idCoproperty" element={<AddCoproprietaire idCoproperty={idCoproperty}/>}/>
              <Route path="/MyCoproperty" element={<CopropertyManagement />} />

              {/* Notifications */}
              <Route path="/calendar" element={<Calendar  idCoproperty={idCoproperty}/>} />

              {/* Coproperty Management */}
              <Route path="/Coproperties" element={<Employees />} />
              <Route path="/CopropertyManagement"element={<CopropertyManagementSyndic  idCoproperty={idCoproperty}/>}/>
              <Route path="/PropertiesManagments"element={<Properties idCoproperty={idCoproperty}/>}/> 
              <Route path="/Copropriete/:idCoproperty" element={<Copropriete />} />
              <Route path="/AddProperty/:idCoproperty"element={<AddProperty />}/>
              <Route path="/AddCharge/:idCoproperty"element={<AddCharge />}/>
              <Route path="/AddBudget/:idCoproperty"element={<AddBudget />}/>
              <Route path="/AddRule/:idCoproperty"element={<AddRule />}/>
              <Route path="/Charge/:idCoproperty" element={<Charge />} />
              <Route path="/Factures" element={<Factures />} />
              <Route path="/Budget/:idCoproperty" element={<Budget />} />
              <Route path="/Rules/:idCoproperty" element={<Rules />} />
             
              <Route path="/currentsWorks/:idCoproperty" element={<TravauxSynd />} />
              <Route path="/AddTravaux" element={<AddTravaux />} />
              <Route path="/Facture" element={<FactureSyndManagment id_user={id_user} />} />
              <Route path="/Facture/Archives" element={<FactureSynd idCoproperty={idCoproperty}/>} />
              <Route path="/Chats" element={<Messagerie  idCoproperty={idCoproperty}  id_user={id_user}/>} />
              <Route path="/edit/:id_user" element={<UsersEdit/>} />
              

              {/* Location */}
              <Route path="/Maps" element={<Maps />} />
              <Route path="/DemandeTravaux/:idCoproperty" element={<DemandeTravaux idCoproperty={idCoproperty}  id_user={id_user}/>} />


              <Route path="/AddDocument/:idCoproperty"element={<AddDocument/>}/>
              <Route path="/Documents/:idCoproperty" element={<Document idCoproperty={idCoproperty}/>} />
              <Route path="/resetPassword/:idUser" element={<ResetPassword id_user={id_user}/>} />
             
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppSyndic;
