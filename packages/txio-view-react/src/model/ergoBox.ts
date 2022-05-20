import * as R from "ramda";
// import { ensureString, truncateWithEllipses } from '../utils'
// import { ensureString } from '../utils'
import { Asset, transform as transformAsset } from "./asset";

export const enum BoxType {
  "inputBox",
  "outputBox",
}

// using a class to ensure defaults
export class ErgoBox {
  constructor(
    public internalId = "",
    public address = "",
    public assets: Asset[] = [],
    public boxId = "",
    public blockId = "",
    public ergoTree = "",
    public transactionId = "",
    public value = "",
    public additionalRegisters = {},
    public boxType = ""
  ) {}
}

const ergoBoxDefaults = new ErgoBox();
const ergoBoxKeys = R.keys(ergoBoxDefaults);

const withDefaults = (obj: any): ErgoBox =>
  R.pipe(R.pick(ergoBoxKeys), R.mergeRight(ergoBoxDefaults))(obj);

export const normalize = (input: any): ErgoBox => {
  const transformations = {
    assets: R.map(transformAsset),
    // address: truncateWithEllipses(10),
    // boxId: truncateWithEllipses(10),
    // ergoTree: truncateWithEllipses(10),
    // value: ensureString,
  };
  return R.pipe(withDefaults, R.evolve(transformations) as any)(input) as any;
};
