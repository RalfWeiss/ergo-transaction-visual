import React, { useEffect, useContext } from "react";
import { TxioStoreContext, toState } from "../../model";
import { normalize } from "../../model/ergoBox";
import { addInputBox, addOutputBox } from "../../model/actions/addBox";
import {
  Store,
  defaultState,
  setDiagramDimensions,
  setSearchConnections,
} from "../../model";
import { makeColorMap, logWhen } from "../../utils";
import {
  // connectionsByBoxId,
  //  connectionsByTokenId,
  allValidSamples,
  toIdPairs,
} from "../../logic";
import * as R from "ramda";
import { TxFlowView } from "./TxFlowView";
import { usePrevious, useStore } from "../../hooks";
// import { useWorker, WORKER_STATUS } from "@koale/useworker";
// import type { Option } from "@koale/useworker";
import { Node } from "react-flow-renderer";
// import { countPatches, getCombsMinMax } from "../../utils";

import { useIsMounted } from "usehooks-ts";

const debugLog = logWhen(false);

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const findConnections = (boxes) =>
  new Promise((resolve) =>
    setTimeout(() => {        // eslint-disable-line
      const res = R.pipe(allValidSamples, toIdPairs)(boxes);
      // console.log(
      //   "boxes: ",
      //   R.keys(boxes).length,
      //   " connections: ",
      //   res.length
      // );
      resolve(res);
    }, 200)
  );

const initialNodesWithState =
  (state: Store) =>
  (internalId: string): Node => ({
    id: internalId,
    type: state.boxes[internalId]?.boxType || "inputBox",
    position: { x: 50, y: 50 },
    data: {
      internalId,
      label: internalId,
    },
  });

interface TxDiagramProps {
  width: number;
  height: number;
  data: {
    inputs: any[];
    outputs: any[];
  };
}

// const findConnections = R.pipe(allValidSamples, toIdPairs)
// const findConnections = (data) => R.pipe(allValidSamples, toIdPairs)(data);
// const findConnections = data => [["input-0", "output-1"]]

const useOldInitialize = false;

