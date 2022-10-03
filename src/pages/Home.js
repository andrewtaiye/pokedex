import React, { useEffect, useState } from "react";

export default function Home() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [dataSet, setDataSet] = useState([]);

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

      console.log(data);
      //   setDataSet(data.results);
    } catch (error) {
      console.log(error.message);
    }

    setIsFetchingData(false);
    console.log("Finished Fetching Data");
  };

  const btnClick = () => {
    const url =
      "https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json";
    fetchDataSet(url);
  };

  useEffect(() => {
    const url =
      "https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json";
    fetchDataSet(url);
  }, []);

  // <------------ Home return view ------------>
  return (
    <div>
      Home
      <h1>Hello!</h1>
      <button onClick={btnClick}>Click me</button>
    </div>
  );
}
