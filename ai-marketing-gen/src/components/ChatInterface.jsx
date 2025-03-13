// import React from "react";
// import { useAppContext } from "../context/AppContext";
// import MessageInput from "./MessageInput";
// import PictureProcessing from "./PictureProcessing";

// const ChatInterface = () => {
//   const { uploadedImages, marketingContent, chatHistory } = useAppContext();

//   return (
//     <div className="flex flex-col h-screen items-center bg-gray-100">
//       <div className="w-full max-w-3xl flex flex-col flex-1 overflow-auto p-4 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Marketing Content Generator
//         </h2>

//         {/* Image Upload Section */}
//         <PictureProcessing />

//         {/* Display Uploaded Images & Generated Marketing Content */}
//         {uploadedImages.map((img, index) => (
//           <div
//             key={index}
//             className="mb-4 border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
//           >
//             <img
//               src={img}
//               alt="Uploaded"
//               className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
//             />
//             <p className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
//               <strong>Generated Content:</strong> {marketingContent[index]}
//             </p>
//           </div>
//         ))}

//         {/* Chat Messages Section - Centered */}
//         <div className="mt-4 space-y-4">
//           {chatHistory.map((chat, index) => (
//             <div key={index} className="flex flex-col space-y-2">
//               {/* User Prompt - Right Aligned */}
//               <div className="flex justify-end">
//                 <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
//                   <strong>You:</strong> {chat.user}
//                 </div>
//               </div>

//               {/* AI Response - Left Aligned */}
//               <div className="flex justify-start">
//                 <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
//                   <strong>AI:</strong> {chat.ai}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Message Input for Chat */}
//       <div className="w-full max-w-3xl">
//         <MessageInput />
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import MessageInput from "./MessageInput";
// import PictureProcessing from "./PictureProcessing";
// import ImageCustomization from "./ImageCustomization"; // Import the new component

// const ChatInterface = () => {
//   const { uploadedImages, marketingContent, chatHistory, customizedImages } =
//     useAppContext();
//   const [activeTab, setActiveTab] = useState("marketing"); // Tab Switching

//   return (
//     <div className="flex flex-col h-screen items-center bg-gray-100">
//       <div className="w-full max-w-3xl flex flex-col flex-1 overflow-auto p-4 bg-white shadow-lg rounded-lg">
//         {/* Tab Navigation */}
//         <div className="flex justify-center mb-4">
//           <button
//             onClick={() => setActiveTab("marketing")}
//             className={`px-4 py-2 rounded-l-lg ${
//               activeTab === "marketing"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 text-black"
//             }`}
//           >
//             Marketing Content
//           </button>
//           <button
//             onClick={() => setActiveTab("customization")}
//             className={`px-4 py-2 rounded-r-lg ${
//               activeTab === "customization"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-300 text-black"
//             }`}
//           >
//             Image Customization
//           </button>
//         </div>

//         {/* Render Tabs */}
//         {activeTab === "marketing" ? (
//           <>
//             <h2 className="text-2xl font-bold mb-4 text-center">
//               Marketing Content Generator
//             </h2>
//             <PictureProcessing />

//             {uploadedImages.map((img, index) => (
//               <div
//                 key={index}
//                 className="mb-4 border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
//               >
//                 <img
//                   src={img}
//                   alt="Uploaded"
//                   className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
//                 />
//                 <p className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
//                   <strong>Generated Content:</strong> {marketingContent[index]}
//                 </p>
//               </div>
//             ))}

//             <div className="mt-4 space-y-4">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className="flex flex-col space-y-2">
//                   <div className="flex justify-end">
//                     <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
//                       <strong>You:</strong> {chat.user}
//                     </div>
//                   </div>
//                   <div className="flex justify-start">
//                     <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
//                       <strong>AI:</strong> {chat.ai}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//             <ImageCustomization /> {/* Use ImageCustomization Here */}
//           </>
//         )}
//       </div>

//       {/* Message Input for Chat */}
//       <div className="w-full max-w-3xl">
//         <MessageInput activeTab={activeTab} />
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import MessageInput from "./MessageInput";
// import PictureProcessing from "./PictureProcessing";
// import ImageCustomization from "./ImageCustomization";
// import Sidebar from "./SideBar";

// const ChatInterface = () => {
//   const { uploadedImages, marketingContent, chatHistory } = useAppContext();
//   const [activeTab, setActiveTab] = useState("marketing");
//   const [selectedChat, setSelectedChat] = useState(null);

//   const handleSelectChat = (chatData) => {
//     // chatData contains { user_id, chat: [...], image_base64: ... }
//     setSelectedChat(chatData);
//   };

