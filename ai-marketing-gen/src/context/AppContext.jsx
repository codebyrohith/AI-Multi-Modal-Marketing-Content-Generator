import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [generatedDescriptions, setGeneratedDescriptions] = useState([]);

  // Make sure we trigger updates correctly
  const addNewImage = (imageURL, description) => {
    setUploadedImages((prevImages) => [...prevImages, imageURL]);
    setGeneratedDescriptions((prevDescriptions) => [
      ...prevDescriptions,
      description,
    ]);
  };

  return (
    <AppContext.Provider
      value={{ uploadedImages, generatedDescriptions, addNewImage }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
