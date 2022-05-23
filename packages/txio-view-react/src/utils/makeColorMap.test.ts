import { makeColorMap, pickValues } from "./makeColorMap";

describe("pickKeyValue", () => {
  it("should omit empties and preserve order", () => {
    const expected = ["f2295a", "CxP58V", "f2295b"];
    const input = {
      inputs: [
        {
          boxId: "a8da67345cd0",
          transactionId:
            "a8da67345cd04b199069382c94000478b8f6d41eadbe0ea4e1aa893d2238b60b",
          blockId:
            "1cb4aeabf378c776fa696eb5606bada9719871b689f274b379e9a6e4b73c3387",
          value: 100000,
          index: 1,
          globalIndex: 16573729,
          creationHeight: 746660,
          settlementHeight: 746662,
          ergoTree: "f2295a",
          address: "CxP58V",
        },
      ],
      outputs: [
        {
          boxId: "a8da67345cd0",
          transactionId:
            "a8da67345cd04b199069382c94000478b8f6d41eadbe0ea4e1aa893d2238b60b",
          blockId:
            "1cb4aeabf378c776fa696eb5606bada9719871b689f274b379e9a6e4b73c3387",
          value: 100000,
          index: 1,
          globalIndex: 16573729,
          creationHeight: 746660,
          settlementHeight: 746662,
          ergoTree: "f2295b",
          address: "CxP58V",
        },
      ],
    };
    expect(pickValues(["ergoTree", "address"])(input)).toEqual(expected);
  });
});

describe("makeColorMap", () => {
  it("should make a color map", () => {
    const expected = {
      f2295a: "LightCoral",
      CxP58V: "PaleGreen",
      f2295b: "NavajoWhite",
    };
    const input = {
      inputs: [
        {
          ergoTree: "f2295a",
          transactionId: "a8da67",
          blockId: "1cb4aeabf378",
          value: 100000,
          address: "CxP58V",
        },
      ],
      outputs: [
        {
          ergoTree: "f2295b",
          transactionId: "a8da67",
          blockId: "1cb4aea",
          value: 100000,
          address: "CxP58V",
        },
      ],
    };
    const result = makeColorMap(input);
    expect(result).toEqual(expected);
  });
});
