// <------------ React Components ------------>
import React from "react";

// <------------ React Components ------------>
import PokemonCard from "../components/PokemonCard";

export default function Home(props) {
  const handleLoadMoreButtonClick = async () => {
    const url = `https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json?orderBy="id"&startAt=${
      props.displaySet.length + 1
    }&endAt=${props.displaySet.length + 12}`;

    props.fetchDisplaySet(url);
  };

  // <------------ Home return view ------------>
  return (
    <>
      {props.isFetchingData && <p>Fetching Data. Please be patient.</p>}
      <span className="title">Pokédex</span>
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
