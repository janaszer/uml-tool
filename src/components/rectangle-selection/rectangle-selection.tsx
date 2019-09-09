import React from "react";
import { rectangleSelectionCoords } from "./rectangle-selection-coords";
import { observer } from "mobx-react";

@observer
export class RectangleSelection extends React.Component {
  public render() {
    if (!rectangleSelectionCoords.isActive) {
      return null;
    }

    const rectangleCoords = rectangleSelectionCoords.getRefinedCoords();

    return <rect
      width={rectangleCoords.width}
      height={rectangleCoords.height}
      x={rectangleCoords.x1}
      y={rectangleCoords.y1}
      strokeWidth="2"
      stroke="#29a6e1"
      fill="#29a6e1"
      fillOpacity="0.3"
    ></rect>;
  }
}