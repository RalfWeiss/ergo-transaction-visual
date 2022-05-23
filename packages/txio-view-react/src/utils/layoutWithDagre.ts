import dagre from "dagre";
import { getMaxWidthFromDimensions } from "../model";
import {
  Node,
  Edge
} from "react-flow-renderer";
import appConfig from "../appConfig";

const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;

export const layoutWithDagre =(state) => (nodes: Node[], edges: Edge[]) => {
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
      //x: nodeWithPosition.x + Math.random() / 1000,
      x: (node.type === 'inputBox') ? 5 : OffsetX + maxWidthFromInputBoxes,
      y: nodeWithPosition.y,
    };

    

    return node;
  });
  console.log("dagre layouted Nodes: ", JSON.stringify(layoutedNodes,null,2))
  return layoutedNodes;
};