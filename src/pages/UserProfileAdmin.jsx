import React,{useState,useEffect} from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaBriefcase, FaUniversity, FaBirthdayCake, FaTransgender } from 'react-icons/fa';
import { BsBuilding, BsHouses, BsGeoAlt, BsGlobeAmericas } from 'react-icons/bs';
import { GiModernCity } from 'react-icons/gi';
import axios from 'axios';

const ProfilePage = ({ firstname, lastname, email, phoneNumber, userType, birthday, genre,image, CIN ,idCoproperty,id_user}) => {

  const [data, Setdata] = useState([]);
  const [adress,setAdress]=useState("");
  const [numAppartement,setnumAppartment]=useState("");
  const [surface,setsurface]=useState("");
  const [name,setname]=useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/property/${id_user}`)
      .then(response => {
     setAdress(response.data.adress);
     setnumAppartment(response.data.num_appartement);
     setsurface(response.data.surface);
     setname(response.data.name);

      Setdata(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching coproprietes:', error);
      });
  }, []);
  const imageUrl = `http://localhost:8000${image}`;
  return (

    <div>
      <div className="container mt-20 my-60 antialiased ">
      
      <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto dark:text-gray-200 dark:bg-gray-500">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="">
                <img
                  src={imageUrl}
                  alt=""
                  className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-center dark:bg-gray-500 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 dark:text-white">
              {firstname} {lastname}
            </h3>
             
          </div>
          <br></br>
          <div className="w-full">
              <h2 className="font-medium text-gray-900 text-center px-6 dark:text-black">User Informations :</h2>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-m  ">
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsGeoAlt className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Email :  {email}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsGlobeAmericas className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Phone Number : {phoneNumber}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black ">
                  <GiModernCity className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  CIN : {CIN}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsHouses className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Birthday :{birthday}
                </div>
                <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 dark:text-black">
                  <BsBuilding className="rounded-full h-7 w-6 shadow-md inline-block mr-2" />
                  Gender :{genre}
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
