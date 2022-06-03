import { initialGraphLayout, avoidOverlappingY } from "./layoutWithDagre";
import * as R from "ramda";

/*
[
  {
    "id": "input-0",
    "type": "inputBox",
    "position": {
      "x": 160,
      "y": 143.75
    },
    "data": {
      "internalId": "input-0",
      "label": "input-0"
    },
    "style": {
      "borderRadius": "10px",
      "border": "solid 1px lightgray"
    },
    "width": 320,
    "height": 279,
    "x": 160,
    "y": 143.75
  },
  {
    "id": "input-1",
    "type": "inputBox",
    "position": {
      "x": 160,
      "y": 560.5
    },
    "data": {
      "internalId": "input-1",
      "label": "input-1"
    },
    "style": {
      "borderRadius": "10px",
      "border": "solid 1px lightgray"
    },
    "width": 223,
    "height": 348,
    "x": 160,
    "y": 560.5
  },
  {
    "id": "output-0",
    "type": "outputBox",
    "position": {
      "x": 694,
      "y": 507.25
    },
    "data": {
      "internalId": "output-0",
      "label": "output-0"
    },
    "style": {
      "borderRadius": "10px",
      "border": "solid 1px lightgray"
    },
    "width": 223,
    "height": 325,
    "x": 694,
    "y": 507.25
  },
  {
    "id": "output-1",
    "type": "outputBox",
    "position": {
      "x": 694,
      "y": 139.5
    },
    "data": {
      "internalId": "output-1",
      "label": "output-1"
    },
    "style": {
      "borderRadius": "10px",
      "border": "solid 1px lightgray"
    },
    "width": 320,
    "height": 279,
    "x": 694,
    "y": 139.5
  },
  {
    "id": "output-2",
    "type": "outputBox",
    "position": {
      "x": 694,
      "y": 763.25
    },
    "data": {
      "internalId": "output-2",
      "label": "output-2"
    },
    "style": {
      "borderRadius": "10px",
      "border": "solid 1px lightgray"
    },
    "width": 205,
    "height": 87,
    "x": 694,
    "y": 763.25
  },
  {
    "id": "Tx",
    "type": "txBox",
    "data": {
      "label": "txBox",
      "internalId": "Tx"
    },
    "position": {
      "x": 427,
      "y": 580.5
    },
    "hidden": false,
    "width": 114,
    "height": 126,
    "x": 427,
    "y": 580.5
  }
]
*/
describe("reduce to obj", () => {
  it("should return an object", () => {
    // these are the layouted nodes from dagre
    const input = [
      {
        id: "input-0",
        type: "inputBox",
        position: {
          x: 160,
          y: 143.75,
        },
        data: {
          internalId: "input-0",
          label: "input-0",
        },
        style: {
          borderRadius: "10px",
          border: "solid 1px lightgray",
        },
        width: 320,
        height: 279,
        x: 160,
        y: 143.75,
      },
      {
        id: "input-1",
        type: "inputBox",
        position: {
          x: 160,
          y: 560.5,
        },
        data: {
          internalId: "input-1",
          label: "input-1",
        },
        style: {
          borderRadius: "10px",
          border: "solid 1px lightgray",
        },
        width: 223,
        height: 348,
        x: 160,
        y: 560.5,
      },
    ];
    const expected = {
      "input-0": input[0],
      "input-1": input[1],
    };
    const result = R.pipe(
      R.reduce(
        // (acc, x) => R.assoc(R.prop("id")(x))(x)(acc)
        (acc, x) => R.chain(R.assoc, R.prop("id"))(x)(acc)
      )({})
    )(input);
    expect(result).toEqual(expected);
  });
});

describe("avoidOverlappingY", () => {
  it("adjust y with respect to height", () => {
    const input = {
      in1: {
        id: "in1",
        width: 50,
        height: 100,
        x: 25,
        y: 100,
      },
      in2: {
        id: "in2",
        width: 50,
        height: 150,
        x: 25,
        y: 50,
      },
    };

    const expected = {
      in1: {
        id: "in1",
        width: 50,
        height: 100,
        x: 25,
        y: 220,
      },
      in2: {
        id: "in2",
        width: 50,
        height: 150,
        x: 25,
        y: 50,
      },
    };
    const result = avoidOverlappingY(20)(["in1", "in2"])(input);
    // console.log("result: ", JSON.stringify(result, null, 2));
    expect(result).toEqual(expected);
  });
});

