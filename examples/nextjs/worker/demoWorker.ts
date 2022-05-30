import * as R from "ramda";

export function hello(name) {
  return `Hello, ${R.toUpperCase(name)}`;
}
