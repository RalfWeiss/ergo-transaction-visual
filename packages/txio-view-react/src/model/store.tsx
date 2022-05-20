import { ErgoBox } from "./ergoBox";
import { Dimensions, DimensionsByKey } from './dimensions'
import * as R from 'ramda'

export interface Store {
  boxes: {
    [key:string]:ErgoBox
  },
  title: string,
  allBoxes: string[],
  inputBoxIds: string[],
  outputBoxIds: string[],
  dimensions: DimensionsByKey
}