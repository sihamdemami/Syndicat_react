import React, { useState, useEffect } from 'react';
import { IoIosHome } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';
import { IoIosBook } from 'react-icons/io';
import { FcHome } from 'react-icons/fc';
import { RiMailSendLine } from 'react-icons/ri';
import { BsHouse,BsCash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Budget from './Budget';
import Rules from './Rules';
import RulesCopro from './RulesCopro';
import Charge from './Charge';
import axios from 'axios';
import BudgetCopro from './BudgetCoprp';
import { FaBuilding, FaEnvelope } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';
import { IoMdResize, IoBedOutline } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCallOutline } from 'react-icons/io5';
import { IoTransgenderOutline } from 'react-icons/io5';
import { IoMailOutline } from 'react-icons/io5';
import { IoChatboxOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';




import ChargeCopro from './ChargeCopro';

const ApartmentInformation = ({ activeIcon,  id_user }) => {
  const navigate = useNavigate();
  const [id_copropriete, setIdCoproperty] = useState('');
  const [properties, setproperties] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [num_appartement, setNumAppartement] = useState('');
  const [etage, setEtage] = useState('');
  const [nbr_chambres, setNbrChambres] = useState('');
  const [surface, setSurface] = useState('');
  const [firstname,setfirstname]=useState('');
  const [lastname,setlastname]=useState('');
  const [phonenumber,setphonenumber]=useState('');
  const [gender,setgender]=useState('');
  const [email,setemail]=useState('');
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/Myproperty/${id_user}`)
      .then(response => {
        const data = response.data;
        setproperties(data.properties);
        setIdCoproperty(data.coproprieteData.id_copropriete);
        setAddress(data.coproprieteData.adress);
        setEtage(data.coproprieteData.etage);
        setName(data.coproprieteData.name);
        setfirstname(data.syndicData.firstname);
        setlastname(data.syndicData.lastname);
        setphonenumber(data.syndicData.phonenumber);
        setgender(data.syndicData.gender);
        setemail(data.syndicData.email);
        console.log(data.properties);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);

  

  return (
    <div>
      {activeIcon === 'apartment' && (
       <div className="antialiased max-w-6xl mx-auto my-12 bg-white px-8 pb-24 dark:bg-gay-700">
       <div className="relative block md:flex items-center dark:bg-gay-700">
         <div className="w-full md:w-1/2 relative z-1 bg-gray-100 rounded shadow-lg overflow-x-auto dark:bg-gay-700">
           <div className="text-lg font-medium text-green-500 uppercase p-8 text-center border-b border-gray-200 tracking-wide dark:bg-gay-700">Appartement Information</div>
           <div className="block sm:flex md:block lg:flex items-center justify-center dark:bg-gay-700">
             <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
               <div className="inline-flex items-center">
                 <span className="text-xl font-medium">Coproperty Name</span>
                 <span className="text-xl text-gray-600 ml-2"></span>
              
               </div>
               <span className="block text-sm text-gray-600 mt-2">{name}</span>
             </div>
             <div className="mt-4 mb-8 sm:m-8 md:m-0 md:mt-4 md:mb-8 lg:m-8 text-center">
               <div className="inline-flex items-center">
                 <span className="text-xl font-medium">Adress</span>
                 
               </div>
               <span className="block text-sm text-gray-600 mt-2">{address}</span>
             </div>
           </div>
           <div className="flex justify-center mt-3 overflow-x-auto" >
  
    {properties.map((property, index) => (
    <ul>
      <li key={index} className="flex items-center">
        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
          <BsHouse className="w-4 h-4" />
        </div>
        <span className="text-gray-700 text-lg ml-3">№ Appartment: {property.num_appartement}</span>
      </li>
      <li className="flex items-center mt-3">
        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
          <BsCash className="w-4 h-4" />
        </div>
        <span className="text-gray-700 text-lg ml-3">Monthly amount: {property.montantmensuelle}</span>
      </li>
      <li className="flex items-center mt-3">
        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
          <FaBed className="w-4 h-4" />
        </div>
        <span className="text-gray-700 text-lg ml-3">№ chambers : {property.nbr_chambres}</span>
      </li>
      <li className="flex items-center mt-3">
        <div className="bg-green-200 rounded-full p-2 fill-current text-green-700">
          <IoMdResize className="w-4 h-4" />
        </div>
        <span className="text-gray-700 text-lg ml-3">Area : {property.surface} m2</span>
      </li>
   </ul> 
   ))}
</div>
 <br/>
         </div>
         <div className="w-full md:w-1/2 relative z-0 px-8 md:px-0 md:py-16">
  <div className="bg-blue-900 text-white rounded-b md:rounded-b-none md:rounded-r shadow-lg overflow-hidden">
    <div className="text-lg font-medium uppercase p-8 text-center border-b border-blue-800 tracking-wide">Syndic Information</div>
  
    <div className="mt-8 border border-blue-800 mx-8 lg:mx-16 flex flex-wrap">
      <div className="flex items-center justify-center w-1/2 text-center p-4 border-r border-b border-blue-800">
        <IoPersonOutline className="w-4 h-4" />
        <span className="ml-2">Name: {firstname} {lastname}</span>
      </div>
      <div className="flex items-center justify-center w-1/2 text-center p-4 border-b border-blue-800">
        <IoCallOutline className="w-6 h-4" />
        <span className="ml-2">Phone : {phonenumber}</span>
      </div>
      <div className="flex items-center justify-center w-1/2 text-center p-4 border-r border-blue-800">
        <IoTransgenderOutline className="w-10 h-4" />
        <span className="ml-2">Gender: {gender}</span>
      </div>
      <div className="flex items-center justify-center w-1/2 text-center p-4">
        <IoMailOutline className="w-4 h-4" />
        <span className="ml-2">Email: {email}</span>
      </div>
    </div>
    <Link to ='/Chat'>
    <a className="block flex items-center justify-center bg-blue-800 hover:bg-blue-700 p-8 text-md font-semibold text-gray-300 uppercase mt-8" href="#">
      <IoChatboxOutline className="w-4 h-4" />
      <span className=' ml-2'>   Contact Syndic</span>
      <span className="font-medium text-gray-300 ml-2">➔</span>
    </a></Link>
  </div>
</div>
</div>
</div>
      )}

      
      {activeIcon === 'charge' && (
        <div>
          <ChargeCopro id_copropriete={id_copropriete} />
        </div>
      )}

      
      {activeIcon === 'budget' && (
        <div>
          <BudgetCopro id_copropriete={id_copropriete} />
        </div>
      )}

      
      {activeIcon === 'rules' && (
        <div>
          <RulesCopro id_copropriete={id_copropriete} />
        </div>
      )}
    </div>
  );
};

const App = ({ userType, firstname, lastname, email, phoneNumber, birthday, genre, image, id_user }) => {
  const [activeIcon, setActiveIcon] = useState('apartment');

  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`w-1/4 p-4 text-center ${
            activeIcon === 'apartment' ? 'bg-gray-100 border-b-4 border-blue-500' : ''
          }`}
          onClick={() => setActiveIcon('apartment')}
        >
          <span className={`text-blue-500 opacity-50 place-items-center ${userType === 'dark' ? 'dark:text-white' : ''}`}>
            <IoIosHome size={42} />
          </span>
          <span className={`block mt-2 text-sm ${userType === 'dark' ? 'dark:text-white' : ''}`}>Appartement Information</span>
        </div>
        <div
          className={`w-1/4 p-4 text-center ${
            activeIcon === 'charge' ? 'bg-gray-200 border-b-4 border-blue-500 dark:text-blue-500' : ''
          }`}
          onClick={() => setActiveIcon('charge')}
        >
          <span className={`text-blue-500 opacity-50 ${userType === 'dark' ? 'dark:text-white' : ''}`}>
            <FaShoppingCart size={42} />
          </span>
          <span className={`block mt-2 text-sm ${userType === 'dark' ? 'dark:text-white' : ''}`}>Charges</span>
        </div>
        <div
          className={`w-1/4 p-4 text-center ${
            activeIcon === 'budget' ? 'bg-gray-200 border-b-4 border-blue-500 dark:text-blue-500' : ''
          }`}
          onClick={() => setActiveIcon('budget')}
        >
          <span className={`text-blue-500 opacity-50 ${userType === 'dark' ? 'dark:text-white' : ''}`}>
            <FaDollarSign size={42} />
          </span>
          <span className={`block mt-2 text-sm ${userType === 'dark' ? 'dark:text-white' : ''}`}>Budgets</span>
        </div>
        <div
          className={`w-1/4 p-4 text-center ${
            activeIcon === 'rules' ? 'bg-gray-200 border-b-4 border-blue-500 dark:text-blue-500' : ''
          }`}
          onClick={() => setActiveIcon('rules')}
        >
          <span className={`text-blue-500 opacity-50 ${userType === 'dark' ? 'dark:text-white' : ''}`}>
            <IoIosBook size={42} />
          </span>
          <span className={`block mt-2 text-sm ${userType === 'dark' ? 'dark:text-white' : ''}`}>Rules</span>
        </div>
      </div>

      <ApartmentInformation
        activeIcon={activeIcon}
        firstname={firstname}
        lastname={lastname}
        email={email}
        userType={userType}
        phoneNumber={phoneNumber}
        birthday={birthday}
        genre={genre}
        image={image}
        id_user={id_user}
      />
    </div>
  );
};

export default App;