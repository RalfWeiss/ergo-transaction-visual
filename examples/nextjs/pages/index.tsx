import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  TxDiagram,
  useToggleDagreLayout,
  //  TxioStoreContext,
  useStore,
} from "@ertravi/txio-view-react"; // , useToggleDagreLayout

// Todo: these imports don't work anymore after modifying next.config.js
import data1 from "../fixtures/demo-1.json";
import data2 from "../fixtures/demo-2.json";
// import data3 from "../fixtures/demo-3.json";
import rentNft from "../fixtures/dappstep Rent NFT.json";

// const data4 = {
//   inputs: [
//     { boxId: "000x", ergoTree: "000et", address: "A000001", value: 1 },
//     { boxId: "001x", ergoTree: "001et", address: "O000001", value: 2 },
//     { value: 3 },
//   ],
//   outputs: [
//     { address: "Z000001", value: 4 },
//     { boxId: "001x", ergoTree: "001et", address: "B000001", value: 5 },
//     { boxId: "000x", ergoTree: "000et", address: "A000001", value: 6 },
//     { boxId: "100x", ergoTree: "100et", address: "O000001", value: 7 },
//     { boxId: "001x", ergoTree: "001et", address: "A000001", value: 8 },
//     { value: 9 },
//   ],
// };

const data4 = {
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

const data5 = {
  inputs: [
    { address: "Z000001", value: 1, assets: [{ tokenId: "T1" }] },
    { ergoTree: "001et", value: 2 },
    { ergoTree: "002et", value: 3 },
    { ergoTree: "003et", value: 4 },
    { ergoTree: "004et", value: 5 },
  ],
  outputs: [
    { ergoTree: "001et", value: 6 },
    {
      ergoTree: "001et",
      value: 1,
      assets: [{ tokenId: "T1" }],
    },
    { ergoTree: "005et", value: 8 },
  ],
};

const demos = [
  { title: "Demo-1", data: data1 },
  { title: "Demo-2", data: data2 },
  { title: "Rent NFT", data: rentNft },
  { title: "Demo Box Coloring", data: data4 },
  { title: "Demo 5", data: data5 },
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
  // const { state, setState } = useContext(TxioStoreContext);

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
        {withDagreLayout ? "No Auto-Layout" : "Use Auto-Layout"}
      </Button>
    </>
  );
};

export default () => {
  const [txData, setTxData] = useState(data1);
  // const [txData, setTxData] = useState(data4);
  const { state } = useStore();
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
        <pre>{JSON.stringify(state.config, null, 2)}</pre>
      </div>
    </div>
  );
};
