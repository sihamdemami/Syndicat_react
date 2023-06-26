import React,{useState,useEffect} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NotificationCoproprietaireComponent = ({idCoproperty}) => {
  const { currentColor } = useStateContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    
    const fetchEvents = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/coproperties/newevent/${idCoproperty}`); 
      const data = await response.json();
      setEvents(data);
      
    };

    fetchEvents();
  }, []);

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 h-100">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Events</p>
          
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className="overflow-y-auto h-64">
        {events.map((item, index) => (
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
            
            <div>
              <p className="font-semibold dark:text-gray-200">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="mt-10">
          <Link to="/calendar">
            <Button color="white" bgColor={currentColor} text="See all notifications" borderRadius="10px" width="full" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotificationCoproprietaireComponent;
