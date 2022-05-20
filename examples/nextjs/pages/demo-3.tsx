import React from "react";
import { TxIoView } from "@ertravi/txio-view-react"
import data from '../fixtures/demo-3.json'

export default () => <TxIoView width={1200} height={800} ergoTx={data}/>;
