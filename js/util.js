export const getRandomNumberFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const isEscapeKey = (evt) => evt.key === 'Escape';
