import * as R from "ramda";
// import { ensureString, truncateWithEllipses } from '../utils'
// import { ensureString } from '../utils'
import { Asset, transform as transformAsset } from "./asset";
import bs58 from "bs58";
import { Buffer } from "buffer";

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
    // public value: string | number = "",
    // public value: number = 0,
    public value: bigint = BigInt(0),
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
    //    value: ensureString,
    // value: (v) => ~~v,    // eslint-disable-line
    // value: (v) => Number(v)
    value: (v) => BigInt(v),
  };
  return R.pipe(withDefaults, R.evolve(transformations) as any, (box) => {
    if (box.address !== "" && box.ergoTree === "") {
      // restore ergoTree from address
      const bytes = bs58.decode(box.address);
      const ergoTree = Buffer.from(bytes).toString("hex");
      // remove prefix and checksum
      // see: https://docs.ergoplatform.com/dev/wallet/address/
      box.ergoTree = ergoTree.substring(2, ergoTree.length - 8);
    }
    return box;
  })(input) as any;
};
