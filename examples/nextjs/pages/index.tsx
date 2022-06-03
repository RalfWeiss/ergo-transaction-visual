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
// import TwoP2PK from "../fixtures/two-p2pk.json";
import NftRelistSkyhabor from "../fixtures/two-p2pk.json";
// Some weird fee 300000 0008cd035afd0501f6f5c1c9fb9ed5afc84fbc02825c0c7c3f65970fa3e3d9c8c6abc546
import ListForSaleTxSkyharbor from "../fixtures/Skyharbor-ListForSaleTx.json";

const demos = [
  { title: "Demo-1", data: data1 },
  { title: "Demo-2", data: data2 },
  { title: "Rent NFT", data: rentNft },
  //  { title: "Demo Box Coloring", data: data4 },
  //  { title: "Two P2PK's", data: TwoP2PK },
  { title: "Nft Relist Skyhabor", data: NftRelistSkyhabor },
  { title: "List for Sale Skyhabor", data: ListForSaleTxSkyharbor },
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
          <TxDiagram width={1200} height={1200} data={txData} />
        </div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
};
