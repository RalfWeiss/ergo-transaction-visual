import React from "react";
import { useState } from "react";
import { TxIoView } from "@ertravi/txio-view-react";
import data1 from "../fixtures/demo-1.json";
import data2 from "../fixtures/demo-2.json";
import data3 from "../fixtures/demo-3.json";

const data4 = {
  inputs: [
    { boxId: "000x", address: "A000001", value: 1000 },
    { boxId: "001x", address: "O000001", value: 1000 },
    { value: 1000 },
  ],
  outputs: [
    { address: "Z000001", value: 1000 },
    { boxId: "001x", address: "B000001", value: 500 },
    { boxId: "000x", address: "A000001", value: 1000 },
    { boxId: "100x", address: "O000001", value: 1000 },
    { boxId: "001x", address: "A000001", value: 1000 },
  ],
};

const style = {
  backgroundColor: "lightgray",
  width: 800,
  height: 800,
};

export default () => {
  const [txData, setTxData] = useState(data4);
  return (
    <div style={style}>
      <button type="button" onClick={() => setTxData(data1 as any)}>
        Demo-1
      </button>
      <button type="button" onClick={() => setTxData(data2 as any)}>
        Demo-2
      </button>
      <button type="button" onClick={() => setTxData(data3 as any)}>
        Demo-3
      </button>
      <button type="button" onClick={() => setTxData(data4 as any)}>
        Demo-4
      </button>
      <TxIoView
        width={style.width}
        height={style.height}
        ergoTx={txData as any}
      />
    </div>
  );
};
