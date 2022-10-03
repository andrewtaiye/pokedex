// <------------ React Components ------------>
import React, { useEffect, useState } from "react";

// <------------ React Components ------------>
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [displaySet, setDisplaySet] = useState([]);

  // <------------ Get data from Firebase ------------>
  const fetchDataSet = async (url) => {
    setIsFetchingData(true);
    console.log("Fetching Data");

    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setDataSet(data);
      setDisplaySet(data.slice(1, 21));
    } catch (error) {
      console.log(error.message);
    }

    setIsFetchingData(false);
    console.log("Finished Fetching Data");
  };
  // <------------ End of get data from Firebase ------------>

  useEffect(() => {
    const url =
      "https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json";
    fetchDataSet(url);
  }, []);

  // <------------ Home return view ------------>
  return (
    <>
      {isFetchingData && <p>Fetching Data. Please be patient.</p>}
      <h1>Pokédex</h1>
      <div className="display-area grid">
        {displaySet.map((element) => {
          return <PokemonCard {...element} key={Math.random()} />;
        })}
      </div>
    </>
  );
}
