import * as R from "ramda";
import { logWhen } from "../../utils";

const debugLog = logWhen(false);

export { getBoxById } from "./getBoxById";
export { sumHeight } from "./sumHeight";

export const onlyOutputNodes = R.filter(R.propEq("type", "outputBox"));
export const onlyInputNodes = R.filter(R.propEq("type", "inputBox"));

export const selRootPropsToShow = R.pipe(
  R.path(["config", "rootPropsToShow"]),
  debugLog("Selector rootPropsToShow from state")
);
export const selColorNames = R.pathOr([], ["config", "boxColors"]);
