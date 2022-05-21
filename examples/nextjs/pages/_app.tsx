import React from "react";
import { TxioStoreProvider, ReactFlowProvider } from "@ertravi/txio-view-react";

export default function MyApp({ Component, pageProps }) {
  return (
    <TxioStoreProvider>
      <ReactFlowProvider>
        <Component {...pageProps} // eslint-disable-line
        />
      </ReactFlowProvider>
    </TxioStoreProvider>
  );
}
