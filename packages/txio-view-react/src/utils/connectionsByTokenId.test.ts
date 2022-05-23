import * as R from "ramda";
import {
  ergoBoxToKeyValueListTupleForTokenId,
  keyValueListTupleToPairs,
  groupInputIdByTokenId,
  replaceTokenIdsWithInputIdsByTokenId,
  mapValueListsOverKeys
} from "./connectionsByTokenId";

describe("propGroupBy", () => {
  it("should group tokenId by id", () => {
    const expected = [
      ["In-A", ["T1", "T2"]],
      ["In-B", ["T1"]],
    ];
    const data = {
      inputs: [
        { internId: "In-A", assets: [
          { tokenId: "T1" }, { tokenId: "T2"}
        ]},
        { internId: "In-B", assets: [
          { tokenId: "T1" }
        ]}    
      ],
      outputs: [
        { internId: "Out-1", assets: [
          { tokenId: "T2"}
        ]},
        { internId: "Out-2", assets: [
          { tokenId: "T1" }, { tokenId: "T2" }
        ]}
      ]
    };
    const result = ergoBoxToKeyValueListTupleForTokenId(data.inputs);
    expect(result).toEqual(expected);
  });
});


describe("toPairs", () => {
  it("match tokenId with Id", () => {
    const expected = [
      ["In-A", "T1"],
      ["In-A", "T2"],
      ["In-B", "T1"],
    ]
    const input = [
      ["In-A", ["T1", "T2"]],
      ["In-B", ["T1"]],
    ];
    const result = keyValueListTupleToPairs(input);
    expect(result).toEqual(expected);    
  })
})

describe("3. group inputId by tokenId", () => {
  it("match tokenId with Id", () => {
    const expected = {
      "T1": ["In-A", "In-B"],
      "T2": ["In-A"],
    }
    const input = [
      ["In-A", "T1"],
      ["In-A", "T2"],
      ["In-B", "T1"],
    ]
    const result = groupInputIdByTokenId(input);
    expect(result).toEqual(expected);    
  })
})

describe("5. replaceTokenIdsWithInputIdsByTokenId", () => {
  it("match tokenId with Id", () => {

    const expectedStep5 = {
      "Out-1": [ ["In-A"] ],
      "Out-2": [ ["In-A", "In-B"], ["In-A"]],
    }
    const expected = {
      "Out-1": [ "In-A" ],
      "Out-2": [ "In-A", "In-B"],
    }    
    const inputIdsByTokenId = {
      "T1": ["In-A", "In-B"],
      "T2": ["In-A"],
    }    
    const tokenIdsByOutputId = {
      "Out-1": ["T2"],
      "Out-2": ["T1", "T2"],
    }
    const result = replaceTokenIdsWithInputIdsByTokenId(inputIdsByTokenId)(tokenIdsByOutputId);
    expect(result).toEqual(expected);    
  })
})

describe("8. mapValueListsOverKeys", () => {
  it("should map each of these lists over it key:", () => {

    const expectedStep1 = {
      "Out-1": [["In-A", "Out-1"]],
      "Out-2": [["In-A", "Out-2"], ["In-B", "Out-2"]],
    }
    const expectedStep10 = [
      [["In-A", "Out-1"]],
      [["In-A", "Out-2"], ["In-B", "Out-2"]],
    ]
    const expected = [
      ["In-A", "Out-1"],
      ["In-A", "Out-2"], 
      ["In-B", "Out-2"],
    ]        
    const input = {
      "Out-1": [ "In-A" ],
      "Out-2": [ "In-A", "In-B"],
    }    

    const result = mapValueListsOverKeys(input);
    expect(result).toEqual(expected);    
  })
})