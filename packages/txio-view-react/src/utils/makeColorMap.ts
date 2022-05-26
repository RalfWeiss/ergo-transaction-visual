import * as R from "ramda";
import { Store, Selectors } from "../model";
// import appConfig from "../appConfig";

// const { colorNames } = appConfig;

export const pickValues = (propNames: string[]) =>
  R.pipe(
    R.evolve({
      inputs: R.map(R.props(propNames)),
      outputs: R.map(R.props(propNames)),
    }),
    R.props(["inputs", "outputs"]),
    R.unnest,
    R.unnest,
    R.uniq,
    R.reject(R.isNil)
  );

// export const mapValuesWithColors = (values: string[]) => {
//   const minLength = R.min(colorNames.length, values.length);
//   const takeMin = R.take(minLength);
//   return R.pipe(
//     () => R.zip(takeMin(values), takeMin(colorNames)),
//     R.fromPairs
//   )();
// };

// // maps unique boxId and adress values to colors
// export const makeColorMap = (input: any) => {
//   // const values = pickValues(["ergoTree", "address"])(input);
//   const values = pickValues(["ergoTree"])(input);
//   return mapValuesWithColors(values);
// };

export const mapValuesWithColors = (store: Store) => (values: string[]) => {
  const colorNames = Selectors.selColorNames(store);
  const minLength = R.min(colorNames.length, values.length);
  const takeMin = R.take(minLength);
  return R.pipe(
    () => R.zip(takeMin(values), takeMin(colorNames)),
    R.fromPairs
  )();
};

// maps unique boxId and adress values to colors
export const makeColorMap = (store: Store) => (input: any) => {
  // const values = pickValues(["ergoTree", "address"])(input);
  const values = pickValues(["ergoTree"])(input);
  return mapValuesWithColors(store)(values);
};
