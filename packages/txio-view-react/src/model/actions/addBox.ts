import {Store} from '../store'
import {ErgoBox} from '../ergoBox'
import * as R from 'ramda'

const isInputBox = R.equals("inputBox")
const isOutputBox = R.equals("outputBox")

const addBoxByIdAndType = (boxType:string) => (id:string) =>  (box:ErgoBox) =>  R.evolve({
  boxes: R.assocPath([id], box),
  allBoxes: R.append(id),
  //inputBoxIds: R.when((() => R.equals("inputBox", boxType), R.append(id))
  inputBoxIds: R.when( () => isInputBox(boxType), R.append(id) ),
  outputBoxIds: R.when( () => isOutputBox(boxType), R.append(id) ),
})

const addBoxByType = (boxType:string) => (box:ErgoBox) => (store:Store) => {
  const id = box.internalId
  return R.ifElse(
    R.hasPath(['boxes', id]),
    R.identity,
    addBoxByIdAndType(boxType)(id)(box)
  )(store)
}

export const addInputBox = (box:ErgoBox) => 
  addBoxByType("inputBox")(box)

export const addOutputBox = (box:ErgoBox) => 
  addBoxByType("outputBox")(box)
