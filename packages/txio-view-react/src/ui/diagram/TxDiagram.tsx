import React, { useEffect, useContext } from "react";
import { Context as StoreContext } from "../../model";
import { normalize } from "../../model/ergoBox";
import { addInputBox, addOutputBox } from "../../model/actions/addBox";
import { Store, defaultState, setDiagramDimensions } from "../../model";
import { makeColorMap, logWhen } from "../../utils";
import {
  // connectionsByBoxId,
  //  connectionsByTokenId,
  allValidSamples,
  toIdPairs,
} from "../../logic";
import * as R from "ramda";
import { TxFlowView } from "./TxFlowView";
import { usePrevious } from "../../hooks";
// import { useWorker, WORKER_STATUS } from "@koale/useworker";
// import type { Option } from "@koale/useworker";
import { Node } from "react-flow-renderer";
// import { countPatches, getCombsMinMax } from "../../utils";

const debugLog = logWhen(false);

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

export const TxDiagram = ({ width, height, data }: TxDiagramProps) => {
  const prevData = usePrevious(data);
  const { state, setState } = useContext(StoreContext);

  // reset state on changed data
  useEffect(() => {
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

  useEffect(() => {
    setState(setDiagramDimensions({ width, height }));
  }, [width, height, setState]);

  // move data to state
  useEffect(() => {
    // immediate return on equal data
    if (R.equals(prevData, data)) {
      return;
    }

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

    const colorMap = R.pipe(makeColorMap(state), debugLog("colorMap"))(data);

    setState(R.assoc("colorMap", colorMap));
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

  useEffect(() => {
    if (state.noOfGraphLayouts > 0) {
      return;
    }
    if (R.isEmpty(state.boxes)) {
      return;
    }

    // console.log("TxDiagram allkeys: ", state.allBoxes);
    // Todo: new 29.05.2022
    // console.log("boxes: ", JSON.stringify(state.boxes, null, 2))
    const connections = R.pipe(allValidSamples, toIdPairs)(state.boxes);

    // const runFindConnections = async () => {
    //   const connections = await findConnectionsWorker(state.boxes); // non-blocking UI
    //   console.log("End runFindConnections: ", connections);
    //   setState(R.assoc("connectionsByTokenId", connections));
    // };

    // runFindConnections()
    // console.log("connections: ", JSON.stringify(connections, null, 2))
    setState(R.assoc("connectionsByTokenId", connections));
  }, [state, setState]);

  // const toggleLayout = () => {
  //   setState(setUseDagreLayout(!state.config.useDagreLayout));
  //   setState(R.assoc("noOfGraphLayouts", 0));
  // };

  return (
    <div style={{ width, height }}>
      {state.allBoxes.length === 0 ? (
        <div>No nodes</div>
      ) : (
        //        : <DappstepFlow initialNodes={state.allBoxes.map(initializeNode)}/>
        <TxFlowView
          initialNodes={state.allBoxes.map(initialNodesWithState(state))}
          useDagreLayout={state.config.useDagreLayout}
        />
      )}
    </div>
  );
};
