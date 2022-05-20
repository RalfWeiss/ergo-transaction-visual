import React, {useEffect, useContext} from 'react'
import {Context as StoreContext} from '../../model'
import {ErgoBoxNode} from './ErgoBoxNode'
import {adjustpositionFromStartPos} from '../../utils'
import {getMaxWidthFromDimensions } from '../../model'
import appConfig from '../../appConfig'

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
  inputBox: (props) => <ErgoBoxNode {...{...props, nodeType:"inputBox"}} />,
  outputBox: (props) => <ErgoBoxNode {...{...props, nodeType:"outputBox"}} />,
};

interface DappstepFlowProps {
  initialNodes: Node[]
}

const OffsetX = appConfig.horizontalDistanceBetweenInOutColumns

export const DappstepFlow = ({initialNodes}:DappstepFlowProps) => {
  const {state, setState} = useContext(StoreContext);    
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);  

  useEffect(() => {
    const dimensions = state.dimensions
    const maxWidthFromInputBoxes = getMaxWidthFromDimensions(dimensions)(state.inputBoxIds) as number

    const adjustedInputPositions = adjustpositionFromStartPos(dimensions)({ x: 5, y: 5 })
      (state.inputBoxIds) as any
    const adjustedOutputPositions = adjustpositionFromStartPos(dimensions)({ x: OffsetX + maxWidthFromInputBoxes, y: 5 })
      (state.outputBoxIds) as any

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
