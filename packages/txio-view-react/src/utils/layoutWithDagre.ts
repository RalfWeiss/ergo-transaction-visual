import dagre from "dagre";
import { getMaxWidthFromDimensions, Store } from "../model";
import { Node, Edge } from "react-flow-renderer";
import appConfig from "../appConfig";
import * as R from "ramda";

const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;

// const getMinYOfInputs = (nodes: Node[]) =>
//   R.pipe(
//     R.filter(R.propEq("type", "inputBox")),
//     R.map(R.path(["position", "y"])),
//     R.reduce(R.min, Infinity)
//   )(nodes);

export const layoutWithDagre =
  (state: Store) => (nodes: Node[], edges: Edge[]) => {
    const { dimensions } = state;
    const maxWidthFromInputBoxes = getMaxWidthFromDimensions(dimensions)(
      state.inputBoxIds
    ) as number;
    // if (R.equals(edges, prevEdges)) {
    //   console.log("edges are the same")
    //   return
    // }
    // console.log("nodes in layout: ", JSON.stringify(nodes, null,2))
    if (edges.length === 0) {
      return nodes;
    }

    // const minY = getMinYOfInputs(nodes);
    // console.log("inputs minY before dagre: ", minY);

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

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {          // eslint-disable-line
        // x: nodeWithPosition.x + Math.random() / 1000,
        // x:
        //   node.type === "inputBox"
        //     ? 5
        //     : node.type === "outputBox"
        //     ? OffsetX + maxWidthFromInputBoxes
        //     : maxWidthFromInputBoxes,
        x: R.cond([
          [R.propEq("type", "inputBox"), () => 5],
          [
            R.propEq("type", "outputBox"),
            () => OffsetX + maxWidthFromInputBoxes,
          ],
          [R.T, () => maxWidthFromInputBoxes],
        ])(node),
        y: nodeWithPosition.y,
      };
      return node;
    });

    // const minYAfter = getMinYOfInputs(nodes);
    // console.log("noOfGraphLayouts: ", state.noOfGraphLayouts);
    // console.log("inputs minY after dagre: ", minYAfter);

    // console.log("dagre layouted Nodes: ", JSON.stringify(layoutedNodes,null,2))
    return layoutedNodes;
  };
