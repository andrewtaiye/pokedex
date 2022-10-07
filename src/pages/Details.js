import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter, setThreeDigits } from "../components/utility";

// <------------ Components ------------>
import StatModal from "../components/StatModal";

export default function Details(props) {
  const [statModal, setStatModal] = useState(false);
  const { pokemonId } = useParams();

  const pokemonDetails = props.displaySet.find(
    (element) => element.id === parseInt(pokemonId)
  );

  const prevPokemon = props.displaySet.find(
    (element) => element.id === parseInt(pokemonId) - 1
  );

  const nextPokemon = props.displaySet.find(
    (element) => element.id === parseInt(pokemonId) + 1
  );

  const idArray = props.displaySet.map((element) => element.id);
  console.log(idArray.indexOf(parseInt(pokemonId)), pokemonId);

  return (
    <>
      <Link to="/home">
        <span className="title">Pokédex</span>
      </Link>
      <div className="details-header row">
        <div className="details-header-left row">
          {idArray.indexOf(parseInt(pokemonId)) > 0 ? (
            <>
              <Link to={`/pokemon/${parseInt(pokemonId) - 1}`}>
                <svg width="60px" height="60px">
                  <polyline
                    points="35 20, 20 30, 20 31, 35 40"
                    stroke="#cbdafd"
                    fill="transparent"
                  />
                  <circle
                    className="nav-button"
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="#cbdafd"
                    fill="transparent"
                  />
                </svg>
              </Link>
              <span className="prev-pokemon">
                {capitaliseFirstLetter(prevPokemon.name)}
              </span>
            </>
          ) : null}
        </div>

        <div className="details-header-middle col">
          <span className="id-details">
            {setThreeDigits(pokemonDetails.id)}
          </span>
          <span className="name-details">
            {capitaliseFirstLetter(pokemonDetails.name)}
          </span>
        </div>

        <div className="details-header-right">
          {idArray.indexOf(parseInt(pokemonId)) <
          props.displaySet.length - 1 ? (
            <>
              <span className="next-pokemon">
                {capitaliseFirstLetter(nextPokemon.name)}
              </span>
              <Link to={`/pokemon/${parseInt(pokemonId) + 1}`}>
                <svg width="60px" height="60px">
                  <polyline
                    points="25 20, 40 30, 40 31, 25 40"
                    stroke="#cbdafd"
                    fill="transparent"
                  />
                  <circle
                    className="nav-button"
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="#cbdafd"
                    fill="transparent"
                  />
                </svg>
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <div className="details-main row">
        <div className="details-main-left">
          <span className="header-text header-type">Type</span>
          {pokemonDetails.types.map((element, index) => {
            return (
              <span
                className={`details-type type-${index}`}
                style={{
                  backgroundColor: `rgb(var(--${element.type.name}))`,
                  boxShadow: `0 0 10px 2px rgba(var(--${element.type.name}), 0.4)`,
                }}
                key={Math.random()}
              >
                {capitaliseFirstLetter(element.type.name)}
              </span>
            );
          })}
        </div>

        <div className="details-main-middle">
          <div
            className="circle"
            style={
              pokemonDetails.types.length > 1
                ? {
                    backgroundImage: `linear-gradient(to bottom right, rgb(var(--${pokemonDetails.types[0].type.name})), rgb(var(--${pokemonDetails.types[1].type.name})))`,
                  }
                : {
                    backgroundImage: `linear-gradient(to bottom right, rgb(var(--${pokemonDetails.types[0].type.name})), rgb(var(--${pokemonDetails.types[0].type.name})))`,
                  }
            }
          >
            <div className="img-container">
              <img
                src={
                  pokemonDetails.sprites.other["official-artwork"].front_default
                }
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="details-main-right">
          <div className="details-height-weight row">
            <div className="details-height col">
              <span className="header-text">Height</span>
              {`${pokemonDetails.height / 10}m`}
            </div>
            <div className="details-weight col">
              <span className="header-text">Weight</span>
              {`${pokemonDetails.weight / 10}kg`}
            </div>
          </div>

          <div className="details-abilities col">
            <span className="header-text">
              {`${
                pokemonDetails.abilities.length > 1 ? "Abilities" : "Ability"
              }`}
            </span>
            {pokemonDetails.abilities.map((element) => {
              return (
                <span key={Math.random()}>
                  {capitaliseFirstLetter(element.ability.name)}
                </span>
              );
            })}
          </div>

          <div className="details-base-stats">
            {/* prettier-ignore */}
            <span className="details-base-stats-text" onClick={() => {setStatModal(true)}}>Base Stats</span>
          </div>
        </div>

        {statModal && (
          <StatModal onClick={setStatModal} stats={pokemonDetails.stats} />
        )}
      </div>
    </>
  );
}
