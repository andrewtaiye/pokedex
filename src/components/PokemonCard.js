import React from "react";
import { Link } from "react-router-dom";

// <------------ Utility Components ------------>
import { capitaliseFirstLetter, setThreeDigits } from "../components/utility";

export default function PokemonCard(props) {
  return (
    <Link to={`/pokemon/${props.id}`}>
      <div className="display-card" key={Math.random()}>
        <img
          src={props.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <span className="id-display">{setThreeDigits(props.id)}</span>
        <span className="name-display">
          {capitaliseFirstLetter(props.name)}
        </span>
        <span className="type-display row">
          {props.types.map((element) => {
            return (
              <span
                className="card-type"
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
        </span>
      </div>
    </Link>
  );
}
