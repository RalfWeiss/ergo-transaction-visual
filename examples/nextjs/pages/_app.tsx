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
      ".txio-diagram": {
        bgColor: "gray.300",
        pt: "0",
        "& .react-flow__container": {
          pt: "4"
        },
        "& .badge": {
          bgColor: "inherit",
          color: "gray.700",      
          //fontWeight: "bold",  
          fontSize: "x-small", 
          fontStyle: "italic",
          position: "absolute",
          paddingX: "8px",
          paddingY: "4px",
          paddingBottom: "2px",
          top: "-16px",
          //right: "-12px",
          right: "4px",
          //height: 10,
          //border: "1px solid blue",
          borderRadius: "15px",
          //borderColor: "inherit"
        }
      }
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
  boxColors: [
    //"#996600",
    "var(--chakra-colors-red-200)",
    "var(--chakra-colors-green-200)",
    "var(--chakra-colors-blue-200)",
    "var(--chakra-colors-yellow-300)",
  ],
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
