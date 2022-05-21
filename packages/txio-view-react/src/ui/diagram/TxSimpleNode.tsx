import React, { memo, FC, CSSProperties } from "react";

import { Handle, Position, NodeProps } from "react-flow-renderer";

const nodeStyles: CSSProperties = {
  padding: "10px 15px",
  border: "1px solid #ddd",
};

const TxSimpleNode: FC<NodeProps> = () => (
  <div style={nodeStyles}>
    <div>&nbsp;</div>
    <div>Transaction</div>
    <div>&nbsp;</div>
    <Handle type="source" id="right" position={Position.Right} />
    <Handle type="target" id="left" position={Position.Left} />;
  </div>
);

export default memo(TxSimpleNode);
