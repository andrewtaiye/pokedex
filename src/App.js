// <------------ React Components ------------>
import React from "react";
import { Route, Routes } from "react-router-dom";

// <------------ Components ------------>
// eslint-disable-next-line no-unused-vars
import PopulateDatabase from "./components/PopulateDatabase";
import Splash from "./pages/Splash";
import Home from "./pages/Home";

// <------------ Styles ------------>
import "./App.css";

// <------------ Main App ------------>
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PopulateDatabase />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
