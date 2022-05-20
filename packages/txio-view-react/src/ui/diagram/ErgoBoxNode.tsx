import React, { useRef } from "react";

import { Handle, Position, NodeProps } from "react-flow-renderer";
import { ErgoBoxCardContext } from "../ergo-box";

const nodeStyles = (color: string) => ({
  padding: "10px 15px",
  border: "1px solid #ddd",
  backgroundColor: color,
});

type NodeType = "inputBox" | "outputBox";

interface ErgoBoxNodeProps extends NodeProps {
  nodeType: NodeType;
}

export const ErgoBoxNode = ({ data, nodeType }: ErgoBoxNodeProps) => {
  const ref: any = useRef(null);

  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  // useLayoutEffect(() => {
  //   setWidth(ref.current?.offsetWidth || 0);
  //   setHeight(ref.current?.offsetHeight || 0);
  // }, []);

  const NodeHandle =
    nodeType === "inputBox"
      ? () => <Handle type="source" id="right" position={Position.Right} />
      : () => <Handle type="target" id="left" position={Position.Left} />;

  return (
    <>
      <div ref={ref} style={nodeStyles(data.bgColor)}>
        <ErgoBoxCardContext internalId={data.internalId} />
      </div>

      <NodeHandle />
    </>
  );
};
