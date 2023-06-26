import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatComponent({ idCoproperty, id_user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [idCoproperty]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/getUserbycoproperty/${idCoproperty}`
      );
      setUsers(response.data);
      if (response.data.length > 0) {
        setSelectedUser(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    const recipientId = selectedUser ? selectedUser.id_user : null;
    try {
      const responseReceived = await axios.get(
        `http://127.0.0.1:8000/api/messages?sender_id=${recipientId}&receiver_id=${id_user}`
      );
      const responseSent = await axios.get(
        `http://127.0.0.1:8000/api/messages?sender_id=${id_user}&receiver_id=${recipientId}`
      );

      const receivedMessages = responseReceived.data.map((message) => ({
        ...message,
        sentByCurrentUser: false,
      }));

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
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/messages", {
        content: newMessage,
        receiver_id: selectedUser.id_user,
        sender_id: id_user,
      });
      setMessages([...messages, { ...response.data, sentByCurrentUser: true }]);
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    markMessageAsRead(user.id);
  };

  const searchUsers = (query) => {
    const filteredUsers = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(query.toLowerCase()) ||
        user.lastname.toLowerCase().includes(query.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    searchUsers(searchQuery);
  };

  return (
    <div className="container mx-auto shadow-lg rounded-lg h-300 pt-12 dark:bg-gray-600">
      {/* Header */}
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2 dark:text-white ">
        <div className="font-semibold text-2xl">GoingChat</div>
        <div className="w-1/2">
         
        </div>
       
      </div>
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white">
        {/* Chat list */}
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          {/* Search component */}
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              onChange={handleSearchChange}
            />
          </div>
          {/* User list */}
          {users.map((user) => (
            <div
              key={user.id_user}
              className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${
                selectedUser && selectedUser.id_user === user.id_user
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => handleUserClick(user)}
            >
              <div className="w-1/4">
                <img
                  src={`http://localhost:8000${user.image}`}
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">
                  {user.firstname} {user.lastname}
                </div>
               
              </div>
            </div>
          ))}
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
        <div className="w-2/5 border-l-2 px-5">
          <div className="flex flex-col">
            {selectedUser && (
              <div>
                <div className="font-semibold text-xl py-4">
                  {selectedUser.firstname} {selectedUser.lastname}
                </div>
                <img
                  src={`http://localhost:8000${selectedUser.image}`}
                  className="object-cover rounded-xl h-64"
                  alt=""
                />
                <div className="py-4">{selectedUser.bio}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
