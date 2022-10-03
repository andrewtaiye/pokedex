/* eslint-disable default-case */
export const capitaliseFirstLetter = (string) => {
  const arr = string.split("");
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
};

export const setThreeDigits = (number) => {
  switch (true) {
    case number < 10:
      return ["0", "0", number].join("");
    case number < 100:
      return ["0", number].join("");
  }
};
