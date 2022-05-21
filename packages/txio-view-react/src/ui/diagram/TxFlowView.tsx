import React, { useEffect, useContext } from "react";
import { Context as StoreContext } from "../../model";
import { ErgoBoxNode } from "./ErgoBoxNode";
import { adjustpositionFromStartPos } from "../../utils";
import { getMaxWidthFromDimensions } from "../../model";
import { usePrevious } from "../../hooks";
import appConfig from "../../appConfig";
import * as R from "ramda";

import ReactFlow, {
  NodeTypes,
  Node,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";

const nodeTypes: NodeTypes = {
  inputBox: (props) => <ErgoBoxNode {...{ ...props, nodeType: "inputBox" }} />, // eslint-disable-line
  outputBox: (props) => (
    <ErgoBoxNode {...{ ...props, nodeType: "outputBox" }} />  // eslint-disable-line
  ),
};

interface TxFlowViewProps {
  initialNodes: Node[];
}

const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;

const defaultEdgesInit = [];
// const defaultEdges = [
//   //  { id: 'e57', source: 'input-0', target: 'output-1', type: 'smoothstep' },
//   //  { id: 'e57', source: 'input-0', target: 'output-1', type: 'smoothstep' },
//   {
//     id: "e1-2",
//     source: "input-0",
//     target: "output-1",
//     sourceHandle: "right",
//     targetHandle: "left",
//   },
// ];

//
const edgeFromPair = ([inputId, outputId]: [string, string]) => ({
  id: `${inputId}-${outputId}`,
  source: inputId,
  target: outputId,
  sourceHandle: "right",
  targetHandle: "left",
  animated: true,
  markerEnd: {
    type: "arrowclosed",
    color: "gray",
  },
});

export const TxFlowView = ({ initialNodes }: TxFlowViewProps) => {
  const { state } = useContext(StoreContext);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  //  console.log("initialNodes: ", JSON.stringify(initialNodes,null,2))
  //
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdgesInit);
  const prevInitialNodes = usePrevious(initialNodes);

  useEffect(() => {
    if (R.equals(prevInitialNodes, initialNodes)) {
      return;
    }

    const { dimensions } = state;
    const maxWidthFromInputBoxes = getMaxWidthFromDimensions(dimensions)(
      state.inputBoxIds
    ) as number;

    const adjustedInputPositions = adjustpositionFromStartPos(dimensions)({
      x: 5,
      y: 5,
    })(state.inputBoxIds) as any;
    const adjustedOutputPositions = adjustpositionFromStartPos(dimensions)({
      x: OffsetX + maxWidthFromInputBoxes,
      y: 5,
    })(state.outputBoxIds) as any;

    const adjustedPositions = {
      ...adjustedInputPositions,
      ...adjustedOutputPositions,
    };
    const layoutedNodes = nodes.map((node) => {
      const newPosition = adjustedPositions[node.data.internalId]?.position;
      if (newPosition) {
        node.position = adjustedPositions[node.data.internalId].position; // eslint-disable-line
      }
      // node.style = {border:"solid 3px black"}
      node.style = { borderRadius: "10px", border: "solid 1px lightgray" };  // eslint-disable-line

      return node;
    }) as Node[];
    setNodes(layoutedNodes);
    const edgesFromStore = state.connectionsByBoxId.map(edgeFromPair);
    setEdges(edgesFromStore);
    // }, [state]);
    // Todo: wrong dependency array
  }, [initialNodes, prevInitialNodes, state, nodes, setNodes, edges, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      // onInit={() => onLayout()}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      // onConnect={onConnect}
      // onPaneClick={onPaneClick}
      // connectionLineType={ConnectionLineType.Bezier}
      // connectionMode={ConnectionMode.Loose}
      // onEdgeUpdate={onEdgeUpdate}
    />
  );
};
