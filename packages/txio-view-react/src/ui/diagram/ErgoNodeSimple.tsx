import React, { memo, FC, useLayoutEffect, useRef, useState } from 'react';

import { Handle, Position, NodeProps } from 'react-flow-renderer';
// import {BlockTreeView} from '../../../block-tree-view/BlockTreeView'
import { ErgoBoxCard, ErgoBoxCardContext } from '../ergo-box'
//import { ErgoBoxCardContext } from '../../../ui/ergo-box/ErgoBoxCardContext'
// : CSSProperties
const nodeStyles = (color:string) => ({ 
  padding: '10px 15px', 
  border: '1px solid #ddd',
  backgroundColor: color
});

const handleStyle = { left: 10 };

type NodeType = 'inputBox' | 'outputBox'

const ErgoNodeSimple = (nodeType:NodeType):FC<ErgoNodeEasyProps> =>  ErgoNodeEasy


interface ErgoNodeEasyProps extends NodeProps {
  nodeType : NodeType
}

export const ErgoNodeEasy =  ({ id, data, nodeType }:ErgoNodeEasyProps) => {
  const ref:any = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // https://bobbyhadz.com/blog/react-get-width-of-element
  // https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
  useLayoutEffect(() => {
    console.log("width: ", id, " ", ref.current.offsetWidth || 'null')
    console.log("height: ", id, " ", ref.current.offsetHeight )
    console.log('ref.current', ref.current );
    // console.log('width', ref.current ? ref.current.getBoundingClientRect().width : 0);
    setWidth(ref.current?.offsetWidth || 0);
    setHeight(ref.current?.offsetHeight || 0);

    console.log("ErgoNodeEasy data: ", JSON.stringify(data, null, 2))
  }, []);

  const NodeHandle = (nodeType === 'inputBox') 
    ?  () => <Handle type="source" id="right" position={Position.Right} />
    :  () => <Handle type="target" id="left" position={Position.Left} /> 

    
  return (
    <>
    <div ref={ref} style={nodeStyles(data.bgColor)}>
      {/* <div>{data.label.map((v:any) => <p>{v}</p>)}</div> */}
      {/* <ErgoBoxCard ergoBox={data.raw} internalId={data.internalId}/> */}
      <ErgoBoxCardContext  internalId={data.internalId}/>
    </div>

    <NodeHandle />  
    
    </>
  );
};

//export default memo(ErgoNodeSimple);
export default (nodeType:NodeType) => memo(ErgoNodeSimple(nodeType));
