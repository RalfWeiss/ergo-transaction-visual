import React, {useEffect, useContext} from 'react'
import {Context as StoreContext} from '../../model'
import {ErgoNodeEasy} from './ErgoNodeSimple'
import {adjustPositions, adjustpositionFromStartPos} from '../../utils'
import { getMaxWidthFromDimensions } from '../../model'

import ReactFlow, {
  useReactFlow,
  NodeTypes,
  addEdge,
  ReactFlowProvider,
  Node,
  Position,
  Connection,
  Edge,
  ConnectionLineType,
  ConnectionMode,
  updateEdge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';


const nodeTypes: NodeTypes = {
  // Todo change to proper node types
  inputBox: (props) => <ErgoNodeEasy {...{...props, nodeType:"inputBox"}} />,
  outputBox: (props) => <ErgoNodeEasy {...{...props, nodeType:"outputBox"}} />,
  // inputBox: (props) => <div>InputNode</div>,
  // outputBox: (props) => <div>OutputNode</div>
};

interface DappstepFlowProps {
  //boxIds: string[],
  initialNodes: Node[]
}

// const getMaxWidthFromDimensions = (dimensions:any) => R.pipe(
//   R.map((key:string) => R.prop(key, dimensions)) as any,
//   R.pluck('width'),
//   R.reduce(R.max, 0)
// )

export const DappstepFlow = ({initialNodes}:DappstepFlowProps) => {
  const {state, setState} = useContext(StoreContext);    
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);  
//  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesWithState(state));  
  //const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesOrg);  
  // const [nodes, setNodes, onNodesChange] = useNodesState(adjustPositions2(initialNodesOrg));  
  //const [nodes, setNodes, onNodesChange] = useNodesState(dappstepNodes);  
//  const [edges, setEdges, onEdgesChange] = useEdgesState(toReactFlowEdges(dappstepNodes));

  // const onLayout = () => {
  //   const dimensions = state.dimensions
  //   // console.log("onLayout dimensions: ", JSON.stringify(dimensions, null, 2))
  //   // const layoutedNodes = nodes.map((node) => {
  //   //   node.position = adjustedPositions[node.data.internalId].position
  //   //   return node
  //   // }) as Node[]
  //   // setNodes(layoutedNodes)
  // }

  console.log("initialNodes: ", JSON.stringify(initialNodes, null, 2))

  const OffsetX = 120

  useEffect(() => {
    const dimensions = state.dimensions
    // const allWidth = R.pluck('width', R.values(dimensions))
    // const maxWidth = R.reduce(R.max, 0, allWidth) as number
    const maxWidthFromInputBoxes = getMaxWidthFromDimensions(dimensions)(state.inputBoxIds) as number

    const adjustedInputPositions = adjustpositionFromStartPos(dimensions)({ x: 5, y: 5 })(state.inputBoxIds) as any
    const adjustedOutputPositions = adjustpositionFromStartPos(dimensions)({ x: OffsetX + maxWidthFromInputBoxes, y: 5 })(state.outputBoxIds) as any
    //const adjustedPositions = adjustpositionFromStartPos(dimensions)({ x: 50, y: 50 })(state.inputBoxIds) as any
    const adjustedPositions = {
      ...adjustedInputPositions,
      ...adjustedOutputPositions
    }
    const layoutedNodes = nodes.map((node) => {
      const newPosition = adjustedPositions[node.data.internalId]?.position
      if (newPosition) {
        node.position = adjustedPositions[node.data.internalId].position
      }
      
      return node
    }) as Node[]
    setNodes(layoutedNodes)    
  }, [state])
  


  return (
    <ReactFlow
      nodes={nodes}
      //edges={edges}
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
