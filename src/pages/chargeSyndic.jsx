import React,{useState,useEffect} from 'react';
import CardContainer from './CardContainer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const App = () => {
  const { idCoproperty } = useParams();
  const [cardData,setCardData ]= useState([]);

  const cardsPerPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/chargesCoproperty/${idCoproperty}`);
        const data = await response.json();
        setCardData(data);
       
      
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
   
  }, []);

  return (
    <div className="m-1 md:m-10 mt-24 p-1 md:p-10 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Charge</div>
      <Link to={`/AddCharge/${idCoproperty}`}>
            <button className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add
            </button>
     </Link>
        </div>
        
    <div className='p-14'>
      <CardContainer
        cardsPerPage={cardsPerPage}
        cardData={cardData}
      />
    </div></div>
  );
};

export default App;
