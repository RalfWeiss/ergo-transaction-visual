/* eslint-disable no-alert */
import React from "react";
import {Provider} from '../model'
import {Title, TxDiagram} from './'

interface TxIoViewProps {
  width: number
  height: number
  ergoTx: {
    inputs: any[]
    outputs: any[]
  }
}

export const TxIoView = ({width, height, ergoTx}:TxIoViewProps) => {
  return (
    <Provider>
      <Title />
      <TxDiagram width={width} height={height} />
    </Provider>
  )
}
