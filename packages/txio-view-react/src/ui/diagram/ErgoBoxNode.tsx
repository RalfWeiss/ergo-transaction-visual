import React, { useContext } from "react";
import { Context as StoreContext, Store } from "../../model";
import * as R from "ramda";

import { Handle, Position, NodeProps } from "react-flow-renderer";
import { ErgoBoxCardContext } from "../ergo-box";

const nodeStyles = (color: string) => ({
  padding: "4px 4px",
  // border: "1px solid #ddd",
  backgroundColor: color,
  borderRadius: "10px",
});

type NodeType = "inputBox" | "outputBox";

interface ErgoBoxNodeProps extends NodeProps {
  nodeType: NodeType;
}

const addressById = (id: string) => R.path(["boxes", id, "address"]);
// const boxIdById = (id: string) => R.path(["boxes", id, "boxId"]);
const ergoTreeById = (id: string) => R.path(["boxes", id, "ergoTree"]);

const colorForInternalId =
  (id: string) =>
  (state: Store): string => {
    const address = addressById(id)(state) || "";
    if (state.colorMap[address]) {
      return state.colorMap[address];
    }
    const ergoTree = ergoTreeById(id)(state) || "";
    if (state.colorMap[ergoTree]) {
      return state.colorMap[ergoTree];
    }
    return ""; // Todo: return a default color
  };

export const ErgoBoxNode = ({ data, nodeType }: ErgoBoxNodeProps) => {
  const { state } = useContext(StoreContext);

  if (!state.boxes[data.internalId]) {
    return null;
  }

  const NodeHandle =
    nodeType === "inputBox"
      ? () => <Handle type="source" id="right" position={Position.Right} />
      : () => <Handle type="target" id="left" position={Position.Left} />;

  return (
    <>
      {/* <div style={nodeStyles(data.bgColor)}>      */}
      <div style={nodeStyles(colorForInternalId(data.internalId)(state))}>
        <ErgoBoxCardContext internalId={data.internalId} />
      </div>

      <NodeHandle />
    </>
  );
};
