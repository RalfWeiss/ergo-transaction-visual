import React from "react";
import { TxIoView } from "@ertravi/txio-view-react";
import data from "../fixtures/demo-3.json";

export default () => <TxIoView width={800} height={800} ergoTx={data as any} />;
