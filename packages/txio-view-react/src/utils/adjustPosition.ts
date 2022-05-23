import { XYPosition } from "react-flow-renderer";
import * as R from "ramda";
import appConfig from "../appConfig";

export const VerticalDistanceBetweenBoxes =
  appConfig.verticalDistanceBetweenBoxes;

export interface Dimensions {
  width: number;
  height: number;
}

export interface ObjWithKeyedDimensions {
  [key: string]: Dimensions;
}

export interface ObjWithKeyedPosition {
  [key: string]: {
    position: XYPosition;
  };
}

export const indexedReduce = R.addIndex(R.reduce);

export const adjustPositions =
  (dimensions: ObjWithKeyedDimensions) => (input: ObjWithKeyedPosition) =>
    indexedReduce((acc, currKey, idx, arr) => {
      if (idx === 0) {
        return acc;
      }
      const currentKey = currKey as string;
      const accTyped = acc as ObjWithKeyedPosition;
      const prevKey = arr[idx - 1] as string;
      const prevPosition = accTyped[prevKey].position;
      const prevDimension = dimensions[prevKey];
      if (!prevPosition || !prevDimension) {
        return accTyped;
      }
      const newPosition = {
        x: prevPosition.x,
        y: prevPosition.y + prevDimension.height + VerticalDistanceBetweenBoxes,
      };
      accTyped[currentKey].position = newPosition as XYPosition;
      return acc;
    })(input);

export const adjustpositionFromStartPos =
  (dimensions: ObjWithKeyedDimensions) =>
  (startPos: XYPosition) =>
  (keys: string[]) => {
    const inputWithKeyedPositions = {
      [keys[0]]: {
        position: startPos,
      },
    };
    // console.log("inputWithKeyedPositions: ", JSON.stringify(inputWithKeyedPositions))
    return indexedReduce((acc, currKey, idx, arr) => {
      // console.log("acc: ", JSON.stringify(acc,null,2))
      if (idx === 0) {
        return acc;
      }
      const currentKey = currKey as string;
      // console.log("currentKey: ", currentKey)
      // let accTyped = acc as ObjWithKeyedPosition
      const accTyped = R.assoc(currentKey, {}, acc) as ObjWithKeyedPosition;
      const prevKey = arr[idx - 1] as string;
      const prevPosition = accTyped[prevKey].position;
      const prevDimension = dimensions[prevKey];
      if (!prevPosition || !prevDimension) {
        return accTyped;
      }
      const newPosition = {
        x: prevPosition.x,
        y: prevPosition.y + prevDimension.height + VerticalDistanceBetweenBoxes,
      };
      accTyped[currentKey].position = newPosition as XYPosition;
      return accTyped;
    })(inputWithKeyedPositions)(keys);
  };

// // const adjustPositions = (dimensions:any) => (startPos:Position) => (keys:string[]) => {
// //   return keys.map(
// //     (key, idx) => {
// //       if (idx === 0)
// //     }
// //   )
// // } as any

// export const adjustedPositions = {
//   'input-0': {
//     position: { x: 50, y: 50 },
//   },
//   'input-1': {
//     position: { x: 50, y: 50+150+SizeBetween },
//   },
//   'input-2': {
//     position: { x: 50, y: 50+150+150+(2*SizeBetween) },
//   },
// }
