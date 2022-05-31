import * as R from "ramda";
import { defaultState } from "..";

export { addInputBox, addOutputBox } from "./addBox";
export { setDiagramDimensions, setDimension } from "./setDimensions";

export const setUseDagreLayout = R.assocPath(["config", "useDagreLayout"]);
// Todo: move this deeper in an object
export const setNoOfGraphLayouts = R.assocPath(["noOfGraphLayouts"]);
export const setSearchConnections = R.assocPath(["searchConnections"]);
export const clearConnections = R.assocPath(
  ["connectionsByTokenId"],
  defaultState.connectionsByTokenId
);
