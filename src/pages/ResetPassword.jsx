import React, { useState } from 'react';
import Logo from '../data/Logo.png';
import avatar from '../data/building.jpeg';
import './Login.css';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { Input } from 'postcss';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword({ id_user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      email &&
      password &&
      confirmPassword &&
      acceptTerms &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id_user}/update-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            password_confirmation: confirmPassword,
          }),
        });

        if (response.ok) {
          // Mot de passe réinitialisé avec succès
          toast.success("password changed succesfuly");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          // Erreur lors de la réinitialisation du mot de passe
          alert("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
      }
    } else {
      if (password !== confirmPassword) {
        setEmail("");
          setPassword("");
          setConfirmPassword("");
        toast.error("you have an error in your password ")
        
      } 
    }
  };

  return (
    <div className="container mt-5 my-60 antialiased">
      <div className="flex flex-col bg-white relative shadow items-center justify-center rounded-lg  w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6  mx-auto dark:text-gray-200 dark:bg-gray-700">
        <a href="#" className="flex items-center mb-6 mt-5 text-2xl font-semibold ">
          <img
            className="self-center flex-shrink-0 w-16 h-16 border rounded-full md:justify-center dark:bg-gray-500 dark:border-gray-700"
            src={Logo}
            alt="logo"
          />
          <span className="">Tottrust</span>
        </a>
        <div className="w-full p-6 bg-white rounded-lg  dark:text-gray-200  text-black shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 mb-6">
          <h2 className="mb-1 text-xl font-bold dark:text-gray-200 leading-tight tracking-tight md:text-2xl ">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font medium">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{' '}
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-white-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 mb-6"
            >
              Reset password
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPassword;
