import React, { useState } from 'react';
import Card from './Card';
import { BiFirstPage, BiLastPage } from 'react-icons/bi'

const CardContainer = ({ cardsPerPage, cardData }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const sortedCardData = cardData.sort((a, b) => b.month.localeCompare(a.month));



    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = cardData.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-col items-center w-full h-96">
            <div className="card-container w-full h-96 pl-36">
                {currentCards.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        month={card.month}
                        id_copropriete={card.id_copropriete}
                        amount={card.montant}
                      
                        className="w-full h-96" 
                    />
                ))}
            </div>
         <div className="flex justify-center mt-4 pr-46">
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer" onClick={previousPage}>
                    <BiFirstPage size={40} />

                </div>
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer" onClick={nextPage}>
                    <BiLastPage size={40} />

                </div>
            </div>
        </div>
    );
};

export default CardContainer;
