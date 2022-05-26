import React, { useEffect, useContext } from "react";
import {
  Context as StoreContext,
  Selectors,
  // onlyInputNodes,
  // onlyOutputNodes,
} from "../../model";
import { ErgoBoxNode } from "./ErgoBoxNode";
import TxSimpleNode from "./TxSimpleNode";
import { adjustpositionFromStartPos, logWhen } from "../../utils";
import { getMaxWidthFromDimensions } from "../../model";
import { usePrevious } from "../../hooks";
import { Dimensions, DimensionsByKey } from "../../model";
import appConfig from "../../appConfig";
import * as R from "ramda";
import ReactFlow, {
  NodeTypes,
  Node,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { layoutWithDagre } from "../../utils";
import {
  edgeByBoxIdFromIdPair,
  edgeByTokenIdFromIdPair,
  edgeForInputToTx,
  edgeForOutputToTx,
} from "./edges";

const debugLog = logWhen(false);

const nodeTypes: NodeTypes = {
  inputBox: (props) => <ErgoBoxNode {...{ ...props, nodeType: "inputBox" }} />, // eslint-disable-line
  outputBox: (props) => (
    <ErgoBoxNode {...{ ...props, nodeType: "outputBox" }} />  // eslint-disable-line
  ),
  txBox: (props) => <TxSimpleNode {...props}/> // eslint-disable-line
};

interface TxFlowViewProps {
  initialNodes: Node[];
  useDagreLayout?: boolean;
}

// const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;
const PADDING_RIGHT = 15;

const defaultEdgesInit = [];

const InitialTxNode: Node = {
  id: "Tx",
  type: "txBox",
  data: {
    label: "txBox",
    internalId: "Tx",
  },
  position: { x: 100, y: 50 },
  // node is only used for dagre calculations
  hidden: true,
};

const StartX = appConfig.nodeStartPosition.x;
const StartY = appConfig.nodeStartPosition.y;

interface AdjustNodePositionsProps {
  inputBoxIds: string[];
  outputBoxIds: string[];
  dimensions: DimensionsByKey;
  diagramDimensions: Dimensions;
}
const adjustNodePositions = ({
  inputBoxIds,
  outputBoxIds,
  dimensions,
  diagramDimensions,
}: AdjustNodePositionsProps) => {
  // const maxWidthFromInputBoxes = getMaxWidthFromDimensions(dimensions)(
  //   inputBoxIds
  // ) as number;
  const maxWidthFromOutputBoxes = getMaxWidthFromDimensions(dimensions)(
    outputBoxIds
  ) as number;

  const adjustedInputPositions = adjustpositionFromStartPos(dimensions)({
    x: StartX,
    y: StartY,
  })(inputBoxIds) as any;
  const adjustedOutputPositions = adjustpositionFromStartPos(dimensions)({
    // x: OffsetX + maxWidthFromInputBoxes,
    x: diagramDimensions.width - PADDING_RIGHT - maxWidthFromOutputBoxes,
    y: StartY,
  })(outputBoxIds) as any;

  return {
    ...adjustedInputPositions,
    ...adjustedOutputPositions,
  };
};

const getNodesSorted = (nodes: Node[]) =>
  R.sortWith([
    //  R.descend(R.prop('age')),
    R.ascend(R.path(["position", "y"])),
  ])(nodes);

export const TxFlowView = ({
  initialNodes,
  useDagreLayout,
}: TxFlowViewProps) => {
  const { state, setState } = useContext(StoreContext);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdgesInit);
  const prevInitialNodes = usePrevious(initialNodes);

  useEffect(() => {
    // if (R.equals(prevInitialNodes, initialNodes)) {
    //   return;
    // }
    if (state.noOfGraphLayouts > 5) {
      return;
    }

    setState(R.assoc("noOfGraphLayouts", state.noOfGraphLayouts + 1));

    debugLog("nodes")(nodes);
    debugLog("initialNodes")(initialNodes);

    // const adjustedPositions = adjustNodePositions(state);
    const adjustedPositions = adjustNodePositions({
      inputBoxIds: state.inputBoxIds,
      outputBoxIds: state.outputBoxIds,
      dimensions: state.dimensions,
      diagramDimensions: state.diagramDimensions,
    });
    debugLog("adjustedPositions")(adjustedPositions);

    const layoutedNodes = R.pipe(
      R.map((node) => ({
        ...node,
        position:
          adjustedPositions[node.data?.internalId]?.position || node.position,
        style: { borderRadius: "10px", border: "solid 1px lightgray" },
      })),
      R.ifElse(
        // add central TxNode for layouting if it doesn't exist
        R.find(R.propEq("id", "Tx")),
        R.identity,
        R.append(InitialTxNode)
      )
      //    )(nodes);
    )(initialNodes);

    debugLog("layoutedNodes")(layoutedNodes);

    setNodes(layoutedNodes);

    // const edgesFromStore = state.connectionsByBoxId.map(edgeFromPair);
    const edgesFromStore = [
      ...R.map(edgeByTokenIdFromIdPair)(state.connectionsByTokenId),
      ...R.map(edgeByBoxIdFromIdPair)(state.connectionsByBoxId),
      ...R.map(edgeForInputToTx)(state.inputBoxIds),
      ...R.map(edgeForOutputToTx)(state.outputBoxIds),
    ];

    setEdges(edgesFromStore);

    if (state.noOfGraphLayouts < 3) {
      return;
    }
    // setNodes(layoutWithDagre)
    if (useDagreLayout) {
      const layoutedNodes = layoutWithDagre(state)(nodes, edges);
      const inputNodeIds = R.compose(
        R.pluck("id"),
        getNodesSorted,
        Selectors.onlyInputNodes
      )(layoutedNodes);
      // console.log("inputNode: ", JSON.stringify(inputNodeIds, null, 2))
      const outputNodeIds = R.compose(
        R.pluck("id"),
        getNodesSorted,
        Selectors.onlyOutputNodes
      )(layoutedNodes);
      // console.log("outputNode: ", JSON.stringify(outputNodeIds, null, 2))

      const adjustedPositions = adjustNodePositions({
        inputBoxIds: inputNodeIds,
        outputBoxIds: outputNodeIds,
        dimensions: state.dimensions,
        diagramDimensions: state.diagramDimensions,
      });
      // console.log("adjustedPositions: ", JSON.stringify(adjustedPositions, null, 2))

      const repositionedNodes = R.map((node) => ({
        ...node,
        position:
          adjustedPositions[node.data?.internalId]?.position || node.position,
        // style: { borderRadius: "10px", border: "solid 1px lightgray" },
      }))(layoutedNodes);

      // setNodes(layoutedNodes);
      setNodes(repositionedNodes);
    }
    // }, [state]);

    // Todo: wrong dependency array
  }, [
    initialNodes,
    prevInitialNodes,
    state,
    nodes,
    setNodes,
    edges,
    setEdges,
    setState,
    useDagreLayout,
  ]);

  // useEffect(() => {
  //   if (R.equals(initialNodes, prevInitialNodes)) {
  //     console.log("useEffect: initialNodes are the same")
  //   }
  //   if (R.equals(nodes, prevNodes)) {
  //     console.log("useEffect: nodes are the same")
  //   }
  //   if (R.equals(edges, prevEdges)) {
  //     console.log("useEffect: nodes are the same")
  //   }
  //   console.log("noOfGraphLayouts: ", state.noOfGraphLayouts)
  //   if (state.noOfGraphLayouts < 3) {
  //     setState(R.assoc("noOfGraphLayouts", state.noOfGraphLayouts+1))
  //   }
  //   //if (edges.length > 0 ) setNodes(layout())
  // },[nodes, edges, state])

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
