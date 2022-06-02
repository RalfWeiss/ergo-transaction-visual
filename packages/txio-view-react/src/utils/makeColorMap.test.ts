import { addLabelsToColorMap, makeColorMap, pickValues } from "./makeColorMap";
// import { pickValues } from "./makeColorMap";
import * as R from "ramda"

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
    const state = {
      config: {
        boxColors: ["LightCoral", "PaleGreen", "yellow"],
      },
    } as any;
    const expected = {
      f2295a: {
        color: "LightCoral",
        type: "SC",
      },
      "0008cd025e6f22d4ba36bd53adbfe449cf85ab11067cfd265b11a8e8faf6d100bd1c2913":
        {
          color: "PaleGreen",
          type: "P2PK",
        },
      "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304":
        {
          color: "yellow",
          type: "Fee",
        },
      //      CxP58V: "PaleGreen",
      //      f2295b: "NavajoWhite",
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
          ergoTree:
            "0008cd025e6f22d4ba36bd53adbfe449cf85ab11067cfd265b11a8e8faf6d100bd1c2913",
          transactionId: "a8da67",
          blockId: "1cb4aea",
          value: 100000,
          address: "CxP58V",
        },
        {
          ergoTree:
            "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304",
        },
      ],
    };
    const result = makeColorMap(state)(input);
    expect(result).toEqual(expected);
  });
});


describe("makeColorMap", () => {
  it("should make a color map", () => {
    const expected = {
      f2295a: {
        color: "LightCoral",
        type: "SC",
        label: "A"
      },
      f2295b: {
        color: "LightBlue",
        type: "SC",
        label: "B"
      },      
      "0008cd025e6f22d4ba36bd53adbfe449cf85ab11067cfd265b11a8e8faf6d100bd1c2913":
        {
          color: "PaleGreen",
          type: "P2PK",
          label: "Alice"
        },
      "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304":
        {
          color: "yellow",
          type: "Fee",
          label: "Fee"
        },
      //      CxP58V: "PaleGreen",
      //      f2295b: "NavajoWhite",
    };
    const input = {
      f2295a: {
        color: "LightCoral",
        type: "SC",
      },
      f2295b: {
        color: "LightBlue",
        type: "SC",
      },      
      "0008cd025e6f22d4ba36bd53adbfe449cf85ab11067cfd265b11a8e8faf6d100bd1c2913":
        {
          color: "PaleGreen",
          type: "P2PK",
        },
      "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304":
        {
          color: "yellow",
          type: "Fee",
        },
      //      CxP58V: "PaleGreen",
      //      f2295b: "NavajoWhite",
    };
    const result = addLabelsToColorMap(input)

    expect(result).toEqual(expected)
  })
})