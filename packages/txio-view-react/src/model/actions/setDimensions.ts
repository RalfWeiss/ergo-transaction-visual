//import { ErgoBox } from './ergoBox'
import { Dimensions, DimensionsByKey } from '../dimensions'
import {Store} from '../store'
import * as R from 'ramda'

export const setDimension = (key:string) => (dimension: Dimensions)  => (store:Store) => {
  const newStore = R.evolve({
    dimensions: R.assocPath([key], dimension),
  })(store) as Store
  return newStore
} 