/*
connect input boxes with output boxes by boxId
1. group internalIds of output by boxId
2. map all internalIds of input to grouped boxIds by internalId
3. omit all empty and undefined mappings
*/
import * as R from "ramda"

export const internalIdsGroupedByBoxId = R.pipe(
  R.groupBy(R.prop("boxId")),
  R.map(R.pluck(['internalId'])),
  R.dissoc("undefined")
)

export const mapInternalIdsToGroupedBoxIds = outputsGroupedByBoxId => R.pipe(
  R.map(
    (inputBox => ([inputBox?.internalId, outputsGroupedByBoxId[inputBox?.boxId]])) //,
  ),
  R.reject(R.o(R.isNil, R.last)), // remove empties in the second part of the pair
  //R.reject(R.isNil))
  //R.reject(R.isEmpty)
)

export const connectionsByBoxId = data => {
  //const outputsGroupedByBoxId = internalIdsGroupedByBoxId(data.outputs)
  return mapInternalIdsToGroupedBoxIds(
    internalIdsGroupedByBoxId(data.outputs)
  )(data.inputs)  
}