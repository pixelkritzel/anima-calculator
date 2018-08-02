function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const d100 = () => getRandomInt(100);

export default function rollD100() {
  let rolls = 0;
  let currentRoll = d100();
  let result = currentRoll;
  if (result < 4) {
    const penaltyRoll = d100();
    switch (result) {
      case 1:
        return -(penaltyRoll + 15);
      case 2:
        return -penaltyRoll;
      case 3:
        return -(penaltyRoll - 15);
      default:
        return 0;
    }
  }
  if (currentRoll < 90) {
    return result;
  }
  while (currentRoll >= 90 + rolls) {
    currentRoll = d100();
    result += currentRoll;
    rolls++;
  }
  return result;
}
