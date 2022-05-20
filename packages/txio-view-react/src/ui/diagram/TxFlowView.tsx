import React, { useEffect, useContext } from "react";
import { Context as StoreContext } from "../../model";
import { ErgoBoxNode } from "./ErgoBoxNode";
import { adjustpositionFromStartPos } from "../../utils";
import { getMaxWidthFromDimensions } from "../../model";
import appConfig from "../../appConfig";

import ReactFlow, { NodeTypes, Node, useNodesState } from "react-flow-renderer";

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

export const TxFlowView = ({ initialNodes }: TxFlowViewProps) => {
  const { state } = useContext(StoreContext);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
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

      return node;
    }) as Node[];
    setNodes(layoutedNodes);
  }, [state, nodes, setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      // edges={edges}
      // onInit={() => onLayout()}
      onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      // onConnect={onConnect}
      // onPaneClick={onPaneClick}
      // connectionLineType={ConnectionLineType.Bezier}
      // connectionMode={ConnectionMode.Loose}
      // onEdgeUpdate={onEdgeUpdate}
    />
  );
};
