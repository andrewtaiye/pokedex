import React from "react";
import { Link, useParams } from "react-router-dom";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter, setThreeDigits } from "../components/utility";

export default function Details(props) {
  const { pokemonId } = useParams();

  const pokemonDetails = props.displaySet.find(
    (element) => element.id === parseInt(pokemonId)
  );

  console.log(pokemonDetails);
  return (
    <div>
      <Link to="/home">
        <h1>Pokédex</h1>
      </Link>
      <div className="header">
        <div className="header-left">
          {pokemonId > 1 ? (
            <Link to={`/pokemon/${parseInt(pokemonId) - 1}`}>
              <p>Previous Pokemon</p>
            </Link>
          ) : null}
        </div>
        <div className="header-middle">
          <p>{setThreeDigits(pokemonDetails.id)}</p>
          <p>{capitaliseFirstLetter(pokemonDetails.name)}</p>
        </div>
        <div className="header-right">
          {pokemonId < 151 ? (
            <Link to={`/pokemon/${parseInt(pokemonId) + 1}`}>
              <p>Next Pokemon</p>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="main">
        <div className="main-left">
          <p>Type</p>
          {pokemonDetails.types.map((element) => {
            return `${capitaliseFirstLetter(element.type.name)} `;
          })}
        </div>
        <div className="main-middle">
          <img
            src={pokemonDetails.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
        <div className="main-right">
          <p>Height: {`${pokemonDetails.height / 10}m`}</p>
          <p>Weight: {`${pokemonDetails.weight / 10}kg`}</p>
          <p>
            {`${pokemonDetails.abilities.length > 1 ? "Abilities:" : "Ability:"}
            ${pokemonDetails.abilities.map((element) => {
              return ` ${capitaliseFirstLetter(element.ability.name)}`;
            })}`}
          </p>
          <p>Base Stats</p>
        </div>
      </div>
    </div>
  );
}
