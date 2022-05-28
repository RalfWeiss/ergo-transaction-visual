// see: https://stackoverflow.com/questions/58149627/best-way-to-get-combination-of-array-of-elements-in-ramda
// import * as R from "ramda";

const choose = (n, xs) =>
  n < 1 || n > xs.length       // eslint-disable-line
    ? []
    : n === 1
    ? [...xs.map((x) => [x])]
    : [
        ...choose(n - 1, xs.slice(1)).map((ys) => [xs[0], ...ys]),
        ...choose(n, xs.slice(1)),
      ];

export const getCombsMinMax = (min, max, xs) =>
  xs.length === 0 || min > max
    ? []
    : [...choose(min, xs), ...getCombsMinMax(min + 1, max, xs)];

export const getAllCombbs = (xs: any[]) => getCombsMinMax(1, xs.length, xs);
