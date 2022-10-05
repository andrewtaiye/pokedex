/* eslint-disable default-case */
export const capitaliseFirstLetter = (string) => {
  const words = string.split(/ |-/);
  const newWords = [];
  for (let word of words) {
    const arr = word.split("");
    arr[0] = arr[0].toUpperCase();
    newWords.push(arr.join(""));
  }
  return newWords.join(" ");
};

export const setThreeDigits = (number) => {
  switch (true) {
    case number < 10:
      return ["0", "0", number].join("");
    case number < 100:
      return ["0", number].join("");
    default:
      return number;
  }
};

export const pokemonTypes = {
  normal: "168, 168, 120",
  fire: "239, 128, 48",
  fighting: "192, 49, 40",
  water: "103, 144, 240",
  flying: "168, 144, 240",
  grass: "120, 200, 79",
  poison: "159, 65, 160",
  electric: "248, 208, 48",
  ground: "224, 192, 104",
  psychic: "248, 88, 136",
  rock: "184, 160, 57",
  ice: "153, 216, 216",
  bug: "168, 184, 32",
  dragon: "112, 56, 248",
  ghost: "112, 88, 152",
  dark: "112, 88, 72",
  steel: "184, 184, 208",
  fairy: "238, 153, 172",
};
