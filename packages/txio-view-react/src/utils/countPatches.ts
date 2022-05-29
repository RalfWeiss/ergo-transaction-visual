import * as R from "ramda";
import { create as JSONDiffPatchCreate } from "jsondiffpatch";

const diffpatcher = JSONDiffPatchCreate({
  objectHash(obj) {
    return obj.tokenId;
  },
  arrays: {
    // default true, detect items moved inside the array (otherwise they will be registered as remove+add)
    detectMove: false,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false,
  },
});

export const countPatches = (objA: any, objB: any) => {
  const delta = diffpatcher.diff(objA, objB);
  if (!delta) {
    return 0;
  }

  if (R.is(Array, delta)) {
    return R.pipe(R.unnest, R.length)(delta);
  }

  if (R.is(Object, delta)) {
    return R.length(R.keys(delta)) - 1; // .length() - 1
  }

  return -1;
};
