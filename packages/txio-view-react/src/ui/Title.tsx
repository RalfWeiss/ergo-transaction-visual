import React, {useContext} from 'react'
import {Context } from '../model/StoreProvider'

export const Title = () => {
  const {state} = useContext(Context)
  return (
    <div>
      {state.title}
    </div>
  )
}