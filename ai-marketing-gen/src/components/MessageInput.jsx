// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import axios from "axios";

// const MessageInput = () => {
//   const { userId, addChatResponse } = useAppContext();
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     if (!userId) {
//       alert("Please upload an image first.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/chat", {
//         user_id: userId,
//         prompt: message,
//       });

//       console.log("Chat Response:", response.data);
//       addChatResponse(message, response.data.response);
//     } catch (error) {
//       console.error("Chat failed:", error);
//       alert("Chat request failed! Please try again.");
//     }

//     setMessage("");
//   };

//   return (
//     <form className="flex p-4 w-full" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter prompt for AI..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default MessageInput;

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const MessageInput = ({ activeTab }) => {
  const { userId, addChatResponse, addCustomizedImage } = useAppContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    try {
      if (activeTab === "marketing") {
        if (!userId) {
          alert("Please upload an image first.");
          setLoading(false);
          return;
        }

        const response = await axios.post("http://127.0.0.1:5000/api/chat", {
          user_id: userId,
          prompt: message,
        });

        console.log("Chat Response:", response.data);
        addChatResponse(message, response.data.response);
      } else {
        const response = await axios.post(
          "http://c4fc-34-147-26-12.ngrok-free.app/customize",
          {
            prompt: message,
          }
        );

        console.log("Customized Image Response:", response.data);
        if (response.data.success) {
          addCustomizedImage(response.data.image); // Base64 image
        } else {
          alert("Failed to generate customized image.");
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Request failed! Please try again.");
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <form className="flex p-4 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={
          activeTab === "marketing"
            ? "Enter prompt for AI..."
            : "Describe the image customization..."
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        disabled={loading}
      >
        {loading ? "Processing..." : "Send"}
      </button>
    </form>
  );
};

export default MessageInput;
