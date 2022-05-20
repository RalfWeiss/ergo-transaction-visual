import * as R from "ramda";

export interface Dimensions {
  width: number;
  height: number;
}

export interface DimensionsByKey {
  [key: string]: Dimensions;
}

// called with a array of keys
export const getMaxWidthFromDimensions =
  (dimensions: any) => (keys: string[]) =>
    R.pipe(
      R.map((key: string) => R.prop(key, dimensions)) as any,
      R.pluck("width"),
      R.reduce(R.max, 0)
    )(keys) as number;
