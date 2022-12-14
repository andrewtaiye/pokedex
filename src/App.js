/* eslint-disable react-hooks/exhaustive-deps */
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
  // eslint-disable-next-line no-unused-vars
  const [dataSet, setDataSet] = useState([]);
  const [displaySet, setDisplaySet] = useState([]);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  // <------------ Get display set from Firebase ------------>
  const initialFetch = async (url) => {
    setIsFetchingData(true);
    // console.log("Fetching Initial Display Data");

    const data = await fetchData(url);

    const dataArray = Object.keys(data).map((key) => data[key]);
    const updatedArray = [...dataArray];

    updatedArray.sort((a, b) => a.id - b.id);

    setDisplaySet(updatedArray);
    setIsFetchingData(false);
    // console.log("Finished Fetching Initial Display Data");
  };

  // <------------ End of get display set from Firebase ------------>

  useEffect(() => {
    let url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="id"&limitToFirst=12`;
    initialFetch(url);

    // url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json`;
    // fetchDataSet(url);
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/home"
          element={
            <Home
              isFetchingData={isFetchingData}
              setIsFetchingData={setIsFetchingData}
              displaySet={displaySet}
              setDisplaySet={setDisplaySet}
              fetchData={fetchData}
              initialFetch={initialFetch}
            />
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
