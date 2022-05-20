import * as R from "ramda";

export const getBoxById = (id: string) => R.path(["boxes", id]);
