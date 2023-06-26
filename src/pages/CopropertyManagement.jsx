import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { CopropertyData } from '../data/dummy';
import { Link } from 'react-router-dom';

const CopropertyManagement = () => {
  const { currentColor, currentMode } = useStateContext();
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className='grid grid-cols-3 gap-y-8 ms-10'>
      {CopropertyData.map((item, index) => (
        <div className='w-full' key={index}>
          <Link to={`/${item.title}`}>
            <div
              className='w-980 h-480 bg-[#f5f5f5] dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl mx-10 shadow-md hover:shadow-xl transition duration-300 transform-gpu hover:scale-105'
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              

              <div className='w-full h-64 overflow-hidden rounded-md'>
                <img className='md:w-96 h-full object-cover' src={item.CopropertyImage} alt='' />
              </div>

              {hoveredItem === index && (
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md'>
                  <p className='text-3xl  text-white'>{item.title}</p>
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CopropertyManagement;
