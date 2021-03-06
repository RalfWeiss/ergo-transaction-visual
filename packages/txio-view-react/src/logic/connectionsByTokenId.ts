import * as R from "ramda";
import { ErgoTx } from "../model";
import { logWhen } from "../utils";

const debugLog = logWhen(false);

// const notIsNil = R.o(R.not,R.isNil)

export const tokenIdsGroupedByinternalId = R.pipe(
  R.reject(R.isEmpty),
  R.reject(R.isNil),
  //  R.groupBy(R.prop("internalId")),
  R.groupBy(R.propOr("")("internalId")),
  R.map(R.pluck("assets")),
  R.map(
    R.map(
      // replacing nils with empty list enables unnest later
      R.when(R.isNil)(R.always([]))
    )
  ),
  R.map(R.map(R.pluck("tokenId"))),
  R.map(R.unnest),
  R.toPairs,
  // R.tap(d => console.log("tokenIdsGroupedByinternalId result: ", JSON.stringify(d, null, 2))),
  debugLog("tokenIdsGroupedByinternalId result")
);

export const keyValueListTupleToPairs = R.pipe(
  R.reject(R.isNil),
  R.reject(R.o(R.isNil, R.last)),
  // lines before freshly added
  R.map((pair) => R.map(R.pair(R.head(pair)))(R.last(pair))),
  R.unnest,
  // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
  debugLog("keyValueListTupleToPairs result")
);

export const groupInputIdByTokenId = R.pipe(
  R.reject(R.isNil),
  R.reject(R.o(R.isNil, R.last)),
  R.reject(R.o(R.isNil, R.head)),
  // lines before freshly added
  R.groupBy(R.last),
  R.map(R.map(R.head)),
  debugLog("groupInputIdByTokenId result")
  // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
);

export const replaceTokenIdsWithInputIdsByTokenId = (inputIdsByTokenId) =>
  R.pipe(
    R.map(R.map((t) => inputIdsByTokenId[t])),
    R.map(R.unnest), // Step 6.
    R.map(R.uniq), // Step 7.
    R.map(R.reject(R.isNil)),
    // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
    debugLog("replaceTokenIdsWithInputIdsByTokenId result")
  );

export const mapValueListsOverKeys = R.pipe(
  // Step 9
  R.mapObjIndexed((val, key) =>
    R.pipe(R.map((inBoxId) => R.pair(inBoxId, key)))(val)
  ),
  R.values, // Step 10
  // R.tap(d => console.log("mapValueListsOverKeys values: ", JSON.stringify(d, null, 2))),
  // R.map(R.reject(R.isNil)), // newly added
  R.map(
    R.map(
      // replacing nils with empty list enables unnest later
      R.when(R.isNil)(R.always([]))
    )
  ),
  R.unnest,
  // R.tap(d => console.log("mapValueListsOverKeys result: ", JSON.stringify(d, null, 2))),
  debugLog("mapValueListsOverKeys result")
);

export const connectionsByTokenId = (data: ErgoTx) => {
  if (!data || !data.inputs || !data.outputs) {
    return [];
  }

  const inputIdsByTokenId = R.pipe(
    // R.tap(d => console.log("connectionsByTokenId-inputIdsByTokenId input: ", JSON.stringify(d, null, 2))),
    debugLog("connectionsByTokenId-inputIdsByTokenId input"),
    tokenIdsGroupedByinternalId,
    // R.tap(d => console.log("connectionsByTokenId-inputIdsByTokenId tokenIdsGroupedByinternalId: ", JSON.stringify(d, null, 2))),
    debugLog(
      "connectionsByTokenId-inputIdsByTokenId tokenIdsGroupedByinternalId"
    ),
    keyValueListTupleToPairs,
    // R.tap(d => console.log("connectionsByTokenId-inputIdsByTokenId keyValueListTupleToPairs: ", JSON.stringify(d, null, 2))),
    debugLog("connectionsByTokenId-inputIdsByTokenId keyValueListTupleToPairs"),
    groupInputIdByTokenId
    // R.tap(d => console.log("connectionsByTokenId-inputIdsByTokenId groupInputIdByTokenId: ", JSON.stringify(d, null, 2))),
  )(data.inputs);

  // console.log("connectionsByTokenId-inputIdsByTokenId=", JSON.stringify(inputIdsByTokenId, null, 2))
  // if (!inputIdsByTokenId) return []

  const result = R.pipe(
    // R.tap(d => console.log("connectionsByTokenId-tokenIdsGroupedByinternalId before: ", JSON.stringify(d, null, 2))),
    tokenIdsGroupedByinternalId,
    // R.tap(d => console.log("connectionsByTokenId-tokenIdsGroupedByinternalId after: ", JSON.stringify(d, null, 2))),
    R.fromPairs,
    // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
    replaceTokenIdsWithInputIdsByTokenId(inputIdsByTokenId),
    // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
    mapValueListsOverKeys,
    // R.tap(d => console.log("mapValueListsOverKeys: ", JSON.stringify(d, null, 2))),
    debugLog("connectionsByTokenId-result")
  )(data.outputs);

  return result;
};
