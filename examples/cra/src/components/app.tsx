import React from "react";
import { useTest } from "@hooks/test";
import { TxIoView } from "@ertravi/txio-view-react";

const data = {
  inputs: [{ boxId: "000x", address: "asdfess", value: 1000 }],
  outputs: [{ boxId: "100x", address: "asdfess", value: 1000 }],
};

export const App = () => {
  useTest();

  return (
    <div>
      <TxIoView width={800} height={800} ergoTx={data} />;
    </div>
  );
};
