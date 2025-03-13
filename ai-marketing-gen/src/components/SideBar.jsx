// import React from "react";

// const SideBar = () => {
//   return (
//     <div className="w-64 bg-gray-800 text-white p-4 h-screen">
//       <h2 className="text-2xl font-bold mb-4">Chat History</h2>
//       <ul>
//         <li className="mb-2">HOLA</li>
//       </ul>
//     </div>
//   );
// };

// export default SideBar;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/get_all_chats"
        );
        if (response.data.chats) {
          setChats(response.data.chats);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/get_chat/${userId}`
      );
      if (response.data) {
        onSelectChat(response.data); // Pass the entire chat object (image_base64, chat array, etc.)
      }
    } catch (error) {
      console.error("Error fetching chat details:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Chat History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {chats.map((chatItem, index) => (
            <li
              key={index}
              className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => handleChatClick(chatItem.user_id)}
            >
              {chatItem.chat && chatItem.chat.length > 0
                ? // If there's at least one user message, show it
                  chatItem.chat[0].user || `Chat ${index + 1}`
                : // Otherwise, show a default label
                  `Chat ${index + 1}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
