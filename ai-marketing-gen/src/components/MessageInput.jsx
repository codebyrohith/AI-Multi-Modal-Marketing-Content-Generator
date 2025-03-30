import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const MessageInput = ({ activeTab, selectedChat, setSelectedChat }) => {
  const { userId, addChatResponse, addCustomizedImage } = useAppContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);

    try {
      // MARKETING TAB
      if (activeTab === "marketing") {
        // If the user has selected an existing chat, continue that chat
        if (selectedChat) {
          const response = await axios.post("http://127.0.0.1:5000/api/chat", {
            user_id: selectedChat.user_id,
            prompt: message,
          });

          console.log("Continue chat response:", response.data);

          // Append the new user message and the AI's response to the existing chat array
          const updatedChat = [
            ...selectedChat.chat,
            { role: "user", content: message },
            { role: "assistant", content: response.data.response },
          ];

          // Update the selectedChat with new messages
          setSelectedChat({
            ...selectedChat,
            chat: updatedChat,
          });
        } else {
          // Original marketing flow (unchanged)
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
          // Use your existing addChatResponse to store messages
          addChatResponse(message, response.data.response);
        }
      } else {
        // IMAGE CUSTOMIZATION TAB (unchanged)
        const response = await axios.post(
          "http://c4fc-34-147-26-12.ngrok-free.app/customize",
          { prompt: message }
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
    <form
      className="flex p-4 w-full max-w-3xl mx-auto bg-[#40414F] rounded-xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="flex-1 p-3 text-white bg-transparent placeholder-gray-300 focus:outline-none"
        style={{ backgroundColor: "transparent" }}
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
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg ml-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Send"}
      </button>
    </form>
  );
};

export default MessageInput;
