import React from "react";
import { TxIoView } from "@ertravi/txio-view-react";

// const data = {
//   inputs: [
//     { boxId: "000x", address: "A000001", value: 1000 },
//     { boxId: "001x", address: "O000001", value: 1000 },
//     { value: 1000 },
//   ],
//   outputs: [
//     { address: "Z000001", value: 1000 },
//     { boxId: "001x", address: "B000001", value: 500 },
//     { boxId: "000x", address: "A000001", value: 1000 },
//     { boxId: "100x", address: "O000001", value: 1000 },
//     { boxId: "001x", address: "A000001", value: 1000 },
//   ],
// };

const data = {
  inputs: [
    { boxId: "000x", ergoTree: "000et", address: "A000001", value: 100 },
    { boxId: "001x", ergoTree: "001et", address: "O000001", value: 200 },
    { value: 300 },
  ],
  outputs: [
    { address: "Z000001", value: 100 },
    { boxId: "001x", ergoTree: "001et", address: "B000001", value: 150 },
    { boxId: "000x", ergoTree: "000et", address: "A000001", value: 200 },
    { boxId: "100x", ergoTree: "003et", address: "O000001", value: 70 },
    { boxId: "002x", ergoTree: "004et", address: "A000001", value: 80 },
    // { value: 9 },
  ],
};

export default () => <TxIoView width={800} height={800} ergoTx={data as any} />;
