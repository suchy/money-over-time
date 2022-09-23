export const getRandomColor = () => {
  const maxValue = 0xffffff;
  const randomNumber = Math.random() * maxValue;
  const randomHex = Math.floor(randomNumber)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();

  return '#' + randomHex;
};
