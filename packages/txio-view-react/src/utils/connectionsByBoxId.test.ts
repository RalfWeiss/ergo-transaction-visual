import * as R from "ramda";
import { 
  connectionsByBoxId,
  internalIdsGroupedByBoxId,
  mapInternalIdsToGroupedBoxIds 
} from "./connectionsByBoxId";

describe("internalIdsGroupedByBoxId", () => {
  it("should work", () => {
    const expected = {
      "box-1": ["output-0", "output-2"],
      "box-2": ["output-1"],
      "box-3": ["output-3"]
    };
    const data = {
      inputs: [
        {
          boxId: "f2295a",
          value: 100000,
          internalId: "input-0",
        },
        {
          boxId: "f2295a",
          value: 200000,
          internalId: "input-1",
        },        
      ],
      outputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "output-0",
        },
        {
          boxId: "box-2",
          value: 200000,
          internalId: "output-1",
        },
        ,  // provoking an undefined node
        {
          value: 300000,
          internalId: "output-2",
        },        
        {
          boxId: "box-1",
          value: 300000,
          internalId: "output-2",
        },
        {
          boxId: "box-3",
          value: 400000,
          internalId: "output-3",
        },                        
      ],
    };
    const result = R.pipe(
      internalIdsGroupedByBoxId
      //R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),      
    )(data.outputs)
    expect(result).toEqual(expected)
  })
})

describe("map inputs to internalIds of grouped outputs", () => {
  it("should work", () => {
    const expected = [
      ["input-0", ["output-0", "output-2"]]
    ]
    const outputsGroupedByBoxId = {
      "box-1": ["output-0", "output-2"],
      "box-2": ["output-1"],
      "box-3": ["output-3"]
    };
    const data = {
      inputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "input-0",
        },
//        , // provoking an undefined input
        {
          boxId: "f2295a",
          value: 200000,
          internalId: "input-1",
        },        
      ],
    }
    const result = R.pipe(
      mapInternalIdsToGroupedBoxIds(outputsGroupedByBoxId),
//      R.tap(d => console.log("data: ", JSON.stringify(d, null, 2))),      
    )(data.inputs)
    expect(result).toEqual(expected)
  })
})

describe("connections by boxId", () => {
  it("should work", () => {
    const expected = [
      ["input-0", ["output-0", "output-2"]]
    ]
    const data = {
      inputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "input-0",
        },
        {
          boxId: "f2295a",
          value: 200000,
          internalId: "input-1",
        },        
      ],
      outputs: [
        {
          boxId: "box-1",
          value: 100000,
          internalId: "output-0",
        },
        {
          boxId: "box-2",
          value: 200000,
          internalId: "output-1",
        },
//        ,  // provoking an undefined node
        {
          value: 300000,
          internalId: "output-2",
        },        
        {
          boxId: "box-1",
          value: 300000,
          internalId: "output-2",
        },
        {
          boxId: "box-3",
          value: 400000,
          internalId: "output-3",
        },                        
      ],
    };

    const result = connectionsByBoxId(data)
    expect(result).toEqual(expected)
  })
})