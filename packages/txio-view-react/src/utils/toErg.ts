// see: https://stackoverflow.com/questions/54409854/how-to-divide-two-native-javascript-bigints-and-get-a-decimal-result
// https://stackoverflow.com/questions/36369239/rounding-to-an-arbitrary-number-of-significant-digits-in-javascript-is-not-worki
const valFormat = { minimumFractionDigits: 2, maximumFractionDigits: 9 };
export const toErg = (val: bigint) => {
  const num_ = Number((val * BigInt(1000000)) / BigInt(1000000000)) / 1000000;

  const num = Number(num_.toPrecision(4));
  return `${num.toLocaleString(undefined, valFormat)} ERG`;
};