export const TxDiagram = ({ width, height, data }: TxDiagramProps) => {
  // const { state, setState } = useContext(TxioStoreContext);
  const { state, setState } = useStore();
  const isMounted = useIsMounted();
  const prevData = usePrevious(data);
  // const prevConnections = usePrevious(state.connectionsByTokenId)

  // reset state on changed data
  useEffect(() => {
    if (!useOldInitialize) {
      return;
    }

    // if (prevData && prevData !== data) {
    if (prevData && !R.equals(prevData, data)) {
      setState(R.assoc("boxes", defaultState.boxes));
      setState(R.assoc("allBoxes", defaultState.allBoxes));
      setState(R.assoc("inputBoxIds", defaultState.inputBoxIds));
      setState(R.assoc("outputBoxIds", defaultState.outputBoxIds));
      setState(
        R.assoc("connectionsByTokenId", defaultState.connectionsByTokenId)
      );
    }
  }, [prevData, data, setState]);

  // move data to state
  useEffect(() => {
    if (useOldInitialize) {
      return;
    }

    if (R.equals(prevData, data)) {
      return;
    }
    // console.log("initializing state");
    // Todo: falsche initialisierung des state
    // setState(() => toState(data));
    setState(() => R.assoc("config", state.config, toState(data)));
    setState(setDiagramDimensions({ width, height }));
    // console.log("toState: ", JSON.stringify(toState(data), null, 2))
    // const connections = R.pipe(allValidSamples, toIdPairs)(state.boxes);
    // setState(R.assoc("connectionsByTokenId", connections));
    // setSearchingConnections(true)
    // setState(setSearchConnections(true));
  }, [data, prevData, setState, width, height]);

  useEffect(() => {
    if (!useOldInitialize) {
      return;
    }
    setState(setDiagramDimensions({ width, height }));
  }, [width, height, setState]);

  useEffect(() => {
    // immediate return on equal data
    if (R.equals(prevData, data)) {
      return;
    }

    if (useOldInitialize) {
      const inputs = data.inputs.map((box, idx) => ({
        ...box,
        internalId: `input-${idx}`,
        boxType: "inputBox",
      }));
      const outputs = data.outputs.map((box, idx) => ({
        ...box,
        internalId: `output-${idx}`,
        boxType: "outputBox",
      }));

      debugLog("TxDiagram inputs")(inputs);

      inputs.forEach((box) => setState(addInputBox(normalize(box))));
      outputs.forEach((box) => setState(addOutputBox(normalize(box))));
    }
    // setState(() => toState(data))
    // console.log("toState: ", JSON.stringify(toState(data), null, 2))

    const colorMap = R.pipe(makeColorMap(state), debugLog("colorMap"))(data);

    setState(R.assoc("colorMap", colorMap));
    debugLog("state.boxes")(state.boxes);
    // setState(
    //   R.assoc("connectionsByBoxId", connectionsByBoxId({ inputs, outputs }))
    // );
    // setState(
    //   R.assoc("connectionsByTokenId", connectionsByTokenId({ inputs, outputs }))
    // );

    // const connByTokenId = R.pipe(
    //   connectionsByTokenId,
    //   debugLog("connections by tokenId")
    // )({ inputs, outputs })
    // //console.log("connByTokenId: ", JSON.stringify(connByTokenId, null, 2))

    setState(R.assoc("noOfGraphLayouts", 0));
  }, [data, prevData, state, setState]);

  // const [findConnectionsWorker] = useWorker(findConnections, {
  //   localDependencies: () => [allValidSamples, toIdPairs, countPatches, getCombsMinMax, logWhen],
  //   remoteDependencies: [
  //     "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.28.0/ramda.min.js"
  //   ]
  // } as any);

  // useEffect(() => {
  //   console.log("noOfGraphLayouts: ", state.noOfGraphLayouts);
  //   // if (state.noOfGraphLayouts < 6)
  //   //   return
  //   // if (!useOldInitialize) return
  //   if (state.noOfGraphLayouts > 0) {
  //     return;
  //   }
  //   if (R.isEmpty(state.boxes)) {
  //   }

  //   // // console.log("TxDiagram allkeys: ", state.allBoxes);
  //   // // Todo: new 29.05.2022
  //   // // console.log("boxes: ", JSON.stringify(state.boxes, null, 2))
  //   // const connections = R.pipe(allValidSamples, toIdPairs)(state.boxes);

  //   // // const runFindConnections = async () => {
  //   // //   const connections = await findConnectionsWorker(state.boxes); // non-blocking UI
  //   // //   console.log("End runFindConnections: ", connections);
  //   // //   setState(R.assoc("connectionsByTokenId", connections));
  //   // // };

  //   // // runFindConnections()
  //   // // console.log("connections: ", JSON.stringify(connections, null, 2))
  //   // setState(R.assoc("connectionsByTokenId", connections));
  // }, [state, setState]);

  useEffect(() => {
    // if (R.isEmpty(state.boxes) && !R.isEmpty(state.connectionsByTokenId)) return
    if (R.isEmpty(state.boxes) || state.searchConnections) {
      return;
    }
    if (!R.isEmpty(state.connectionsByTokenId)) {
      return;
    }

    debugLog("useUpdateEffect boxes")(R.keys(state.boxes));
    debugLog("useUpdateEffect connections")(R.keys(state.connectionsByTokenId));
    // if (R.equals(prevData, data)) {
    //   debugLog("useUpdateEffect data are equal")(R.keys(state.boxes))
    //   //return
    // }
    // else {
    //   debugLog("useUpdateEffect data are not equal")(R.keys(state.boxes))
    // }
    // if (R.equals(prevData, data) || state.searchConnections) {
    //   return;
    // }
    // if (R.isEmpty(state.boxes)) return

    debugLog("Start searching connections")(state.connectionsByTokenId);
    setState(setSearchConnections(true));

    // // const connections = R.pipe(allValidSamples, toIdPairs)(state.boxes);
    // // setState(R.assoc("connectionsByTokenId", connections));
    // // setState(R.assoc("noOfGraphLayouts", 0));
    // // setState(setSearchConnections(false));

    findConnections(state.boxes).then((connections: any[]) => {
      if (isMounted()) {
        debugLog("Stop searching! Connections found")(connections.length);
        if (!R.equals(connections, state.connectionsByTokenId)) {
          setState(R.assoc("connectionsByTokenId", connections));
          setState(R.assoc("noOfGraphLayouts", 3));
        }
        setState(setSearchConnections(false));
      }
    });
  }, [isMounted, state, setState, prevData, data]);

  // const toggleLayout = () => {
  //   setState(setUseDagreLayout(!state.config.useDagreLayout));
  //   setState(R.assoc("noOfGraphLayouts", 0));
  // };

  return (
    <div className="txio-diagram" style={{ width, height }}>
      {state.allBoxes.length === 0 ? (
        <div>No nodes</div>
      ) : (
        //        : <DappstepFlow initialNodes={state.allBoxes.map(initializeNode)}/>
        <>
          <TxFlowView
            initialNodes={state.allBoxes.map(initialNodesWithState(state))}
            useDagreLayout={state?.config?.useDagreLayout}
          />
          {state.searchConnections ? (
            <div>Analyzing transaction ...</div>
          ) : null}
        </>
      )}
    </div>
  );
};
