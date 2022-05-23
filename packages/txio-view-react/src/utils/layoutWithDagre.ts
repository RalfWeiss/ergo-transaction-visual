import dagre from "dagre";
import { getMaxWidthFromDimensions, Store } from "../model";
import { Node, Edge } from "react-flow-renderer";
import appConfig from "../appConfig";
import * as R from "ramda";

const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns;

const onlyOutputNodes = R.filter(R.propEq("type", "outputBox"))
const onlyInputNodes = R.filter(R.propEq("type", "inputBox"))


const getMinY = (nodes: Node[]) =>
  R.pipe(
    R.map(R.path(["position", "y"])),
    R.reduce(R.min, Infinity)
  )(nodes);

//const getNodesSorted = (nodes: Node[]) => 
const getNodesSorted = (nodes: Node[]) => R.sortWith([
//  R.descend(R.prop('age')),
  R.ascend(R.path(['position','y']))
])(nodes)

const initialGraphLayout =  (nodes: Node[], edges: Edge[]) => {
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
    return dagreGraph
  }    

export const layoutWithDagre =
  (state: Store) => (nodes: Node[], edges: Edge[]) => {

    const maxWidthFromInputBoxes = getMaxWidthFromDimensions(state.dimensions)(
      state.inputBoxIds
    ) as number;

    if (edges.length === 0) {
      return nodes;
    }


    // const dagreGraph = new dagre.graphlib.Graph();
    // dagreGraph.setDefaultEdgeLabel(() => ({}));

    // dagreGraph.setGraph({ rankdir: "LR" });
    // nodes.forEach((node) => {
    //   dagreGraph.setNode(node.id, node);
    // });
    // edges.forEach((edge) => {
    //   dagreGraph.setEdge(edge.source, edge.target);
    // });

    // dagre.layout(dagreGraph);

    const dagreGraph = initialGraphLayout(nodes, edges)

    let layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return R.mergeDeepRight(node, ({
          x: R.cond([
            [R.propEq("type", "inputBox"), () => appConfig.nodeStartPosition.x],
            [
              R.propEq("type", "outputBox"),
              () => OffsetX + maxWidthFromInputBoxes,
            ],
            [R.T, () => maxWidthFromInputBoxes],
          ])(node),
          y: nodeWithPosition.y,        
        }))
    });

  
    
    // console.log(`noOfGraphLayouts: ${state.noOfGraphLayouts}  minYBefore: ${minYBefore} minYAfter: ${minYAfter}`);
    if ((state.noOfGraphLayouts as number >= 4)) { // && (minYBefore !== minYAfter)) {

      const minYInputsAfter = R.o(getMinY, onlyInputNodes)(layoutedNodes)
      const minYOutputsAfter = R.o(getMinY, onlyOutputNodes)(layoutedNodes)  
      const minAfter = R.min(minYInputsAfter, minYOutputsAfter)

      const deltaY = minAfter -  appConfig.nodeStartPosition.y
      
      layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position.y = nodeWithPosition.y - deltaY //, appConfig.nodeStartPosition.y)
        return node
      })
    }

    if (state.noOfGraphLayouts >= 3) {
      const sortedNodes = getNodesSorted(layoutedNodes)
//      console.log("dagre sortedNodes: ", JSON.stringify(sortedNodes,null,2))
    }

    return layoutedNodes;
  };
