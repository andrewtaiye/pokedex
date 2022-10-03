// <------------ React Components ------------>
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// <------------ Components ------------>
// eslint-disable-next-line no-unused-vars
import PopulateDatabase from "./components/PopulateDatabase";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";

// <------------ Styles ------------>
import "./App.css";

// <------------ Main App ------------>
export default function App() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [displaySet, setDisplaySet] = useState([]);

  // <------------ Get display set from Firebase ------------>
  const fetchDisplaySet = async (url) => {
    setIsFetchingData(true);
    console.log("Fetching Initial Display Data");

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      const dataArray = Object.keys(data).map((key) => data[key]);

      console.log(dataArray);
      setDisplaySet(dataArray);
    } catch (error) {
      console.log(error.message);
    }

    setIsFetchingData(false);
    console.log("Finished Fetching Initial Display Data");
  };
  // <------------ End of get data from Firebase ------------>

  // <------------ Get data set from Firebase ------------>
  const fetchDataSet = async (url) => {
    setIsFetchingData(true);
    console.log("Fetching Main Data Set");

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      console.log(data);
      setDisplaySet(data);
    } catch (error) {
      console.log(error.message);
    }

    setIsFetchingData(false);
    console.log("Finished Fetching Main Data Set");
  };
  // <------------ End of get data from Firebase ------------>

  useEffect(() => {
    let url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="id"&limitToFirst=12`;
    fetchDisplaySet(url);

    url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json`;
    fetchDataSet(url);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/home"
          element={
            <Home
              isFetchingData={isFetchingData}
              setIsFetchingData={setIsFetchingData}
              displaySet={displaySet}
            />
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}
