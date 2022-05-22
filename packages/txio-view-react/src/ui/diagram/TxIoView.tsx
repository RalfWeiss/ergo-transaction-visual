/* eslint-disable no-alert */
import React from "react";
import { TxioStoreProvider, ErgoTx } from "../../model";
import { TxDiagram } from "./";
import { ReactFlowProvider } from "react-flow-renderer";

interface TxIoViewProps {
  width: number;
  height: number;
  ergoTx: ErgoTx;
}

export const TxIoView = ({ width, height, ergoTx }: TxIoViewProps) => (
  <TxioStoreProvider>
    <ReactFlowProvider>
      <TxDiagram width={width} height={height} data={ergoTx} />
    </ReactFlowProvider>
  </TxioStoreProvider>
);
