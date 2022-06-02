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

/*
ColorMap advances to a classifier.

Assuming that the ergoTree value: 0008cd025e6f22d4ba36bd53adbfe449cf85ab11067cfd265b11a8e8faf6d100bd1c2913 
is a standard length address the length is 72.
Each ergoTree with a length of 72 
-- will be handled as a P2PK-Address and labeled as Alice, Bob, etc.

An ergoTree value of: 1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304 
-- will be seen as the fee.

Any other ergoTree value 
-- is a Smart Contract.
*/

export const classifyErgoTree = (ergoTree: string): string => {
  if (ergoTree.length === 72) {
    return "P2PK";
  }
  if (
    ergoTree ===
    "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304"
  ) {
    return "Fee";
  }
  return "SC";
};

export const mapValuesWithColors = (store: Store) => (values: string[]) => {
  const colorNames = Selectors.selColorNames(store);
  const minLength = R.min(colorNames.length, values.length);
  const takeMin = R.take(minLength);
  return R.pipe(
    () => R.zip(takeMin(values), takeMin(colorNames)),
    R.map(([ergoTree, color]) => ({
      [ergoTree]: {
        color,
        type: classifyErgoTree(ergoTree),
      },
    })),
    R.mergeAll
  )();
};

// maps unique boxId and adress values to colors
export const makeColorMap = (store: Store) => (input: any) => {
  // const values = pickValues(["ergoTree", "address"])(input);
  const values = pickValues(["ergoTree"])(input);
  return mapValuesWithColors(store)(values);
};