//   const handleBack = () => {
//     setSelectedChat(null);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar onSelectChat={handleSelectChat} />

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1 items-center bg-gray-100 p-4">
//         <div className="w-full max-w-3xl flex flex-col flex-1 overflow-auto p-4 bg-white shadow-lg rounded-lg">
//           {selectedChat ? (
//             <>
//               {/* If a chat is selected, show that chat's details */}
//               <button
//                 onClick={handleBack}
//                 className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Back
//               </button>
//               {selectedChat.image_base64 && (
//                 <img
//                   src={`data:image/jpeg;base64,${selectedChat.image_base64}`}
//                   alt="Uploaded"
//                   className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
//                 />
//               )}

//               <div className="mt-4 space-y-4">
//                 {selectedChat.chat && selectedChat.chat.length > 0 ? (
//                   selectedChat.chat.map((chat, index) => (
//                     <div key={index} className="flex flex-col space-y-2">
//                       <div className="flex justify-end">
//                         <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
//                           <strong>You:</strong> {chat.user}
//                         </div>
//                       </div>
//                       <div className="flex justify-start">
//                         <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
//                           <strong>AI:</strong> {chat.ai}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No messages in this chat yet.</p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               {/* If no chat is selected, show the original tab UI */}
//               <div className="flex justify-center mb-4">
//                 <button
//                   onClick={() => setActiveTab("marketing")}
//                   className={`px-4 py-2 rounded-l-lg ${
//                     activeTab === "marketing"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-black"
//                   }`}
//                 >
//                   Marketing Content
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("customization")}
//                   className={`px-4 py-2 rounded-r-lg ${
//                     activeTab === "customization"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-black"
//                   }`}
//                 >
//                   Image Customization
//                 </button>
//               </div>

//               {activeTab === "marketing" ? (
//                 <>
//                   <h2 className="text-2xl font-bold mb-4 text-center">
//                     Marketing Content Generator
//                   </h2>
//                   <PictureProcessing />

//                   {uploadedImages.map((img, index) => (
//                     <div
//                       key={index}
//                       className="mb-4 border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
//                     >
//                       <img
//                         src={img}
//                         alt="Uploaded"
//                         className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
//                       />
//                       <p className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
//                         <strong>Generated Content:</strong>{" "}
//                         {marketingContent[index]}
//                       </p>
//                     </div>
//                   ))}

//                   <div className="mt-4 space-y-4">
//                     {chatHistory.map((chat, index) => (
//                       <div key={index} className="flex flex-col space-y-2">
//                         <div className="flex justify-end">
//                           <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
//                             <strong>You:</strong> {chat.user}
//                           </div>
//                         </div>
//                         <div className="flex justify-start">
//                           <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
//                             <strong>AI:</strong> {chat.ai}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <ImageCustomization />
//                 </>
//               )}
//             </>
//           )}
//         </div>

//         {/* Message Input for Chat */}
//         <div className="w-full max-w-3xl">
//           <MessageInput activeTab={activeTab} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import MessageInput from "./MessageInput";
// import PictureProcessing from "./PictureProcessing";
// import ImageCustomization from "./ImageCustomization";
// import Sidebar from "./SideBar";

// const ChatInterface = () => {
//   const { uploadedImages, marketingContent, chatHistory } = useAppContext();
//   const [activeTab, setActiveTab] = useState("marketing");
//   const [selectedChat, setSelectedChat] = useState(null);

//   const handleSelectChat = (chatData) => {
//     // chatData contains { user_id, chat: [...], image_base64: ... }
//     setSelectedChat(chatData);
//   };

//   const handleBack = () => {
//     setSelectedChat(null);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar (only rendered once) */}
//       <Sidebar onSelectChat={handleSelectChat} />

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1 items-center bg-gray-100 p-4">
//         <div className="w-full max-w-3xl flex flex-col flex-1 overflow-auto p-4 bg-white shadow-lg rounded-lg">
//           {selectedChat ? (
//             <>
//               {/* If a chat is selected, show that chat's details */}
//               <button
//                 onClick={handleBack}
//                 className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Back
//               </button>

//               {/* Display the uploaded image if available */}
//               {selectedChat.image_base64 && (
//                 <img
//                   src={`data:image/jpeg;base64,${selectedChat.image_base64}`}
//                   alt="Uploaded"
//                   className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
//                 />
//               )}

