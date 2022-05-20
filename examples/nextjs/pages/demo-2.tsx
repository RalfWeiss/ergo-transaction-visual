import React from "react";
import { TxIoView } from "@ertravi/txio-view-react"
import data from '../fixtures/demo-2.json'

// const data = {
//   inputs: [
//     {boxId: "000x", address: "asdfess", value: 1000}
//   ],
//   outputs: [
//     {boxId: "100x", address: "asdfess", value: 1000}
//   ]
// }

export default () => <TxIoView width={800} height={800} ergoTx={data}/>;
