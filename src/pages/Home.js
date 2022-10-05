// <------------ React Components ------------>
import React, { useRef, useState } from "react";

// <------------ React Components ------------>
import PokemonCard from "../components/PokemonCard";
import Button from "../components/Button";

// <------------ Utility Components ------------>
import { pokemonTypes } from "../components/utility";

export default function Home(props) {
  const [isFiltered, setIsFiltered] = useState(false);
  const selectedTypes = useRef([]);

  const handleLoadMoreButtonClick = async () => {
    props.setIsFetchingData(true);

    const url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="id"&startAt=${
      props.displaySet.length + 1
    }&endAt=${props.displaySet.length + 12}`;

    const data = await props.fetchData(url);

    const dataArray = Object.keys(data).map((key) => data[key]);
    const updatedArray = [...props.displaySet, ...dataArray];

    updatedArray.sort((a, b) => a.id - b.id);

    props.setDisplaySet(updatedArray);

    props.setIsFetchingData(false);
  };

  const handleFilterButtonClick = async () => {
    if (selectedTypes.current.length === 0) {
      await props.initialFetch(
        `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="id"&limitToFirst=12`
      );
      setIsFiltered(false);
      return;
    }

    props.setIsFetchingData(true);

    const filteredArray = [];

    for (const type of selectedTypes.current) {
      // const mergedArray = [];

      let url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="types/0/type/name"&startAt="${type}"&endAt="${type}"`;
      const firstTypeData = await props.fetchData(url);
      const firstTypeDataArray = Object.keys(firstTypeData).map(
        (key) => firstTypeData[key]
      );
      filteredArray.push(...firstTypeDataArray);

      url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="types/1/type/name"&startAt="${type}"&endAt="${type}"`;
      const secondTypeData = await props.fetchData(url);
      const secondTypeDataArray = Object.keys(secondTypeData).map(
        (key) => secondTypeData[key]
      );
      filteredArray.push(...secondTypeDataArray);
    }

    filteredArray.sort((a, b) => a.id - b.id);

    for (let i = 0; i < filteredArray.length; i++) {
      filteredArray[i] = JSON.stringify(filteredArray[i]);
    }

    const uniqueArray = [...new Set(filteredArray)];

    for (let i = 0; i < uniqueArray.length; i++) {
      uniqueArray[i] = JSON.parse(uniqueArray[i]);
    }

    props.setDisplaySet(uniqueArray);

    props.setIsFetchingData(false);

    setIsFiltered(true);
  };

  // <------------ Home return view ------------>
  return (
    <>
      {props.isFetchingData && <p>Fetching Data. Please be patient.</p>}
      <span className="title">Pokédex</span>
      <div className="filter-section">
        <div className="filter-type-toggle">
          {Object.keys(pokemonTypes).map((key) => {
            return (
              <div className="filter-type-toggle-btn-container">
                <Button
                  key={Math.random()}
                  type={key}
                  colorValue={pokemonTypes[key]}
                  ref={selectedTypes}
                />
              </div>
            );
          })}
        </div>
        <button className="filter-button" onClick={handleFilterButtonClick}>
          Filter
        </button>
      </div>
      <div className="display-area">
        {props.displaySet.map((element) => {
          return <PokemonCard {...element} key={Math.random()} />;
        })}
      </div>
      {props.displaySet.length === 151 || isFiltered ? null : (
        <div className="load-more">
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        </div>
      )}
      <div className="footer"></div>
    </>
  );
}
