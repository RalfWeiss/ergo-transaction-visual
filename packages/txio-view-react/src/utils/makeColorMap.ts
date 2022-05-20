import * as R from "ramda";

// colorNames good for black text color
// https://www.quackit.com/css/color/charts/css_color_names_chart.cfm
const colorNames = [
  "LightCoral",
  "PaleGreen",
  "NavajoWhite",
  "Khaki",
  "SkyBlue",
  "MistyRose",
];

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

export const mapValuesWithColors = (values: string[]) => {
  const minLength = R.min(colorNames.length, values.length);
  const takeMin = R.take(minLength);
  return R.pipe(
    () => R.zip(takeMin(values), takeMin(colorNames)),
    R.fromPairs
  )();
};

// maps unique boxId and adress values to colors
export const makeColorMap = (input: any) => {
  const values = pickValues(["boxId", "address"])(input);
  return mapValuesWithColors(values);
};
