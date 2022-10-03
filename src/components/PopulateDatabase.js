import React, { useState } from "react";

export default function PopulateDatabase() {
  const [pokemon, setPokemon] = useState("");
  const [dataSet, setDataSet] = useState("");

  const fetchAndPatchPokemonData = async (url) => {
    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setPokemon(data);

      patchPokemonData(
        "https://andrewtai-school-project-default-rtdb.asia-southeast1.firebasedatabase.app/.json",
        { [data.id]: data }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDataSet = async (url) => {
    try {
      const res = await fetch(url);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();

      setDataSet(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const patchPokemonData = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };

  const pullDataSet = () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=1154";
    fetchDataSet(url);
  };

  const pullAndPatchPokemonData = () => {
    for (let i = 0; i < dataSet.length; i++) {
      fetchAndPatchPokemonData(dataSet[i].url);
    }
  };

  const capitaliseFirstLetter = (string) => {
    const arr = string.split("");
    arr[0] = arr[0].toUpperCase();
    return arr.join("");
  };

  return (
    <div>
      {pokemon && (
        <>
          <p>PokeDex ID: {pokemon.id}</p>
          <img src={pokemon.sprites.front_default} alt="Bulbasaur" />
          <p>Name: {capitaliseFirstLetter(pokemon.name)}</p>
          <p>Types:</p>
          <ul>
            {pokemon.types.map((element) => {
              return (
                <li key={Math.random()}>
                  {capitaliseFirstLetter(element.type.name)}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <button onClick={pullDataSet}>Pull Data</button>
      <button onClick={pullAndPatchPokemonData}>Pull Pokemon Data</button>
    </div>
  );
}

// const testData = {
//   users: {
//     user1: {
//       details: {
//         age: 5,
//         gender: "male",
//         dateOfBirth: "2022-09-28",
//         profilePicture:
//           "https://freepngimg.com/thumb/emoji/4-2-smiling-face-with-sunglasses-cool-emoji-png.png",
//       },
//       roles: {
//         role1: {
//           name: "janitor",
//         },
//         role2: {
//           name: "dishwasher",
//         },
//         role3: {
//           name: "chef",
//         },
//       },
//     },
//   },
// };
