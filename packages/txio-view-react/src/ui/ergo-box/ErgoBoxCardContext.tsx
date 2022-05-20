import React, { useContext, useState, useEffect } from 'react'
import { ErgoBox } from "../../model"
import { Context as StoreContext } from '../../model'
import { ErgoBoxCard } from './ErgoBoxCard';
import { getBoxById } from '../../model'
import * as R from 'ramda'

interface ErgoBoxCardContext {
  internalId: string
}

export const ErgoBoxCardContext = ({internalId}:ErgoBoxCardContext) => {
  const {state, setState} = useContext(StoreContext);
  const [box, setBox] = useState({})

  useEffect(() => {
    const box = getBoxById(internalId)(state) as ErgoBox
    setBox(box)
  }, [internalId, state])

  if (R.isEmpty(box)) return <></>

  return <ErgoBoxCard ergoBox={box as ErgoBox} />
} 