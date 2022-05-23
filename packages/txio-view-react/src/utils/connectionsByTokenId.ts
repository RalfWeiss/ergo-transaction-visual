import * as R from "ramda"

export const ergoBoxToKeyValueListTupleForTokenId = R.pipe(
  R.groupBy(R.prop("internId")),
  R.map(R.pluck("assets")),
  R.map(R.map(R.pluck("tokenId"))),
  R.map(R.unnest),
  R.toPairs,
  //R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
)

export const keyValueListTupleToPairs = R.pipe(
  R.map(
    pair => R.map(R.pair(R.head(pair)))(R.last(pair))
  ),
  R.unnest,
  //R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
)

export const groupInputIdByTokenId = R.pipe(
  R.groupBy(R.last),
  R.map(R.map(R.head)),
  //R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
)

export const replaceTokenIdsWithInputIdsByTokenId = inputIdsByTokenId => R.pipe(
  R.map(R.map(t => inputIdsByTokenId[t])),
  R.map(R.unnest), // Step 6.
  R.map(R.uniq),   // Step 7.
  //R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
)

export const mapValueListsOverKeys = R.pipe(
  // Step 9
  R.mapObjIndexed(
    (val, key, obj) => R.pipe(
      R.map( inBoxId =>  R.pair(inBoxId, key) ),
    )(val)
  ),
  R.values,   // Step 10
  R.unnest,   
  // R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),
)