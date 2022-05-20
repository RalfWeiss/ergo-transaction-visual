import React from 'react'

interface TxDiagramProps {
  width: number
  height: number
}

export const TxDiagram = ({width, height}:TxDiagramProps) => {
  return (
    <div style={{width,height}}>
      Diagram
    </div>
  )
}