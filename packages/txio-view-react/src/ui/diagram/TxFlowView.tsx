import React, { useEffect } from "react";
import {
  Selectors,
  // onlyInputNodes,
  // onlyOutputNodes,
} from "../../model";
import { ErgoBoxNode } from "./ErgoBoxNode";
import TxSimpleNode from "./TxSimpleNode";
import { adjustpositionFromStartPos, logWhen } from "../../utils";
import { getMaxWidthFromDimensions } from "../../model";
import { usePrevious, useStore } from "../../hooks";
import { Dimensions, DimensionsByKey } from "../../model";
import appConfig from "../../appConfig";
import * as R from "ramda";
import ReactFlow, {
  NodeTypes,
  Node,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { layoutWithDagre, avoidOverlappingY } from "../../utils";
import {
  //  edgeByBoxIdFromIdPair,
  edgeByTokenIdFromIdPair,
  edgeForInputToTx,
  edgeForOutputToTx,
} from "./edges";

import { useUpdateEffect } from "usehooks-ts";

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
  position: { x: 450, y: 100 },
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
  const maxWidthFromInputBoxes = getMaxWidthFromDimensions(dimensions)(
    inputBoxIds
  ) as number;
  const maxWidthFromOutputBoxes = getMaxWidthFromDimensions(dimensions)(
    outputBoxIds
  ) as number;

  // const adjustedInputPositions = adjustpositionFromStartPos(dimensions)({
  //   x: StartX,
  //   y: StartY,
  // })(inputBoxIds) as any;
  const adjustedInputPositions = R.pipe(
    adjustpositionFromStartPos(dimensions)({
      x: StartX,
      y: StartY,
    }),
    // debugLog("adjustedInputPositions in"),
    R.mapObjIndexed((v, k) =>
      R.pipe(
        R.assocPath(
          ["position", "x"],
          maxWidthFromInputBoxes - (dimensions[k]?.width || 0) + 5
        )
      )(v)
    )
    // debugLog("adjustedInputPositions out")
  )(inputBoxIds) as any;
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

const getAdjustedPositions = (state) => (layoutedNodes) => {
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

  // const adjustedPositions = adjustNodePositions({
  return adjustNodePositions({
    inputBoxIds: inputNodeIds,
    outputBoxIds: outputNodeIds,
    dimensions: state.dimensions,
    diagramDimensions: state.diagramDimensions,
  });
};

// const MaxNoOfGraphLayouts = 7;

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const TxFlowView = ({
  initialNodes,
  useDagreLayout,
}: TxFlowViewProps) => {
  // const { state, setState } = useContext(TxioStoreContext);
  const { state, setState } = useStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdgesInit);
  // const isMounted = useIsMounted();
  const prevInitialNodes = usePrevious(initialNodes);
  const prevConnections = usePrevious(state.connectionsByTokenId);

  useEffect(() => {
    // if (state.noOfGraphLayouts > MaxNoOfGraphLayouts) {
    if (state.noOfGraphLayouts > state.allBoxes.length + 1) {
      return;
    }
    debugLog("TxFlowView noOfGraphLayouts")(state.noOfGraphLayouts);

    setState(R.assoc("noOfGraphLayouts", state.noOfGraphLayouts + 1));

    // initial rendering with adjusted positions based on ErgoBoxCard dimensions
    if (state.noOfGraphLayouts === 1) {
      // const adjustedPositions = adjustNodePositions(state);
      const adjustedPositions = adjustNodePositions({
        inputBoxIds: state.inputBoxIds,
        outputBoxIds: state.outputBoxIds,
        dimensions: state.dimensions,
        diagramDimensions: state.diagramDimensions,
      });
      // debugLog("adjustedPositions")(adjustedPositions);

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
      )(initialNodes);

      setNodes(layoutedNodes);

      const edgesFromStore = [
        ...R.map(edgeByTokenIdFromIdPair)(state.connectionsByTokenId),
        //      ...R.map(edgeByBoxIdFromIdPair)(state.connectionsByBoxId),
        ...R.map(edgeForInputToTx)(state.inputBoxIds),
        ...R.map(edgeForOutputToTx)(state.outputBoxIds),
      ];

      setEdges(edgesFromStore);
    }

    // if (state.noOfGraphLayouts < 3) {
    //   return;
    // }
    // if (state.noOfGraphLayouts >= 3) {
    // if (state.noOfGraphLayouts >= 4) {
    if (state.noOfGraphLayouts >= state.allBoxes.length) {
      // 4
      // setNodes(layoutWithDagre)
      if (useDagreLayout) {
        const layoutedNodes = layoutWithDagre(state)(nodes, edges);

        const adjustedPositions = getAdjustedPositions(state)(layoutedNodes);

        const repositionedNodes = R.map((node) => ({
          ...node,
          position:
            adjustedPositions[node.data?.internalId]?.position || node.position,
          // try to only position x
          // {
          //   x: adjustedPositions[node.data?.internalId]?.position?.x || node.position.x,
          //   y: node.position.y
          // }
        }))(layoutedNodes);

        // console.log("state.inputBoxIds: ", state.inputBoxIds)
        // const debugLog = logWhen(true)
        //setNodes(repositionedNodes);
        // new 3.6.22
        R.pipe(
          debugLog("input"),
          R.reduce(
            (acc, x) => R.chain(R.assoc, R.prop("id"))(x)(acc)
          )({}),
          avoidOverlappingY(5)(state.inputBoxIds),
          avoidOverlappingY(5)(state.outputBoxIds),
          debugLog("output"),
          R.values,
          setNodes
        )(layoutedNodes)
      }
    }
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

  // if I move this out I cannot move the nodes anymore
  // useEffect(() => {
  //   if (state.noOfGraphLayouts >= 4) { // 4
  //     // setNodes(layoutWithDagre)
  //     if (useDagreLayout) {
  //       const layoutedNodes = layoutWithDagre(state)(nodes, edges);

  //       const adjustedPositions = getAdjustedPositions(state)(layoutedNodes);

  //       const repositionedNodes = R.map((node) => ({
  //         ...node,
  //         position:
  //           adjustedPositions[node.data?.internalId]?.position || node.position,
  //       }))(layoutedNodes);

  //       setNodes(repositionedNodes);
  //     }
  //   }

  // }, [nodes, edges, state, setNodes])

  useUpdateEffect(() => {
    if (R.equals(prevConnections, state.connectionsByTokenId)) {
      return;
    }
    // const edgesFromStore = state.connectionsByBoxId.map(edgeFromPair);
    const edgesFromStore = [
      ...R.map(edgeByTokenIdFromIdPair)(state.connectionsByTokenId),
      //      ...R.map(edgeByBoxIdFromIdPair)(state.connectionsByBoxId),
      ...R.map(edgeForInputToTx)(state.inputBoxIds),
      ...R.map(edgeForOutputToTx)(state.outputBoxIds),
    ];

    setEdges(edgesFromStore);
  }, [prevConnections, nodes, edges, setNodes, state, setState]);

  // // useEffect
  // useUpdateEffect(() => {
  //   if (state.noOfGraphLayouts > 6) {
  //     // 5
  //     return;
  //   }
  //   //void delay(100).then(() => {
  //   delay(100).then(() => {
  //     debugLog("noOfGraphLayouts in Promise")(state.noOfGraphLayouts);
  //     // if (isMounted() && state.noOfGraphLayouts < 6) {
  //     //   setState((s) => R.assoc("TxFlowView noOfGraphLayouts", s.noOfGraphLayouts + 1)(s));
  //     // }
  //   });
  // }, [isMounted, state, setState]);

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
