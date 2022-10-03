// <------------ React Components ------------>
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// <------------ Components ------------>
// eslint-disable-next-line no-unused-vars
import PopulateDatabase from "./components/PopulateDatabase";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Details from "./pages/Details";

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

      setDisplaySet(dataArray);
    } catch (error) {
      console.log(error.message);
    }

    setIsFetchingData(false);
    console.log("Finished Fetching Initial Display Data");
  };
  // <------------ End of get displya set from Firebase ------------>

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

      setDataSet(data);
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
    <div className="container">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/home"
          element={
            <Home isFetchingData={isFetchingData} displaySet={displaySet} />
          }
        />
        <Route
          path="/pokemon/:pokemonId"
          element={<Details dataSet={dataSet} displaySet={displaySet} />}
        />
      </Routes>
    </div>
  );
}
