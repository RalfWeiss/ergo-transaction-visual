import React, { useEffect, useContext } from "react";
import { Context as StoreContext } from "../../model";
import { normalize } from "../../model/ergoBox";
import { addInputBox, addOutputBox } from "../../model/actions/addBox";
import { Store } from "../../model/store";
import { connectionsByBoxId, makeColorMap } from "../../utils";
import * as R from "ramda";
import { TxFlowView } from "./TxFlowView";
import { usePrevious } from "../../hooks";

import { Node } from "react-flow-renderer";

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

export const TxDiagram = ({ width, height, data }: TxDiagramProps) => {
  const prevData = usePrevious(data);
  const { state, setState } = useContext(StoreContext);

  useEffect(() => {
    // move data to state
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
    inputs.forEach((box) => setState(addInputBox(normalize(box))));
    outputs.forEach((box) => setState(addOutputBox(normalize(box))));

    const colorMap = makeColorMap(data);
    setState(R.assoc("colorMap", colorMap));
    setState(
      R.assoc("connectionsByBoxId", connectionsByBoxId({ inputs, outputs }))
    );
  }, [data, prevData, state, setState]);

  return (
    <div style={{ width, height }}>
      {state.allBoxes.length === 0 ? (
        <div>No nodes</div>
      ) : (
        //        : <DappstepFlow initialNodes={state.allBoxes.map(initializeNode)}/>
        <TxFlowView
          initialNodes={state.allBoxes.map(initialNodesWithState(state))}
        />
      )}
    </div>
  );
};
