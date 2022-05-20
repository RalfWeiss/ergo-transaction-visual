import React, {useEffect, useContext} from 'react'
import {Context as StoreContext} from '../model'
import { normalize } from '../model/ergoBox'
import { addInputBox, addOutputBox } from '../model/actions/addBox'
import {Store} from '../model/store'
import * as R from 'ramda'
import {DappstepFlow} from './DappstepFlow'

import {Node} from 'react-flow-renderer';


const initializeNode = (internalId:string):Node => ({
  id: internalId,
  //type: 'inputBox',
  type: 'outputBox',
  position: { x: 50, y: 50 },
  data: {
    internalId: internalId,
    label: internalId
  },    
})

const initialNodesWithState = (state:Store) => (internalId:string):Node => ({
  id: internalId,
  //type: 'inputBox',
  //type: 'outputBox',
  type: state.boxes[internalId]?.boxType || 'inputBox',
  position: { x: 50, y: 50 },
  data: {
    internalId: internalId,
    label: internalId
  },  
})


interface TxDiagramProps {
  width: number
  height: number
  data: {
    inputs: any[]
    outputs: any[]
  }
}

export const TxDiagram = ({width, height, data}:TxDiagramProps) => {
  const {state, setState} = useContext(StoreContext);

  // move data to state
  useEffect(() => {
    const inputs = data.inputs.map((b,idx) => ({
      ...b,
      internalId: "input-" + idx,
      boxType: "inputBox"
    }))
    const outputs = data.outputs.map((b,idx) => ({
      ...b,
      internalId: "output-" + idx,
      boxType: "outputBox"
    }))    
    
    const newState = R.reduce<any, any>(
      (state, b) => addInputBox(normalize(b))(state)
    , state)(inputs)

    const newState2 = R.reduce<any, any>(
      (state, b) => addOutputBox(normalize(b))(state)
    , newState)(outputs)    


    setState(newState2)    
  }, [data, state])  
  return (
    <div style={{width,height}}>
      { (state.allBoxes.length === 0 
        ? <div>No nodes</div>
        : <DappstepFlow initialNodes={state.allBoxes.map(initializeNode)}/>
      )}      
    </div>
  )
}