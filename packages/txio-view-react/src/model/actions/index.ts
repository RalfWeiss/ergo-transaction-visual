import * as R from "ramda";

export { addInputBox, addOutputBox } from "./addBox";
export { setDiagramDimensions, setDimension } from "./setDimensions";

export const setUseDagreLayout = R.assocPath(["config", "useDagreLayout"]);
// Todo: move this deeper in an object
export const setNoOfGraphLayouts = R.assocPath(["noOfGraphLayouts"]);
