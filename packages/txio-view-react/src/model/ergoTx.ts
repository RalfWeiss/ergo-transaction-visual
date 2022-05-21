import { ErgoBox } from "./ergoBox";

// only inputs and outputs needs to be presented
export interface ErgoTx {
  inputs: Partial<ErgoBox>[];
  outputs: Partial<ErgoBox>[];
  [k: string | number | symbol]: any;
}
