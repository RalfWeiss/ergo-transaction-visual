import appConfig from "../../appConfig";

interface EdgeFromIdPairProps {
  type: string;
  style: object;
}
const edgeFromIdPair =
  ({ type, style }: EdgeFromIdPairProps) =>
  ([inputId, outputId]: [string, string]) => ({
    id: `${type}-${inputId}-${outputId}`,
    source: inputId,
    target: outputId,
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style,
    markerEnd: appConfig.markerEnd,
  });

export const edgeByBoxIdFromIdPair = edgeFromIdPair({
  type: "boxId",
  style: appConfig.styleEdgeByBox,
});

export const edgeByTokenIdFromIdPair = edgeFromIdPair({
  type: "tokenId",
  style: appConfig.styleEdgeByTokenId,
});

export const edgeForInputToTx = (internalId: string) => ({
  id: `${internalId}-Tx`,
  source: internalId,
  target: "Tx",
  sourceHandle: "right",
  // targetHandle: "left",
  // animated: true,
  markerEnd: {
    type: "arrowclosed",
    color: "gray",
  },
});

export const edgeForOutputToTx = (internalId: string) => ({
  id: `Tx-${internalId}`,
  source: "Tx",
  target: internalId,
  // sourceHandle: "right",
  targetHandle: "left",
  // animated: true,
  markerEnd: {
    type: "arrowclosed",
    color: "gray",
  },
});
