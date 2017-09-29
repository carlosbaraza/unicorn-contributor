export function randomInt(max = 10, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const times = nunmberOfIterations => callback => {
  const iterator = index => {
    if (index === nunmberOfIterations) return;
    callback(index);
    iterator(index + 1);
  };
  return iterator(0);
};
