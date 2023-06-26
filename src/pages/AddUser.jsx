import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddUser() {
  const [agreed, setAgreed] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [CIN, setCIN] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [genre, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("CIN", CIN);
      formData.append("role", role);
      formData.append("password", password);
      formData.append("phonenumber", phonenumber);
      formData.append("birthday", birthday);
      formData.append("genre", genre);
      formData.append("image", image);

      const response = await axios.post("http://127.0.0.1:8000/api/users/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFirstname("");
        setLastname("");
        setRole("");
        setCIN("");
        setEmail("");
        setPhonenumber("");
        setPassword("");
        setBirthday("");
        setGender("");
        toast.success("user added successfully");
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err); // Affiche les erreurs dans la console
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className='mx-auto max-w-xl w-full rounded-md '>
      <div className="bg-white px-6 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">User Information</h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstname" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                First Name
              </label>
              <input
              placeholder='firstname'
                type="text"
                name="firstname"
                id="firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
           
            <div>
              <label htmlFor="lastname" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Last Name
              </label>
              <input
              placeholder='lastname'
                type="text"
                name="lastname"
                id="lastname"
                required
                value={lastname}
               onChange={(e) => setLastname(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Email address
              </label>
              <input
              placeholder='email'
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="CIN" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                CIN
              </label>
              <input
              placeholder='CIN'
                type="text"
                name="CIN"
                id="CIN"
                required
                value={CIN}
                onChange={(e) => setCIN(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phonenumber" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Phone Number
              </label>
              <input
              placeholder='phone Number'
                type="tel"
                name="phonenumber"
                id="phonenumber"
                required
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
              placeholder='password'
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Role
              </label>
              <select
                name="role"
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a role</option>
             
                <option value="membre_syndic">membre_syndic</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                required
                value={genre}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="birthday" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                required
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
            <label htmlFor="image" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          </div>
          <div className="flex items-center mt-8">
            <input
              id="agreed"
              name="agreed"
              type="checkbox"
              required
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="agreed" className="ml-3 text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
              I agree to the terms and conditions
            </label>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={!agreed}
              className={classNames(
                agreed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed',
                'w-full py-3 px-4 font-semibold rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              )}
            >
              Create User
            </button>
          </div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
        

          
      </div>
      <ToastContainer />
    </div>
  );
}
