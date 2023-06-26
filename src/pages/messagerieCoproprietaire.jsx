import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatComponent({ idCoproperty, id_user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [id_syndic, setidsyndic] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [idCoproperty]);

  useEffect(() => {
    if (users) {
      fetchMessages();
    }
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/coproperty/syndic/${idCoproperty}`
      );
      setUsers(response.data);
      setidsyndic(response.data.id_user);
      console.log(id_user);
    
    } catch (error) {
      console.error(error);
    }
  };

  
     
      const fetchMessages = async () => {
        try {
          const responseReceived = await axios.get(
            `http://127.0.0.1:8000/api/getMessagesreceiver?receiver_id=${id_user}`
          );
          const responseSent = await axios.get(
            `http://127.0.0.1:8000/api/getMessagessender?sender_id=${id_user}`
          );
      
          const receivedMessages = responseReceived.data.map((message) => ({
            ...message,
            sentByCurrentUser: false,
          }));
          console.log(receivedMessages)
      
          const sentMessages = responseSent.data.map((message) => ({
            ...message,
            sentByCurrentUser: true,
          }));
      
          const allMessages = [...receivedMessages, ...sentMessages];
          // Tri des messages par date_sent (du plus ancien au plus récent)
          const sortedMessages = allMessages.sort((a, b) =>
            new Date(a.date_sent) - new Date(b.date_sent)
          );
          setMessages(sortedMessages);
          console.log(messages)
        } catch (error) {
          console.error(error);
        }
      };
      

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/messages",
        {
          content: newMessage,
          receiver_id: id_syndic,
          sender_id: id_user,
        }
      );
      setMessages([
        ...messages,
        { ...response.data, sentByCurrentUser: true },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/messages/mark-as-read/${messageId}`
      );
      const updatedMessages = messages.map((message) => {
        if (!message.sentByCurrentUser && message.id === messageId) {
          return { ...message, seen_yn: 1 };
        }
        return message;
      });
      setMessages(updatedMessages);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="container mx-auto shadow-lg rounded-lg h-full dark:bg-gray-800">
      {/* Header */}
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-1 dark:bg-gray-800 pt-12">
        <div className="font-semibold text-2xl dark:text-white">GoingChat</div>
        
        
      </div>
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white dark:bg-gray-800 border-r-2 ">
        {/* Chat list */}
        <div className="flex flex-col w-2/5  overflow-y-auto dark:bg-gray-600 bg-gray-200">
          {/* Search component */}
         
          <div
            className="flex flex-row py-4 px-2 justify-center items-center  "
          >
            <div className="w-1/4">
              <img
                src={`http://localhost:8000${users.image}`}
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold dark:text-white">
                {users.firstname} {users.lastname}
              </div>
              <span className="text-gray-500 dark:text-white"></span>
            </div>
          </div>
        </div>
        {/* Message */}
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            {/* Chat messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sentByCurrentUser ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`mr-2 py-3 px-4 ${
                    message.sentByCurrentUser
                      ? "bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                      : "bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
                  }`}
                >
                  {message.content}
                </div>
                {!message.sentByCurrentUser && message.seen_yn !== 1 && (
                  <button
                    className="text-xs text-gray-500 mt-1"
                    onClick={() => markMessageAsRead(message.id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Input message */}
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
        {/* Sidebar */}
      
      </div>
    </div>
  );
}

export default ChatComponent;
