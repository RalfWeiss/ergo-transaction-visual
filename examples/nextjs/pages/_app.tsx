import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { TxioStoreProvider, ReactFlowProvider } from "@ertravi/txio-view-react";

// use an optional config
const TxioViewConfig = {
  rootPropsToShow: [
    "boxId",
    "address",
    "ergoTree",
    "blockId",
    //    "transactionId",
    "value",
  ],
  boxColors: [
    "#996600",
    "var(--chakra-colors-blue-300)",
    "var(--chakra-colors-red-300)",
  ],
};

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TxioStoreProvider config={TxioViewConfig}>
        <ReactFlowProvider>
          <Component {...pageProps} // eslint-disable-line
          />
        </ReactFlowProvider>
      </TxioStoreProvider>
    </ChakraProvider>
  );
}
