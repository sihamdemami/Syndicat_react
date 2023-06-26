import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProfile = ({
  firstname,
  lastname,
  email,
  userType,
  phoneNumber,
  birthday,
  image,
  id_user,
  CIN,
  genre
}) => {
  const navigate = useNavigate();
  const [images, setImage] = useState(null);

  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData({
      firstname,
      lastname,
      email,
      userType,
      phoneNumber,
      birthday,
      image,
      id_user,
      CIN,
      genre
    });
  }, [firstname, lastname, email, userType, phoneNumber, birthday, image, id_user, CIN, genre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      id_user,
    }));
  };
  
  const updateData = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/update/${id_user}`, formData);

      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
        console.log(formData);
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        console.log('Failed to update user information.');
      }
    } catch (error) {
      console.log('Error updating user information:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedFormData = new FormData(); // Crée un nouvel objet FormData
    
    // Ajoute les autres champs du formulaire à l'objet FormData
    Object.entries(formData).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });
    
    // Vérifie si une image a été sélectionnée
    if (image) {
      updatedFormData.append('image', images); // Ajoute l'image existante à l'objet FormData
    }
    
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/users/update/${id_user}`, updatedFormData);

      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => {
          
        }, 3000);
      } else {
        console.log('Failed to update user information.');
      }
    } catch (error) {
      console.log('Error updating user information:', error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name) {
      console.log(file.name); // Affiche le nom du fichier dans la console
      setImage(file); // Définir le fichier sélectionné comme image
    }
  };
  const imageUrl = `http://localhost:8000${image}`;
  return (
    <>
      <div className="container mx-auto mt-7">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white shadow rounded-lg p-4 dark:bg-secondary-dark-bg">
              <div className="flex justify-center">
                <br />
                <div className="w-50 h-50 rounded-full overflow-hidden">
                  <img alt="Profile" className="rounded-full" src={imageUrl} />
                </div>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  First Name
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="First Name"
                >
                  {firstname}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  Last Name
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="Last Name"
                >
                  {lastname}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  Email
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="Email"
                >
                  {email}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  CIN
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="CIN"
                >
                  {CIN}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  Phone Number
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="Phone Number"
                >
                  {phoneNumber}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  Role
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="Role"
                >
                  {userType}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  Birthday
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="Birthday"
                >
                  {birthday}
                </span>
              </div>
              <br />
              <div className="w-1/2">
                <label className="f mt-1 block w-full border-gray-300 rounded-md focus:border-blue-500 text-gray-400">
                  Gender
                </label>
                <span
                  className="text-sm font-semibold text-gray-600 block text-sm font-semibold leading-6  dark:text-gray-200 dark:bg-secondary-dark-bg"
                  id="Gender"
                >
                  {genre}
                </span>
              </div>
              <br />
              <br />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white shadow rounded-lg dark:bg-secondary-dark-bg">
              <div className=" text-sm px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">
                    Edit Account</h3>

                </div>
              </div>
              <div className="p-4">
             
                  <div className="space-y-4">
                  <div className="w-full sm:col-span-2">
                      <label
                       
                        className="block w-full text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        First Name
                      </label>
                      <div className="relative mt-2.5">
                      <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        id="firstname"
                        name='firstname'
                        type="text"
                        defaultValue={formData.firstname || ''}
                      onChange={handleChange}
                        placeholder="First Name"
                      /></div>
                    </div>
                    <div className="w-full sm:col-span-2">
                      <label
                    
                        className="block w-full text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        Last Name
                      </label>
                      <div className="relative mt-2.5">
                      <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        id="lastname"
                        name="lastname"
                        type="text"
                        defaultValue={formData.lastname || ''}
                        onChange={handleChange}
                        placeholder="Last Name"
                      /></div>
                    </div>
                    <div className="w-full sm:col-span-2">
                      <label
                      
                        className="block w-full text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        Email
                      </label>
                      <div className="relative mt-2.5">
                      <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={formData.email || ''}
                      onChange={handleChange}
                        placeholder="Email@example.com"
                      /></div>
                    </div>
                    <div className="w-full sm:col-span-2">
                      <label
                       
                        
                        className="block w-full text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        CIN
                      </label>
                      <div className="relative mt-2.5">
                      <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        id="CIN"
                        name="CIN"
                        type="text"
                       defaultValue={formData.CIN}
                       onChange={handleChange}
                        placeholder="CIN"
                      /></div>
                    </div>
                    <div className="w-full sm:col-span-2">
                      <label
                        
                       
                        className="block w-full text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        Birthday
                      </label>
                      <div className="relative mt-2.5">
                      <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        id="birthday"
                        name="birthday"
                        type="date"
                        defaultValue={formData.birthday || ''}
                        onChange={handleChange}
                        placeholder="birthday"
                      /></div>
                    </div>
                    <div className="w-full sm:col-span-2">
                      <label
                    
                       
                        className="block w-full text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      >
                        Gender
                      </label>
                      <div className="relative mt-2.5">
                      <input
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        id="genre"
                        name="genre"
                        type="text"
                       defaultValue={formData.genre}
                        onChange={handleChange}
                        placeholder="genre"
                      /></div>
                    </div>
                    <div className="w-full sm:col-span-2">
                      <label htmlFor="Phone-number" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                        Phone number
                      </label>
                      <div className="relative mt-2.5">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                          <select
                            id="phonenumber"
                            
                            name="phonenumber"
                            className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-0 pr-5 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm dark:text-gray-200 dark:bg-secondary-dark-bg"
                          >
                            <option>+212</option>
                          </select>
                        </div>
                        <input
                          placeholder='Enter your Phone Number'
                          type="tel"
                          defaultValue={formData.phoneNumber || ''}
                          onChange={handleChange}
                          name="phoneNumber"
                          id="phoneNumber"
                          autoComplete="tel"
                          className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                        />
                      </div>
                    </div>

                    
                  </div>
                  <div className="w-full sm:col-span-2">
                    <label  className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                      Image
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="file"
                       
                        onChange={handleImageChange}
                        name="image"
                        id="image"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-sm mr-7" type="submit"  onClick={handleSubmit}>
                      Save Changes
                        </button>

                   <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-sm mr-6" type="button" onClick={handleCancel}>
                   Cancel
                 </button>
  </div>
              
             
            
          
          </div>
        </div>
      </div>
            </div>
          </div>
    
    </>
  );
};

export default EditProfile;