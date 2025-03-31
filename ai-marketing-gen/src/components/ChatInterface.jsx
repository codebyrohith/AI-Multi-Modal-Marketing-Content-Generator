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
      <div className="flex flex-col flex-1 items-center bg-[#343541] p-4">
        <div className="w-full max-w-3xl h-full flex flex-col bg-[#40414F] shadow-md rounded-xl border border-gray-700">
          <div className="flex-1 overflow-y-auto pr-1 h-0 grow">
            <div className="px-4 pb-2">
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
                            <div
                              key={index}
                              className="flex justify-start mb-2"
                            >
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
                    {/* {selectedChat.chat && selectedChat.chat.length > 0 ? (
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
                            <div
                              key={index}
                              className="flex justify-start mb-2"
                            >
                              <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
                                <strong>AI:</strong> {message.content}
                              </div>
                            </div>
                          );
                        }
                      })
                    ) : selectedChat.image_details ? (
                      <div className="flex justify-start mb-2">
                        <div className="bg-gray-200 text-black p-3 rounded-lg max-w-lg shadow-md">
                          <strong>AI:</strong> {selectedChat.image_details}
                        </div>
                      </div>
                    ) : (
                      <p>No messages in this chat yet.</p>
                    )} */}
                  </div>
                </>
              ) : (
                <>
                  {/* If no chat is selected, show the original tab UI */}
                  <div className="flex justify-center mb-4 pt-2">
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
                      <h2 className="text-2xl text-white font-bold mb-4 text-center">
                        Marketing Content Generator
                      </h2>
                      <PictureProcessing />

                      {uploadedImages.map((img, index) => (
                        <div
                          key={index}
                          className="mb-4 border border-none p-4 rounded-lg shadow-lg bg-[#343541]"
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
          </div>

          {/* Pass selectedChat and setSelectedChat to MessageInput */}
          <div className="px-4 pt-2 pb-2">
            <MessageInput
              activeTab={activeTab}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
