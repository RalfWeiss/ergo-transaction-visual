import * as R from "ramda";
import { toState } from "@ertravi/txio-view-react";

export function hello(name) {
  const _name = R.toUpper(name);
  return `Hello, ${_name}`;
}

export function convertToState(data) {
  return toState(data);
}
