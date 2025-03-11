import React, { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const ImageCustomization = () => {
  const { addCustomizedImage } = useAppContext();
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [customizedImages, setCustomizedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  // const handleCustomize = async () => {
  //   if (!image || !prompt.trim()) {
  //     alert("Please upload an image and enter a customization prompt.");
  //     return;
  //   }

  //   setLoading(true);

  //   // Convert the uploaded image to base64
  //   const convertToBase64 = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
  //       reader.onerror = (error) => reject(error);
  //     });
  //   };

  //   try {
  //     const base64Image = await convertToBase64(image); // Convert image to base64
  //     console.log("Sending request with:", { image: base64Image, prompt });

  //     const response = await axios.post(
  //       "http://ea67-34-126-105-133.ngrok-free.app/customize",
  //       { image: base64Image, prompt }, // Send JSON body with base64 image
  //       {
  //         headers: {
  //           "Content-Type": "application/json", // Correct content type
  //         },
  //       }
  //     );

  //     console.log("Customization Response:", response.data);

  //     if (response.data.success && response.data.image) {
  //       const base64ImageResponse = `data:image/png;base64,${response.data.image}`;
  //       addCustomizedImage(base64ImageResponse, prompt);
  //       setCustomizedImages([...customizedImages, base64ImageResponse]);
  //     } else {
  //       alert(
  //         `Error: Image customization failed. Server Response: ${JSON.stringify(
  //           response.data
  //         )}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Customization failed:", error);
  //     alert(`Failed to customize the image. ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCustomize = async () => {
    if (!image || !prompt.trim()) {
      alert("Please upload an image and enter a customization prompt.");
      return;
    }

    setLoading(true);

    try {
      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1]; // Remove metadata part

        const response = await axios.post(
          "https://477a-34-126-105-133.ngrok-free.app/customize",
          {
            image: base64Image,
            prompt: prompt,
          },
          {
            headers: {
              "Content-Type": "application/json", // Avoids preflight request
            },
          }
        );

        console.log("Customization Response:", response.data);

        if (response.data.success) {
          const customizedImage = `data:image/png;base64,${response.data.image}`;
          addCustomizedImage(customizedImage, prompt);
          setCustomizedImages([...customizedImages, customizedImage]);
        } else {
          alert(
            `Error: Image customization failed. Server Response: ${JSON.stringify(
              response.data
            )}`
          );
        }
      };
    } catch (error) {
      console.error("Customization failed:", error);
      alert(`Failed to customize the image. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Image Customization</h2>

      {/* Upload Section */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer text-4xl">
        <BsFillPlusCircleFill />
      </label>
      {previewURL && (
        <img src={previewURL} className="w-48 h-48 mt-2 rounded-lg shadow-md" />
      )}

      {/* Prompt Input */}
      <input
        type="text"
        className="mt-4 p-2 border rounded-lg w-full"
        placeholder="Enter customization prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Customize Button */}
      <button
        onClick={handleCustomize}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Generating..." : "Customize"}
      </button>

      {/* Display Customized Images */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {customizedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Customized"
            className="w-48 h-48 rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCustomization;
