import { countPatches } from "./countPatches";

describe("countPatches", () => {
  it("returns 0 on equality", () => {
    const objA = [{ tokenId: "T1", amount: 1 }];
    const objB = [{ tokenId: "T1", amount: 1 }];

    expect(countPatches(objA, objB)).toEqual(0);
  });
  it("counts changing property as 1", () => {
    const objA = [{ tokenId: "T1", amount: 1 }];
    const objB = [{ tokenId: "T1", amount: 2 }];

    expect(countPatches(objA, objB)).toEqual(1);
  });

  it("counts adding an entry as 1", () => {
    const objA = [{ tokenId: "T1", amount: 1 }];
    const objB = [
      { tokenId: "T1", amount: 1 },
      { tokenId: "T2", amount: 2 },
    ];

    expect(countPatches(objA, objB)).toEqual(1);
  });

  it("counts related to undefined", () => {
    const objA = undefined;
    const objB = [
      { tokenId: "T1", amount: 1 },
      { tokenId: "T2", amount: 2 },
    ];

    expect(countPatches(objA, objB)).toEqual(2);
  });

  it("counts related to undefined (source)", () => {
    const objA = [
      { tokenId: "T1", amount: 1 },
      { tokenId: "T2", amount: 2 },
    ];
    const objB = undefined;
    // const expected = [
    //   [
    //     {"amount": 1, "tokenId": "T1"},
    //     {"amount": 2, "tokenId": "T2"}
    //   ],
    //   0,
    //   0
    // ]

    // Todo: check if 4 is right
    expect(countPatches(objA, objB)).toEqual(4);
  });

  it("counts related to empty array (source)", () => {
    const objA = [];
    const objB = [
      { tokenId: "T1", amount: 1 },
      { tokenId: "T2", amount: 2 },
    ];

    expect(countPatches(objA, objB)).toEqual(2);
  });

  it("counts related to empty array (dest)", () => {
    const objA = [
      { tokenId: "T1", amount: 1 },
      { tokenId: "T2", amount: 2 },
    ];
    const objB = [];

    expect(countPatches(objA, objB)).toEqual(2);
  });

  it("counts move an element as 2 patches", () => {
    const objA = [
      { tokenId: "T2", amount: 2 },
      { tokenId: "T1", amount: 1 },
    ];
    const objB = [
      { tokenId: "T1", amount: 1 },
      { tokenId: "T2", amount: 2 },
    ];

    expect(countPatches(objA, objB)).toEqual(2);
  });
});
