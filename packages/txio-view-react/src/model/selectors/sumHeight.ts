import * as R from "ramda";
import { Store } from "../../model";
import { getBoxById } from "./getBoxById";

export const sumHeight = (ids: string[]) => (state: Store) =>
  R.pipe(
    (s) => R.ap(R.map(getBoxById)(ids))([s]),
    R.pluck("height"),
    R.sum
  )(state);
