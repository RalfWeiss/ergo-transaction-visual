import React from "react";
import { TxIoView } from "@ertravi/txio-view-react";

const data = {
  inputs: [
    { boxId: "000x", address: "A000001", value: 1000 },
    { boxId: "001x", address: "O000001", value: 1000 },
    { value: 1000 },
  ],
  outputs: [
    { address: "Z000001", value: 1000 },
    { boxId: "000x", address: "A000001", value: 1000 },
    { boxId: "100x", address: "O000001", value: 1000 },
    { boxId: "001x", address: "A000001", value: 1000 },
  ],
};

export default () => <TxIoView width={800} height={800} ergoTx={data} />;
