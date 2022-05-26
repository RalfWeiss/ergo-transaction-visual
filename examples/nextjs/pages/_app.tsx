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
