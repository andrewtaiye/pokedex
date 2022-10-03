import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter, setThreeDigits } from "../components/utility";
import StatModal from "../components/StatModal";

export default function Details(props) {
  const [statModal, setStatModal] = useState(false);
  const { pokemonId } = useParams();

  const pokemonDetails = props.displaySet.find(
    (element) => element.id === parseInt(pokemonId)
  );

  return (
    <>
      <Link to="/home">
        <span className="title">Pokédex</span>
      </Link>

      <div className="details-header row">
        <div className="details-header-left">
          {pokemonId > 1 ? (
            <Link to={`/pokemon/${parseInt(pokemonId) - 1}`}>
              <p>Previous Pokemon</p>
            </Link>
          ) : null}
        </div>

        <div className="details-header-middle">
          <span className="id-details">
            {setThreeDigits(pokemonDetails.id)}
          </span>
          <span className="name-details">
            {capitaliseFirstLetter(pokemonDetails.name)}
          </span>
        </div>

        <div className="details-header-right">
          {pokemonId < 151 ? (
            <Link to={`/pokemon/${parseInt(pokemonId) + 1}`}>
              <p>Next Pokemon</p>
            </Link>
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
          <div className="circle">
            <img
              src={
                pokemonDetails.sprites.other["official-artwork"].front_default
              }
              alt=""
            />
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
                pokemonDetails.abilities.length > 1 ? "Abilities" : "Ability:"
              }`}
            </span>
            {pokemonDetails.abilities.map((element) => {
              return <span>{capitaliseFirstLetter(element.ability.name)}</span>;
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
