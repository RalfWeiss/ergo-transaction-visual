import { ErgoBox } from "./ergoBox";
import { addInputBox, addOutputBox } from "./actions";
import { defaultState, Store } from ".";
import * as R from "ramda";
import { normalize } from "./ergoBox";

// only inputs and outputs needs to be presented
export interface ErgoTx {
  inputs: Partial<ErgoBox>[];
  outputs: Partial<ErgoBox>[];
  [k: string | number | symbol]: any;
}

// see: https://github.com/GoogleChromeLabs/jsbi/issues/30
// BigInt.prototype.toJSON = function () {
BigInt.prototype["toJSON"] = function () {     // eslint-disable-line
  return this.toString();
};

const forEachIndexed = R.addIndex(R.forEach);

const toInputBox = (box, idx) =>
  R.pipe(
    R.assoc("internalId", `input-${idx}`),
    R.assoc("boxType", "inputBox"),
    normalize
  )(box);

const toOutputBox = (box, idx) =>
  R.pipe(
    R.assoc("internalId", `output-${idx}`),
    R.assoc("boxType", "outputBox"),
    normalize
  )(box);

export const toState = (data: ErgoTx): Store => {
  let state = defaultState;
  R.pipe(
    () =>
      forEachIndexed((box, idx) => {
        state = addInputBox(toInputBox(box, idx))(state);
      })(data.inputs),
    () =>
      forEachIndexed((box, idx) => {
        state = addOutputBox(toOutputBox(box, idx))(state);
      })(data.outputs)
  )();
  return state;
};

// const inputs = data.inputs.map((box, idx) => ({
//   ...box,
//   internalId: `input-${idx}`,
//   boxType: "inputBox",
// }));
// const outputs = data.outputs.map((box, idx) => ({
//   ...box,
//   internalId: `output-${idx}`,
//   boxType: "outputBox",
// }));

// debugLog("TxDiagram inputs")(inputs);

// inputs.forEach((box) => setState(addInputBox(normalize(box))));
// outputs.forEach((box) => setState(addOutputBox(normalize(box))));
