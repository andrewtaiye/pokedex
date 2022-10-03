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
        <p>{setThreeDigits(props.id)}</p>
        <p>{capitaliseFirstLetter(props.name)}</p>
        <p>
          {props.types.map((element) => {
            return `${capitaliseFirstLetter(element.type.name)} `;
          })}
        </p>
      </div>
    </Link>
  );
}
