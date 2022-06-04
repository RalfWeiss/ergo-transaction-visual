import dagre from "dagre";
// import { getMaxWidthFromDimensions, Store } from "../model";
import { Store } from "../model";
import { Node, Edge } from "react-flow-renderer";
// import { Selectors } from "../model";
// import appConfig from "../appConfig";
import { logWhen } from "../utils"
import * as R from "ramda";

const debugLog = logWhen(false)

const reduceIndexed = R.addIndex(R.reduce);

// const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;

// const onlyOutputNodes = R.filter(R.propEq("type", "outputBox"))
// const onlyInputNodes = R.filter(R.propEq("type", "inputBox"))

// const getMinY = (nodes: Node[]) =>
//   R.pipe(R.map(R.path(["position", "y"])), R.reduce(R.min, Infinity))(nodes);

// const getNodesSorted = (nodes: Node[]) =>
// const getNodesSorted = (nodes: Node[]) =>
//   R.sortWith([
//     //  R.descend(R.prop('age')),
//     R.ascend(R.path(["position", "y"])),
//   ])(nodes);

export const initialGraphLayout = (nodes: Node[], edges: Edge[]) => {
  // new Graph({ multigraph: true, compound: true });
  const dagreGraph = new dagre.graphlib.Graph({
    multigraph: false,
    compound: true,
  });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: "LR" });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, node);
  });
  edges.forEach((edge) => {
    // if (edge.source !== "txBox" && edge.target !== "txBox")
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // console.log("dagreGraph: ", JSON.stringify(dagreGraph, null, 2));

  dagre.layout(dagreGraph);
  return dagreGraph;
};

export const avoidOverlappingY =
  (distance: number) => (ids: string[]) => (nodeObj) =>
    R.pipe(
      // extract nodes
      (s) => R.ap(R.map((id) => R.path([id]))(ids))([s]),
      // sort by y
      //      R.tap((x) => console.log("map: ", x)),
      R.sortBy(R.prop("y")),
      //      R.tap((x) => console.log("prop y: ", x)),
      R.pluck("id"),
      debugLog("ids ordered"),
      // readjust according to y and height
      reduceIndexed((acc, x, idx, arr) => {
        if (idx === 0) {
          return acc;
        }

        // console.log("acc: ", acc);
        // console.log("x: ", x);
        const lastKey = arr[idx - 1];
        // acc[x].y = R.max(acc[x].y, acc[lastKey].y + acc[lastKey].height + distance)
        const newY = R.max(
          R.path([x, "y"])(acc),
          R.path([lastKey, "y"])(acc) +
            R.path([lastKey, "height"])(acc) +
            distance
          // acc[lastKey].y + acc[lastKey].height + distance
        );
        const newAcc = R.assocPath([x, "y"])(newY)(acc);
        return newAcc;
      })(nodeObj),
      debugLog("avoid overlap: updated")
    )(nodeObj);

// const adjustXPositionsOnLayoutedNodes =
//   (nodes: Node[], edges: Edge[], maxWidthFromInputBoxes: number) =>
//   (dagreGraph: any) => {
//     const layoutedNodes = nodes.map((node) => {
//       const nodeWithPosition = dagreGraph.node(node.id);
//       return R.mergeDeepRight(node, {
//         x: R.cond([
//           [R.propEq("type", "inputBox"), () => appConfig.nodeStartPosition.x],
//           [
//             R.propEq("type", "outputBox"),
//             () => OffsetX + maxWidthFromInputBoxes,
//           ],
//           [R.T, () => maxWidthFromInputBoxes],
//         ])(node),
//         y: nodeWithPosition.y,
//       });
//     });
//     return layoutedNodes;
//   };

export const layoutWithDagre =
  (state: Store) => (nodes: Node[], edges: Edge[]) => {   // eslint-disable-line 
    // const maxWidthFromInputBoxes = getMaxWidthFromDimensions(state.dimensions)(
    //   state.inputBoxIds
    // ) as number;

    if (edges.length === 0) {
      return nodes;
    }

    const debugLog = logWhen(false)

    const dagreGraph = initialGraphLayout(nodes, edges);

    // attempt to just use dagre
    const layoutedNodes2 = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      // // - deltaY;
      // node.position.y = nodeWithPosition.y; // eslint-disable-line 
      // node.position.x = nodeWithPosition.x; // eslint-disable-line
      // // , appConfig.nodeStartPosition.y)
      // return node;
      return R.pipe(
        R.assocPath(["position", "y"])(nodeWithPosition.y),
        R.assocPath(["position", "x"])(nodeWithPosition.x),        
        // Todo: Document it!!! This is an important step to layout the graph correctly
        n => R.mergeDeepLeft(R.path(["dimensions", n.id])(state))(n),

        debugLog("node in layouted")
      )(node)
    });
    return layoutedNodes2;

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
    // let layoutedNodes = adjustXPositionsOnLayoutedNodes(
    //   nodes,
    //   edges,
    //   maxWidthFromInputBoxes
    // )(dagreGraph);

    // // console.log(`noOfGraphLayouts: ${state.noOfGraphLayouts}  minYBefore: ${minYBefore} minYAfter: ${minYAfter}`);
    // if ((state.noOfGraphLayouts as number) >= 4) {
    //   // && (minYBefore !== minYAfter)) {

    //   const minYInputsAfter = R.o(
    //     getMinY,
    //     Selectors.onlyInputNodes
    //   )(layoutedNodes);
    //   const minYOutputsAfter = R.o(
    //     getMinY,
    //     Selectors.onlyOutputNodes
    //   )(layoutedNodes);
    //   const minAfter = R.min(minYInputsAfter, minYOutputsAfter);

    //   const deltaY = minAfter - appConfig.nodeStartPosition.y;
    //   // console.log(`noOfGraphLayouts: ${state.noOfGraphLayouts}  minAfter: ${minAfter} deltaY: ${deltaY}`);

    //   layoutedNodes = nodes.map((node) => {
    //     const nodeWithPosition = dagreGraph.node(node.id);
    //     node.position.y = nodeWithPosition.y - deltaY; // eslint-disable-line
    //     // , appConfig.nodeStartPosition.y)
    //     return node;
    //   });
    // }

    // // if (state.noOfGraphLayouts >= 4) {
    // //   const sortedInputNodes = R.o(
    // //     getNodesSorted,
    // //     onlyInputNodes
    // //   )(layoutedNodes);
    // //   const sortedOutputNodes = R.o(
    // //     getNodesSorted,
    // //     onlyOutputNodes
    // //   )(layoutedNodes);
    // //   //      console.log("dagre sortedNodes: ", JSON.stringify(sortedNodes,null,2))
    // // }

    // return layoutedNodes;
  };
