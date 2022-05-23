import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { TxDiagram, useToggleDagreLayout } from "@ertravi/txio-view-react"; // , useToggleDagreLayout
import data1 from "../fixtures/demo-1.json";
import data2 from "../fixtures/demo-2.json";
import data3 from "../fixtures/demo-3.json";

const data4 = {
  inputs: [
    { boxId: "000x", ergoTree: "000et", address: "A000001", value: 1000 },
    { boxId: "001x", ergoTree: "001et", address: "O000001", value: 1000 },
    { value: 1000 },
  ],
  outputs: [
    { address: "Z000001", value: 1000 },
    { boxId: "001x", ergoTree: "001et", address: "B000001", value: 500 },
    { boxId: "000x", ergoTree: "000et", address: "A000001", value: 1000 },
    { boxId: "100x", ergoTree: "100et", address: "O000001", value: 1000 },
    { boxId: "001x", ergoTree: "001et", address: "A000001", value: 1000 },
    { value: 2000 },
  ],
};

const demos = [
  { title: "Demo-1", data: data1 },
  { title: "Demo-2", data: data2 },
  { title: "Demo-3", data: data3 },
  { title: "Demo Box Coloring", data: data4 },
];

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
      {demos.map(({ title, data }) => (
        <Button
          mr={2}
          size="sm"
          key={title}
          type="button"
          onClick={() => setTxData(data as any)}
        >
          {title}
        </Button>
      ))}
      <Button
        size="sm"
        key="ToggleLayout"
        type="button"
        onClick={() => (toogleWithDagreLayout as () => void)()}
        style={{ marginLeft: "auto" }}
      >
        {withDagreLayout ? "No Dagre Layout" : "Use Dagre Layout"}
      </Button>
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
