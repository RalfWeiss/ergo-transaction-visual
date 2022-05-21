/*
connect input boxes with output boxes by boxId
1. group internalIds of output by boxId
2. map all internalIds of input to grouped boxIds by internalId
3. omit all empty and undefined mappings
*/
import * as R from "ramda";
import { ErgoTx } from "../model";

export const propGroupBy = (propGrouped: string) => (groupByProp: string) =>
  R.pipe(
    R.groupBy(R.prop(groupByProp)),
    R.map(R.pluck([propGrouped])),
    R.dissoc("undefined")
  );

// export const internalIdsGroupedByBoxId = R.pipe(
//   R.groupBy(R.prop("boxId")),
//   R.map(R.pluck(["internalId"])),
//   R.dissoc("undefined")
// );

export const mergeGroupedByWithProp =
  (propToMerge: string) => (groupByProp: string) => (outputsGroupedByBoxId) =>
    R.pipe(
      R.map(
        (inputBox) => [
          inputBox[propToMerge],
          outputsGroupedByBoxId[inputBox[groupByProp]],
        ] // ,
      ),
      R.reject(R.o(R.isNil, R.last)) // remove empties in the second part of the pair
      // R.reject(R.isNil))
      // R.reject(R.isEmpty)
    );

// export const mapInternalIdsToGroupedBoxIds = (outputsGroupedByBoxId) =>
//   R.pipe(
//     R.map(
//       (inputBox) => [
//         inputBox?.internalId,
//         outputsGroupedByBoxId[inputBox?.boxId],
//       ] // ,
//     ),
//     R.reject(R.o(R.isNil, R.last)) // remove empties in the second part of the pair
//     // R.reject(R.isNil))
//     // R.reject(R.isEmpty)
//   );
type PairOfStringWithStringList = [string, string[]];
type PairOfStrings = [string, string];
export const toPairedConnection = (
  data: PairOfStringWithStringList[]
): PairOfStrings[] =>
  R.pipe(
    R.map((pair: PairOfStringWithStringList) =>
      R.map(R.pair(R.head(pair)))(R.last(pair))
    ),
    R.unnest
  )(data);

export const connectionsByBoxId = (data: ErgoTx) =>
  R.pipe(
    mergeGroupedByWithProp("internalId")("boxId")(
      propGroupBy("internalId")("boxId")(data.outputs)
    ),
    toPairedConnection
  )(data.inputs);
