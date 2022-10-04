// <------------ React Components ------------>
import React from "react";

// <------------ React Components ------------>
import PokemonCard from "../components/PokemonCard";

export default function Home(props) {
  const handleLoadMoreButtonClick = () => {
    const url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="id"&startAt=${
      props.displaySet.length + 1
    }&endAt=${props.displaySet.length + 12}`;

    props.fetchDisplaySet(url);
  };

  const handleFilterButtonClick = async () => {
    props.setIsFetchingData(true);

    const filteredArray = [];

    let url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="types/0/type/name"&startAt="water"`;
    const firstTypeData = await props.fetchData(url);
    const firstTypeDataArray = Object.keys(firstTypeData).map(
      (key) => firstTypeData[key]
    );
    filteredArray.push(...firstTypeDataArray);

    url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="types/1/type/name"&startAt="water"`;
    const secondTypeData = await props.fetchData(url);
    const secondTypeDataArray = Object.keys(secondTypeData).map(
      (key) => secondTypeData[key]
    );
    filteredArray.push(...secondTypeDataArray);

    filteredArray.sort((a, b) => a.id - b.id);

    props.setDisplaySet(filteredArray);
    props.setIsFetchingData(false);
  };

  // <------------ Home return view ------------>
  return (
    <>
      {props.isFetchingData && <p>Fetching Data. Please be patient.</p>}
      <span className="title">Pokédex</span>
      <div className="load-more">
        <button onClick={handleFilterButtonClick}>Filter</button>
      </div>
      <div className="display-area">
        {props.displaySet.map((element) => {
          return <PokemonCard {...element} key={Math.random()} />;
        })}
      </div>
      {props.displaySet.length === 151 ? null : (
        <div className="load-more">
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        </div>
      )}
      <div className="footer"></div>
    </>
  );
}
