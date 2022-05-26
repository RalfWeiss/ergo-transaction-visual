import * as R from "ramda";

export { getBoxById } from "./getBoxById";

export const onlyOutputNodes = R.filter(R.propEq("type", "outputBox"));
export const onlyInputNodes = R.filter(R.propEq("type", "inputBox"));

export const selRootPropsToShow = R.path(["config", "rootPropsToShow"]);
export const selColorNames = R.path(["config", "colorNames"]);
