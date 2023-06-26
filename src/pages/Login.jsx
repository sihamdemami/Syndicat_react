import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Logo from '../data/Logo.png';
import avatar from '../data/Login3.jpg';
import { Footer } from '../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const handleLogin = () => {
    if (email && password) {
      onLogin(email, password);
      navigate('/', { replace: true });
      console.log(email);
    } else {
      setShowWarning(true);
      console.log(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    if (email.trim() === '') {
      setEmailError('Veuillez entrer votre adresse e-mail.');
    }
    if (password.trim() === '') {
      setPasswordError('Veuillez entrer votre mot de passe.');
    }
    if (email.includes('@') === false) {
      setEmailError('Veuillez entrer une adresse e-mail valide.');
    }
    if (password.length < 6) {
      setPasswordError('Le mot de passe doit comporter au moins 6 caractères.');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleSendForgotPasswordEmail = (forgotPasswordEmail) => {
    axios
      .post('http://127.0.0.1:8000/api/forgetpassword', { forgotPasswordEmail })
      .then((response) => {
        {/*setMessagedeSucces(response.data.message);*/ }
        console.log(response.data);
        console.log(forgotPasswordEmail)
        setForgotPasswordEmail('');
        setShowForgotPassword(false);
        if (response.status === 200) {
        
  
          toast.success("Your password will be changed soon !", {
            autoClose: 3000,
            
          });
        } else {
          toast.error("User not found !");
        }
      })
      .catch((error) => {

        console.log(error);
        toast.error("User not found !");
        setForgotPasswordEmail('');
        setShowForgotPassword(false);


      });

  };

  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false);
  };

  return (
    <section className="gradient-form h-screen bg-white dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-24 h-24 border rounded-full" src={Logo} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">We are The Tottrust Team</h4>
                    </div>
                    {showWarning && <p className="mb-4 text-red-500">Please enter a valid email and password.</p>}
                    <form onSubmit={handleSubmit}>
                      <p className="mb-4">Please login to your account</p>

                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
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
                        {emailError && <p className="text-red-500">{emailError}</p>}
                      </div>

                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                          Password
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
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          type="submit"
                          onClick={handleLogin}
                          className="w-full text-white bg-white-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                        >
                          Login
                        </button>
                        <br /> <br /> <br />
                        {!showForgotPassword && (
                          <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-blue-500 hover:underline focus:outline-none"
                          >
                            Forgot password ?
                          </button>
                        )}
                        {showForgotPassword && (
                          <div className="flex mt-4">
                            <input
                              type="email"
                              name="forgotPasswordEmail"
                              id="forgotPasswordEmail"
                              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter your email"
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => handleSendForgotPasswordEmail(forgotPasswordEmail)}
                              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                              Send
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelForgotPassword}
                              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                      <ToastContainer />
                    </form>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none" style={{ background: `url(${avatar})` }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Login;
