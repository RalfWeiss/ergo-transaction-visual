export default {
  verticalDistanceBetweenBoxes: 40,
  horizontalDistanceBetweenInOutColumns: 120,
  nodeStartPosition: { x: 5, y: 10 },
  // rootPropsToShow: ['boxId', 'address', 'ergoTree', 'blockId', 'transactionId', 'value']
  // rootPropsToShow: ["boxId", "address", "ergoTree", "blockId", "value"],
  rootPropsToShow: ["boxId", "address", "value"],
  // colorNames good for black text color
  // https://www.quackit.com/css/color/charts/css_color_names_chart.cfm
  colorNames: [
    "LightCoral",
    "PaleGreen",
    "NavajoWhite",
    "Khaki",
    "SkyBlue",
    "MistyRose",
  ],
  styleEdgeByBox: {
    stroke: "darkblue", // '#f6ab6c',
    strokeWidth: 3,
  },
  styleEdgeByTokenId: {
    stroke: "coral",
    strokeWidth: 3,
  },
  markerEnd: {
    type: "arrowclosed",
    color: "gray",
  },
};
