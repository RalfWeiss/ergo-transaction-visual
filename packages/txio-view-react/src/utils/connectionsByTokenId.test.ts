import * as R from "ramda";
import {
  tokenIdsGroupedByInternId,
  keyValueListTupleToPairs,
  groupInputIdByTokenId,
  replaceTokenIdsWithInputIdsByTokenId,
  mapValueListsOverKeys,
  connectionsByTokenId
} from "./connectionsByTokenId";


describe("tokenIdsGroupedByInternId", () => {
  it("should group tokenId by id", () => {
    const expectedForInput = [
      ["In-A", ["T1", "T2"]],
      ["In-B", ["T1"]],
    ];
    const expectedForOutput = [
      ["Out-1", ["T2"]],
      ["Out-2", ["T1", "T2"]],
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
    const inputResult = tokenIdsGroupedByInternId(data.inputs);
    expect(inputResult).toEqual(expectedForInput);

    const outputResult = tokenIdsGroupedByInternId(data.outputs);
    expect(outputResult).toEqual(expectedForOutput);    
  });
  it("should group tokenId by id handle empties", () => {
    const expectedForInput = [
      ["In-A", ["T1", "T2"]],
      ["In-B", []],
    ];
    const expectedForOutput = [
      ["Out-1", ["T2"]],
      ["Out-2", []],
    ];    
    const data = {
      inputs: [
        { internId: "In-A", assets: [
          { tokenId: "T1" }, { tokenId: "T2"}
        ]},
        { internId: "In-B", assets: [
//          { tokenId: "T1" }
        ]}    
      ],
      outputs: [
        { internId: "Out-1", assets: [
          { tokenId: "T2"}
        ]},
        { internId: "Out-2", assets: [
//          { tokenId: "T1" }, { tokenId: "T2" }
        ]},
        {}
      ]
    };
    const inputResult = tokenIdsGroupedByInternId(data.inputs);
    expect(inputResult).toEqual(expectedForInput);

    const outputResult = tokenIdsGroupedByInternId(data.outputs);
    expect(outputResult).toEqual(expectedForOutput);    
  });  
  it("should group tokenId by id handle no assets", () => {
    const expectedForInput = [
      ["In-A", ["T1", "T2"]],
      ["In-B", []],
    ];
    const expectedForOutput = [
      ["Out-1", ["T2"]],
      ["Out-2", []],
    ];    
    const data = {
      inputs: [
        { internId: "In-A", assets: [
          { tokenId: "T1" }, { tokenId: "T2"}
        ]},
        { internId: "In-B" }    
      ],
      outputs: [
        { internId: "Out-1", assets: [
          { tokenId: "T2"}
        ]},
        { internId: "Out-2", assets: [
//          { tokenId: "T1" }, { tokenId: "T2" }
        ]},
        {}
      ]
    };
    const inputResult = tokenIdsGroupedByInternId(data.inputs);
    expect(inputResult).toEqual(expectedForInput);

    const outputResult = tokenIdsGroupedByInternId(data.outputs);
    expect(outputResult).toEqual(expectedForOutput);    
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
  it("match tokenId with Id handle empties 1", () => {
    const expected = [
      ["In-A", "T1"],
      ["In-A", "T2"],
//      ["In-B", "T1"],
    ]
    const input = [
      ["In-A", ["T1", "T2"]],
      ["In-B", []],
    ];
    const result = keyValueListTupleToPairs(input);
    expect(result).toEqual(expected);    
  })
  it("match tokenId with Id handle empties 2", () => {
    const expected = [
      ["In-A", "T1"],
      ["In-A", "T2"],
//      ["In-B", "T1"],
    ]
    const input = [
      ["In-A", ["T1", "T2"]],
      ["In-B", null],
    ];
    const result = keyValueListTupleToPairs(input);
    expect(result).toEqual(expected);    
  })
  it("match tokenId with Id handle empties 3", () => {
    const expected = [
      ["In-A", "T1"],
      ["In-A", "T2"],
//      ["In-B", "T1"],
    ]
    const input = [
      ["In-A", ["T1", "T2"]],
      [null],
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
  it("match tokenId with Id handle null", () => {
    const expected = {
      "T1": ["In-A", "In-B"],
//      "T2": ["In-A"],
    }
    const input = [
      ["In-A", "T1"],
      ["In-A", null],
      ["In-B", "T1"],
    ]
    const result = groupInputIdByTokenId(input);
    expect(result).toEqual(expected);    
  })
  it("match tokenId with Id handle null", () => {
    const expected = {
      "T1": ["In-A", "In-B"],
//      "T2": ["In-A"],
    }
    const input = [
      ["In-A", "T1"],
      [null, "T2"],
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
  it("match tokenId with Id handle empties", () => {

    const expectedStep5 = {
      "Out-1": [ ["In-A"] ],
      "Out-2": [ ["In-A", "In-B"], ["In-A"]],
    }
    const expected = {
      "Out-1": [  ],
      "Out-2": [ "In-A", "In-B"],
    }    
    const inputIdsByTokenId = {
      "T1": ["In-A", "In-B"],
//      "T2": ["In-A"],
    }    
    const tokenIdsByOutputId = {
      "Out-1": ["T2"],
      "Out-2": ["T1", "T2"],
    }
    const result = replaceTokenIdsWithInputIdsByTokenId(inputIdsByTokenId)(tokenIdsByOutputId);
    console.log("result replace: ", JSON.stringify(result, null, 2))
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
  it("should map each of these lists over it key handle empty list:", () => {

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
    ]        
    const input = {
      "Out-1": [ "In-A" ],
      "Out-2": [],
    }    

    const result = mapValueListsOverKeys(input);
    expect(result).toEqual(expected);    
  })  
})

describe("All together: makeConnectionOnTokenIds", () => {
  it("should group tokenId by id", () => {
    const expectedForInput = [
      ["In-A", ["T1", "T2"]],
      ["In-B", ["T1"]],
    ];
    const expInputIdsByTokenId = {
      "T1": ["In-A", "In-B"],
      "T2": ["In-A"],
    }       
    const expectedForOutput = [
      ["Out-1", ["T2"]],
      ["Out-2", ["T1", "T2"]],
    ];  
    
    const expected = [
      ["In-A", "Out-1"],
      ["In-A", "Out-2"], 
      ["In-B", "Out-2"],
    ]     

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
    // InputIdsByTokenId
    const inputIdsByTokenId = R.pipe(
      tokenIdsGroupedByInternId,
      keyValueListTupleToPairs,
      groupInputIdByTokenId
    )(data.inputs);
    expect(inputIdsByTokenId).toEqual(expInputIdsByTokenId);

    const result = connectionsByTokenId(data as any)
    expect(result).toEqual(expected);    
  });
  it("should group tokenId by id handle empties", () => {
    const expectedForInput = [
      ["In-A", ["T1", "T2"]],
      ["In-B", ["T1"]],
    ];
    const expInputIdsByTokenId = {
      "T1": ["In-A"],
      "T2": ["In-A"],
    }       
    const expectedForOutput = [
      ["Out-1", ["T2"]],
      ["Out-2", ["T1", "T2"]],
    ];  
    
    const expected = [
      ["In-A", "Out-1"],
      ["In-A", "Out-2"], 
//      ["In-B", "Out-2"],
    ]     

    const data = {
      inputs: [
        { internId: "In-A", assets: [
          { tokenId: "T1" }, { tokenId: "T2"}
        ]},
        { internId: "In-B", assets: [
//          { tokenId: "T1" }
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
    // InputIdsByTokenId
    const inputIdsByTokenId = R.pipe(
      tokenIdsGroupedByInternId,
      keyValueListTupleToPairs,
      groupInputIdByTokenId
    )(data.inputs);
    expect(inputIdsByTokenId).toEqual(expInputIdsByTokenId);

    const result = connectionsByTokenId(data as any)
    expect(result).toEqual(expected);    
  });  
});