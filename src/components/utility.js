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
