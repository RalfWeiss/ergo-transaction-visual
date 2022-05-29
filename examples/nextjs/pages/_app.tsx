import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { TxioStoreProvider, ReactFlowProvider } from "@ertravi/txio-view-react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "gray.600",
        lineHeight: "tall",
      },
      a: {
        color: "blue.500",
      },
    },
  },
});

// use an optional config
const TxioViewConfig = {
  rootPropsToShow: [
    "value",
    "ergoTree",
    "address",
    //    "boxId",
    //    "blockId",
    //    "transactionId",
  ],
  // boxColors: [
  //   "#996600",
  //   "var(--chakra-colors-blue-300)",
  //   "var(--chakra-colors-red-300)",
  // ],
};

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <TxioStoreProvider config={TxioViewConfig}>
        <ReactFlowProvider>
          <Component {...pageProps} // eslint-disable-line
          />
        </ReactFlowProvider>
      </TxioStoreProvider>
    </ChakraProvider>
  );
}
