import React from "react";
import { useAppContext } from "../context/AppContext";
import MessageInput from "./MessageInput";
import PictureProcessing from "./PictureProcessing";

const ChatInterface = () => {
  const { uploadedImages, generatedDescriptions } = useAppContext();

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Generated Content</h2>

        {/* Include PictureProcessing at the top */}
        <PictureProcessing />

        {/* Display Uploaded Images & Generated Descriptions */}
        {uploadedImages.length > 0 ? (
          uploadedImages.map((img, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-300 p-4 rounded-lg shadow-lg"
            >
              <img
                src={img}
                alt={`Uploaded ${index}`}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
              <p className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                <strong>Generated Description:</strong> {generatedDescriptions}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No images uploaded yet.</p>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatInterface;
