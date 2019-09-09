import React from "react";
import { rectangleSelectionCoords } from "./rectangle-selection-coords";

export class RectangleSelection extends React.Component {
  public render() {
    if (!rectangleSelectionCoords.isActive) {
      return null;
    }

    const xStart = Math.min(rectangleSelectionCoords.startCoords.x, rectangleSelectionCoords.endCoords.x);
    const yStart = Math.min(rectangleSelectionCoords.startCoords.y, rectangleSelectionCoords.endCoords.y);
    const width = Math.abs(rectangleSelectionCoords.startCoords.x - rectangleSelectionCoords.endCoords.x);
    const height = Math.abs(rectangleSelectionCoords.startCoords.y - rectangleSelectionCoords.endCoords.y);

    return <rect
      width={width}
      height={height}
      x={xStart}
      y={yStart}
      strokeWidth="2"
      stroke="#29a6e1"
      fill="#29a6e1"
      fillOpacity="0.3"
    ></rect>;
  }
}