import React, { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        <div className="flex-1">
          <ChatInterface />
        </div>
      </div>
    </>
  );
}

export default App;
