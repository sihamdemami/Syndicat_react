import React from 'react';
import { Link } from 'react-router-dom';
import image from '../data/image1.jpg'

const HomePage = () => {
    return (
        <div className="flex justify-center items-center mt-16 ">
            <div className="w-1/2 flex justify-end ">
                <img
                    className="w-3/4 flex h-96 rounded-lg w-full ml-20"
                    src={image}
                    alt="Votre image"
                />
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="p-8  bg-gray-200 shadow-lg h-100  rounded-lg">
                <br/>
          <br/>

                    <div className="mb-4">
                        <Link
                            to="/propertyInformation"
                            className="flex items-center text-gray-700 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 20a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v16z"
                                />
                            </svg>
                            <div>
                                <h2 className="text-lg font-bold">My Property Management</h2>
                               
                            </div>
                        </Link>
                    </div>
                    <br />
                    <br/>
                    <div>
                        <Link
                            to="/Document"
                            className="flex items-center text-gray-700 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <div>
                                <h2 className="text-lg font-bold">Administrative Documents </h2>
                              
                            </div>
                        </Link>
                        <br/>
          <br/>
                    </div>
                    <br />

                    <div className="mb-4">
                        <Link
                            to="/AllCoproperty"
                            className="flex items-center text-gray-700 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6 mr-2 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            <div>
                                <h2 className="text-lg font-bold">Discover our Coproperties</h2>
                           
                            </div>
                        </Link>
                    </div>
                    <br/>
          <br/>
                   
                </div>
            </div>
        </div>
    );
};

export default HomePage;
