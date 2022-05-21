import * as R from "ramda"

export { addInputBox, addOutputBox } from "./addBox";
export { setDimension } from "./setDimensions";

export const setUseDagreLayout = R.assocPath(["config", "useDagreLayout"])