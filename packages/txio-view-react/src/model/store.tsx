import { ErgoBox } from "./ergoBox";
import { DimensionsByKey } from "./dimensions";

export interface Store {
  boxes: {
    [key: string]: ErgoBox;
  };
  title: string;
  allBoxes: string[];
  inputBoxIds: string[];
  outputBoxIds: string[];
  dimensions: DimensionsByKey;
}