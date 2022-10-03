// <------------ React Components ------------>
import React from "react";

// <------------ React Components ------------>
import PokemonCard from "../components/PokemonCard";

export default function Home(props) {
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
    </>
  );
}
