/* eslint-disable no-alert */
import React from "react";
import { Provider as StoreProvider, ErgoTx } from "../../model";
import { TxDiagram } from "./";
import { ReactFlowProvider } from "react-flow-renderer";

interface TxIoViewProps {
  width: number;
  height: number;
  ergoTx: ErgoTx;
  // ergoTx: {
  //   inputs: any[];
  //   outputs: any[];
  // };
}

export const TxIoView = ({ width, height, ergoTx }: TxIoViewProps) => (
  <StoreProvider>
    <ReactFlowProvider>
      <TxDiagram width={width} height={height} data={ergoTx} />
    </ReactFlowProvider>
  </StoreProvider>
);
