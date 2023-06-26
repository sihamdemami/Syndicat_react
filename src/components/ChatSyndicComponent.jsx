import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const ChatSyndicComponent = ({ id_user }) => {
  const { currentColor } = useStateContext();
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
   
    const fetchChatData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/unseen-messages/${id_user}`);
        const data = await response.json();
        setChatData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChatData();
  }, [id_user]);

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Messages</p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5">
        {chatData?.map((item, index) => (
          <div key={index} className="flex items-center gap-5 border-b-1 border-color p-3 leading-8 cursor-pointer  ">
            <div className="relative">
              <img className="rounded-full h-10 w-10" src= {`http://localhost:8000${item.sender_image}`} alt={item.message_content} />
              <span style={{ background: item.dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-0 -top-1" />
            </div>
            <div>
              <p className="font-semibold dark:text-gray-200">{item.message_content}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{item.sender_first_name} {item.sender_last_name}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{item.time}</p>
            </div>
          </div>
        ))}
        <div className="mt-5">
          <Link to="/Chats">
            <Button color="white" bgColor={currentColor} text="See all messages" borderRadius="10px" width="full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSyndicComponent;
