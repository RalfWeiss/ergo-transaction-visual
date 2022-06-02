import React, { useEffect } from "react";
import { toState } from "../../model";
import { Store, setDiagramDimensions, setSearchConnections } from "../../model";
import { makeColorMap, logWhen } from "../../utils";
import { allValidSamples, toIdPairs } from "../../logic";
import * as R from "ramda";
import { TxFlowView } from "./TxFlowView";
import { usePrevious, useStore } from "../../hooks";
// import { useWorker, WORKER_STATUS } from "@koale/useworker";
// import type { Option } from "@koale/useworker";
import { Node } from "react-flow-renderer";

import { useIsMounted } from "usehooks-ts";

const debugLog = logWhen(false);

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const findConnections = (boxes) =>
  new Promise((resolve) =>
    setTimeout(() => {        // eslint-disable-line
      const res = R.pipe(allValidSamples, toIdPairs)(boxes);
      debugLog("found connections")(res);

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

const MaxBoxes = 5;

export const TxDiagram = ({ width, height, data }: TxDiagramProps) => {
  const { state, setState } = useStore();
  const isMounted = useIsMounted();
  const prevData = usePrevious(data);

  if (data.inputs.length > MaxBoxes || data.outputs.length > MaxBoxes) {
    return (
      <div>
        At present I can only handle <br />
        max {MaxBoxes} inputs to max {MaxBoxes} outputs.
      </div>
    );
  }

  // move data to state
  useEffect(() => {
    if (R.equals(prevData, data)) {
      return;
    }
    setState(() => R.assoc("config", state.config, toState(data)));
    setState(setDiagramDimensions({ width, height }));
  }, [data, prevData, setState, width, height, state.config]);

  useEffect(() => {
    setState(setDiagramDimensions({ width, height }));
  }, [width, height, setState]);

  useEffect(() => {
    // immediate return on equal data
    // if (R.equals(prevData, data)) {
    //   return;
    // }
    if (state.noOfGraphLayouts > 0) {
      return;
    }

    // const debugLog = logWhen(true);
    // Todo: This must be changed.
    // const colorMap = R.pipe(makeColorMap(state), debugLog("colorMap"))(data);
    const colorMap = R.pipe(
      debugLog("colorMap input"),
      makeColorMap(state),
      debugLog("colorMap")
    )({
      inputs: R.values(state.boxes),
    });

    setState(R.assoc("colorMap", colorMap));
    debugLog("state.boxes")(state.boxes);

    // setState(R.assoc("noOfGraphLayouts", 0));
  }, [data, prevData, state, setState]);

  // Todo: there is an endless loop if no connections could be found
  useEffect(() => {
    // if (R.equals(prevData, data)) {
    //   console.log("useEffect data are equal: ", state.noOfGraphLayouts)
    // }
    // else {
    //   console.log("useEffect data has changed: ", state.noOfGraphLayouts)
    // }
    if (state.noOfGraphLayouts > 0) {
      return;
    }
    if (R.isEmpty(state.boxes) || state.searchConnections) {
      return;
    }
    // if (!R.isEmpty(state.connectionsByTokenId)) {
    //   return;
    // }

    debugLog("Start searching connections")(state.connectionsByTokenId);
    setState(setSearchConnections(true));

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

  return (
    <div className="txio-diagram" style={{ width, height }}>
      {state.allBoxes.length === 0 ? (
        <div>No nodes</div>
      ) : (
        <TxFlowView
          initialNodes={state.allBoxes.map(initialNodesWithState(state))}
          useDagreLayout={state?.config?.useDagreLayout}
        />
      )}
      {state.searchConnections ? (
        <div className="indicator">Analyzing transaction ...</div>
      ) : null}
    </div>
  );
};
