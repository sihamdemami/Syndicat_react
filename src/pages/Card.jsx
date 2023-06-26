import React from 'react';
import { FaCalendarAlt, FaMoneyBill } from 'react-icons/fa';
import { BsBuildings } from 'react-icons/bs';

const Card = ({ title, content, month, amount, id_copropriete}) => {
  return (
    <div style={{ maxWidth: '50%' }} className="flex flex-col justify-center items-center rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
      <div className="flex flex-col justify-start p-6 w-full">
        <p className="mb-2 text-2xl font-bold text-neutral-800 dark:text-neutral-50">
          {title}
        </p>
        
        <div className="flex items-center mb-2">
          <BsBuildings className="mr-2 text-neutral-600 dark:text-neutral-300" />
          <p className="text-m text-neutral-500 dark:text-neutral-300">
            {id_copropriete}
          </p>
        </div>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {content}
        </p>
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="mr-2 text-neutral-600 dark:text-neutral-300" />
          <p className="text-m text-neutral-500 dark:text-neutral-300">
            {month}
          </p>
        </div>
        <br/>
        <div className="flex items-center">
          <FaMoneyBill className="mr-2 text-neutral-500 dark:text-neutral-300" />
          <p className="text-m text-neutral-500 dark:text-neutral-300">
            {amount}
          </p>
        </div>
        <br/>
        </div>
    </div>
  );
};

export default Card;
