import dagre from "dagre";
import { getMaxWidthFromDimensions, Store } from "../model";
import { Node, Edge } from "react-flow-renderer";
import { onlyInputNodes, onlyOutputNodes } from "../model";
import appConfig from "../appConfig";
import * as R from "ramda";

const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;

// const onlyOutputNodes = R.filter(R.propEq("type", "outputBox"))
// const onlyInputNodes = R.filter(R.propEq("type", "inputBox"))

const getMinY = (nodes: Node[]) =>
  R.pipe(R.map(R.path(["position", "y"])), R.reduce(R.min, Infinity))(nodes);

// const getNodesSorted = (nodes: Node[]) =>
// const getNodesSorted = (nodes: Node[]) =>
//   R.sortWith([
//     //  R.descend(R.prop('age')),
//     R.ascend(R.path(["position", "y"])),
//   ])(nodes);

const initialGraphLayout = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: "LR" });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, node);
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);
  return dagreGraph;
};

const adjustXPositionsOnLayoutedNodes =
  (nodes: Node[], edges: Edge[], maxWidthFromInputBoxes: number) =>
  (dagreGraph: any) => {
    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return R.mergeDeepRight(node, {
        x: R.cond([
          [R.propEq("type", "inputBox"), () => appConfig.nodeStartPosition.x],
          [
            R.propEq("type", "outputBox"),
            () => OffsetX + maxWidthFromInputBoxes,
          ],
          [R.T, () => maxWidthFromInputBoxes],
        ])(node),
        y: nodeWithPosition.y,
      });
    });
    return layoutedNodes;
  };

export const layoutWithDagre =
  (state: Store) => (nodes: Node[], edges: Edge[]) => {
    const maxWidthFromInputBoxes = getMaxWidthFromDimensions(state.dimensions)(
      state.inputBoxIds
    ) as number;

    if (edges.length === 0) {
      return nodes;
    }

    const dagreGraph = initialGraphLayout(nodes, edges);

    // let layoutedNodes = nodes.map((node) => {
    //   const nodeWithPosition = dagreGraph.node(node.id);
    //   return R.mergeDeepRight(node, ({
    //       x: R.cond([
    //         [R.propEq("type", "inputBox"), () => appConfig.nodeStartPosition.x],
    //         [
    //           R.propEq("type", "outputBox"),
    //           () => OffsetX + maxWidthFromInputBoxes,
    //         ],
    //         [R.T, () => maxWidthFromInputBoxes],
    //       ])(node),
    //       y: nodeWithPosition.y,
    //     }))
    // });
    let layoutedNodes = adjustXPositionsOnLayoutedNodes(
      nodes,
      edges,
      maxWidthFromInputBoxes
    )(dagreGraph);

    // console.log(`noOfGraphLayouts: ${state.noOfGraphLayouts}  minYBefore: ${minYBefore} minYAfter: ${minYAfter}`);
    if ((state.noOfGraphLayouts as number) >= 4) {
      // && (minYBefore !== minYAfter)) {

      const minYInputsAfter = R.o(getMinY, onlyInputNodes)(layoutedNodes);
      const minYOutputsAfter = R.o(getMinY, onlyOutputNodes)(layoutedNodes);
      const minAfter = R.min(minYInputsAfter, minYOutputsAfter);

      const deltaY = minAfter - appConfig.nodeStartPosition.y;
      // console.log(`noOfGraphLayouts: ${state.noOfGraphLayouts}  minAfter: ${minAfter} deltaY: ${deltaY}`);

      layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position.y = nodeWithPosition.y - deltaY; // eslint-disable-line 
        // , appConfig.nodeStartPosition.y)
        return node;
      });
    }

    // if (state.noOfGraphLayouts >= 4) {
    //   const sortedInputNodes = R.o(
    //     getNodesSorted,
    //     onlyInputNodes
    //   )(layoutedNodes);
    //   const sortedOutputNodes = R.o(
    //     getNodesSorted,
    //     onlyOutputNodes
    //   )(layoutedNodes);
    //   //      console.log("dagre sortedNodes: ", JSON.stringify(sortedNodes,null,2))
    // }

    return layoutedNodes;
  };