//               {/* Display the chat messages using the new "role" & "content" fields */}
//               <div className="mt-4 space-y-4">
//                 {selectedChat.chat && selectedChat.chat.length > 0 ? (
//                   selectedChat.chat.map((message, index) => {
//                     if (message.role === "user") {
//                       // User's message on the right
//                       return (
//                         <div key={index} className="flex justify-end mb-2">
//                           <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
//                             <strong>You:</strong> {message.content}
//                           </div>
//                         </div>
//                       );
//                     } else {
//                       // Assistant's message on the left
//                       return (
//                         <div key={index} className="flex justify-start mb-2">
//                           <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
//                             <strong>AI:</strong> {message.content}
//                           </div>
//                         </div>
//                       );
//                     }
//                   })
//                 ) : (
//                   <p>No messages in this chat yet.</p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               {/* If no chat is selected, show the original tab UI */}
//               <div className="flex justify-center mb-4">
//                 <button
//                   onClick={() => setActiveTab("marketing")}
//                   className={`px-4 py-2 rounded-l-lg ${
//                     activeTab === "marketing"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-black"
//                   }`}
//                 >
//                   Marketing Content
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("customization")}
//                   className={`px-4 py-2 rounded-r-lg ${
//                     activeTab === "customization"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-black"
//                   }`}
//                 >
//                   Image Customization
//                 </button>
//               </div>

//               {activeTab === "marketing" ? (
//                 <>
//                   <h2 className="text-2xl font-bold mb-4 text-center">
//                     Marketing Content Generator
//                   </h2>
//                   <PictureProcessing />

//                   {uploadedImages.map((img, index) => (
//                     <div
//                       key={index}
//                       className="mb-4 border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
//                     >
//                       <img
//                         src={img}
//                         alt="Uploaded"
//                         className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
//                       />
//                       <p className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
//                         <strong>Generated Content:</strong>{" "}
//                         {marketingContent[index]}
//                       </p>
//                     </div>
//                   ))}

//                   <div className="mt-4 space-y-4">
//                     {chatHistory.map((chat, index) => (
//                       <div key={index} className="flex flex-col space-y-2">
//                         <div className="flex justify-end">
//                           <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
//                             <strong>You:</strong> {chat.user}
//                           </div>
//                         </div>
//                         <div className="flex justify-start">
//                           <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
//                             <strong>AI:</strong> {chat.ai}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <ImageCustomization />
//                 </>
//               )}
//             </>
//           )}
//         </div>

//         {/* Message Input for Chat */}
//         <div className="w-full max-w-3xl">
//           <MessageInput activeTab={activeTab} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import MessageInput from "./MessageInput";
import PictureProcessing from "./PictureProcessing";
import ImageCustomization from "./ImageCustomization";
import Sidebar from "./SideBar";

const ChatInterface = () => {
  const { uploadedImages, marketingContent, chatHistory } = useAppContext();
  const [activeTab, setActiveTab] = useState("marketing");
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chatData) => {
    setSelectedChat(chatData);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelectChat={handleSelectChat} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 items-center bg-gray-100 p-4">
        <div className="w-full max-w-3xl flex flex-col flex-1 overflow-auto p-4 bg-white shadow-lg rounded-lg">
          {selectedChat ? (
            <>
              <button
                onClick={handleBack}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>

              {selectedChat.image_base64 && (
                <img
                  src={`data:image/jpeg;base64,${selectedChat.image_base64}`}
                  alt="Uploaded"
                  className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
                />
              )}

              <div className="mt-4 space-y-4">
                {selectedChat.chat && selectedChat.chat.length > 0 ? (
                  selectedChat.chat.map((message, index) => {
                    if (message.role === "user") {
                      return (
                        <div key={index} className="flex justify-end mb-2">
                          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
                            <strong>You:</strong> {message.content}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={index} className="flex justify-start mb-2">
                          <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
                            <strong>AI:</strong> {message.content}
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <p>No messages in this chat yet.</p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* If no chat is selected, show the original tab UI */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setActiveTab("marketing")}
                  className={`px-4 py-2 rounded-l-lg ${
                    activeTab === "marketing"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  Marketing Content
                </button>
                <button
                  onClick={() => setActiveTab("customization")}
                  className={`px-4 py-2 rounded-r-lg ${
                    activeTab === "customization"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  Image Customization
                </button>
              </div>

              {activeTab === "marketing" ? (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Marketing Content Generator
                  </h2>
                  <PictureProcessing />

                  {uploadedImages.map((img, index) => (
                    <div
                      key={index}
                      className="mb-4 border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
                    >
                      <img
                        src={img}
                        alt="Uploaded"
                        className="w-48 h-48 object-cover rounded-lg shadow-md mx-auto"
                      />
                      <p className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                        <strong>Generated Content:</strong>{" "}
                        {marketingContent[index]}
                      </p>
                    </div>
                  ))}

                  <div className="mt-4 space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className="flex flex-col space-y-2">
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-lg shadow-md">
                            <strong>You:</strong> {chat.user}
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
                            <strong>AI:</strong> {chat.ai}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <ImageCustomization />
              )}
            </>
          )}
        </div>

        {/* Pass selectedChat and setSelectedChat to MessageInput */}
        <div className="w-full max-w-3xl">
          <MessageInput
            activeTab={activeTab}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
