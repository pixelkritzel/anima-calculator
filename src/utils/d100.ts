function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default () => getRandomInt(100);
