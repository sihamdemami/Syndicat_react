import React, { useState } from 'react';
import Logo from '../data/Logo.png';
import avatar from '../data/building.jpeg';
import './Login.css';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { Input } from 'postcss';
import { Link } from 'react-router-dom';

function App() {
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');




    const handleSubmit = (e) => {

        e.preventDefault();
        setEmailError('');

        if (email.trim() === '') {
            setEmailError('Veuillez entrer votre adresse e-mail.');
          }
        if (email.includes('@') === false) {
            setEmailError("Veuillez entrer une adresse e-mail valide.");
          }
          if (email !== 'test@gmail.com') {
            setEmailError("L'e-mail est incorrect.");setEmail('');
          } 
           
           
          
            
            
          
        
    };

    return (
        <>
        <section className=" bg-gray-900 from-transparent" >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               
                <div className="w-full p-6 bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Forgot Password?
                    </h2>
                    <p className='text-white  text-sm'>
                        Enter your email adress and we 'll send you a link to reset your password .
                    </p>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
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
                        </div>
                        
                        {emailError && <p className="text-red-500">{emailError}</p>}
                       <Link to='/succes'>
                     
                        <button
                            type="submit"
                            className="w-full text-white bg-white-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 "
                        >
                            Reset password
                        </button>
                        </Link>
                        
                    </form>
                </div>
            </div>
        </section></>
    );
}

export default App;  