describe.skip("initialGraphLayout", () => {
  it("should work as expected", () => {
    // const inputNodes = [
    //   { id: "in1", width: 50, height: 100 }, // position: { x: 10, y: 10 }},
    //   { id: "in2", width: 50, height: 150 }, // position: { x: 10, y: 10 }},
    //   { id: "out1", width: 50, height: 150 }, // position: { x: 10, y: 10 }},
    //   { id: "out2", width: 50, height: 100 },
    //   { id: "out3", width: 50, height: 50 },
    // ] as any;

    const inputNodes2 = [
      { id: "in1", width: 320, height: 270 }, // position: { x: 10, y: 10 }},
      { id: "in2", width: 256, height: 340 }, // position: { x: 10, y: 10 }},
      { id: "out1", width: 256, height: 320 }, // position: { x: 10, y: 10 }},
      { id: "out2", width: 320, height: 260 },
      { id: "out3", width: 234, height: 86 },
      // add a artificial common root node
      { id: "root", width: 0, height: 0 },
    ] as any;

    const inputEdges = [
      { id: "e1", source: "in1", target: "out1" },
      { id: "e2", source: "in1", target: "out2" },
      { id: "e2", source: "in2", target: "out2" },
      { id: "e2", source: "in2", target: "out3" },
      // add artificial edge from root
      // { id: "er1", source: "root", target: "in1"},
      // { id: "er2", source: "root", target: "in2"},
    ];
    // const expectedNodes = {
    //   in1: {
    //     id: "in1",
    //     width: 50,
    //     height: 100,
    //     x: 25,
    //     y: 50,
    //   },
    //   in2: {
    //     id: "in2",
    //     width: 50,
    //     height: 50,
    //     x: 25,
    //     y: 280,
    //   },
    //   out1: {
    //     id: "out1",
    //     width: 50,
    //     height: 50,
    //     x: 125,
    //     y: 40,
    //   },
    //   out2: {
    //     id: "out2",
    //     width: 50,
    //     height: 100,
    //     x: 125,
    //     y: 165,
    //   },
    //   out3: {
    //     id: "out3",
    //     width: 50,
    //     height: 50,
    //     x: 125,
    //     y: 290,
    //   },
    // };
    // const expectedNodes2 = {
    //   in1: {
    //     id: "in1",
    //     width: 320,
    //     height: 273,
    //     x: 160,
    //     y: 169.5,
    //   },
    //   in2: {
    //     id: "in2",
    //     width: 256,
    //     height: 342,
    //     x: 160,
    //     y: 724.5,
    //   },
    //   out1: {
    //     id: "out1",
    //     width: 256,
    //     height: 319,
    //     x: 530,
    //     y: 159.5,
    //   },
    //   out2: {
    //     id: "out2",
    //     width: 320,
    //     height: 273,
    //     x: 530,
    //     y: 505.5,
    //   },
    //   out3: {
    //     id: "out3",
    //     width: 234,
    //     height: 85,
    //     x: 530,
    //     y: 734.5,
    //   },
    // };

    const result = initialGraphLayout(inputNodes2, inputEdges);
    // console.log("result: ", JSON.stringify(result, null, 2));
    // expect(result._nodes).toEqual(expectedNodes2)
    expect(result._nodes.out2.y).toBeGreaterThan(
      result._nodes.out1.y + result._nodes.out1.height
    );
    expect(result._nodes.out3.y).toBeGreaterThan(
      result._nodes.out2.y + result._nodes.out2.height
    );
    expect(result._nodes.out3.y).toBeGreaterThan(
      result._nodes.out2.y + result._nodes.out2.height
    );
  });
});

describe.skip("initialGraphLayout", () => {
  it("should work as expected", () => {
    // const inputNodes = [
    //   { id: "in1", width: 50, height: 100 }, //position: { x: 10, y: 10 }},
    //   { id: "in2", width: 50, height: 50 }, //position: { x: 10, y: 10 }},
    //   { id: "out1", width: 50, height: 50 }, //position: { x: 10, y: 10 }},
    //   { id: "out2", width: 50, height: 100 },
    //   { id: "out3", width: 50, height: 50 },
    // ] as any
    const inputNodes = [
      { id: "in1", width: 320, height: 273 }, // position: { x: 10, y: 10 }},
      { id: "in2", width: 256, height: 342 }, // position: { x: 10, y: 10 }},
      { id: "out1", width: 256, height: 319 }, // position: { x: 10, y: 10 }},
      { id: "out2", width: 320, height: 273 },
      { id: "out3", width: 234, height: 85 },
      // add a artificial common root node
      { id: "root", width: 0, height: 0 },
    ] as any;
    const inputEdges = [
      { id: "e1", source: "in1", target: "out1" },
      { id: "e2", source: "in1", target: "out2" },
      { id: "e2", source: "in2", target: "out2" },
      { id: "e2", source: "in2", target: "out3" },
      // add artificial edge from root
      { id: "er1", source: "root", target: "in1" },
      { id: "er2", source: "root", target: "in2" },
    ];
    // const expectedNodes = {
    //   in1: {
    //     id: "in1",
    //     width: 50,
    //     height: 100,
    //     x: 25,
    //     y: 50,
    //   },
    //   in2: {
    //     id: "in2",
    //     width: 50,
    //     height: 50,
    //     x: 25,
    //     y: 280,
    //   },
    //   out1: {
    //     id: "out1",
    //     width: 50,
    //     height: 50,
    //     x: 125,
    //     y: 40,
    //   },
    //   out2: {
    //     id: "out2",
    //     width: 50,
    //     height: 100,
    //     x: 125,
    //     y: 165,
    //   },
    //   out3: {
    //     id: "out3",
    //     width: 50,
    //     height: 50,
    //     x: 125,
    //     y: 290,
    //   },
    // };
    // const expectedNodes2 = {
    //   in1: {
    //     id: "in1",
    //     width: 320,
    //     height: 273,
    //     x: 160,
    //     y: 169.5,
    //   },
    //   in2: {
    //     id: "in2",
    //     width: 256,
    //     height: 342,
    //     x: 160,
    //     y: 724.5,
    //   },
    //   out1: {
    //     id: "out1",
    //     width: 256,
    //     height: 319,
    //     x: 530,
    //     y: 159.5,
    //   },
    //   out2: {
    //     id: "out2",
    //     width: 320,
    //     height: 273,
    //     x: 530,
    //     y: 505.5,
    //   },
    //   out3: {
    //     id: "out3",
    //     width: 234,
    //     height: 85,
    //     x: 530,
    //     y: 734.5,
    //   },
    // };

    const result = initialGraphLayout(inputNodes, inputEdges);
    // console.log("result: ", JSON.stringify(result, null, 2));
    // expect(result._nodes).toEqual(expectedNodes2)
    expect(result._nodes.out2.y).toBeGreaterThan(
      result._nodes.out1.y + result._nodes.out1.height
    );
    expect(result._nodes.out3.y).toBeGreaterThan(
      result._nodes.out2.y + result._nodes.out2.height
    );
  });
});
