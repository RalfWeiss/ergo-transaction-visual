import React from "react";
import { useState } from "react";
import { TxDiagram, useToggleDagreLayout } from "@ertravi/txio-view-react"; // , useToggleDagreLayout
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

const screenStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const mainStyle = {
  backgroundColor: "lightgray",
  width: 800,
  height: 800,
  display: "flex",
  flexDirection: "column",
} as React.CSSProperties;

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  padding: "4px",
} as any;

const Buttons = ({ setTxData }) => {
  // const [withDagreLayout, toogleWithDagreLayout] = useToggleDagreLayout() ;
  const [withDagreLayout, toogleWithDagreLayout] = useToggleDagreLayout();
  return (
    <>
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
      <button
        type="button"
        onClick={() => (toogleWithDagreLayout as () => void)()}
        style={{ marginLeft: "auto" }}
      >
        {withDagreLayout ? "No Dagre Layout" : "Use Dagre Layout"}
      </button>
    </>
  );
};

export default () => {
  const [txData, setTxData] = useState(data4);

  return (
    <div style={screenStyle}>
      <div style={mainStyle}>
        <div style={headerStyle}>
          <Buttons {...{ setTxData }} // eslint-disable-line
          />
        </div>
        <div>
          <TxDiagram width={800} height={800} data={txData} />
        </div>
      </div>
    </div>
  );
};
