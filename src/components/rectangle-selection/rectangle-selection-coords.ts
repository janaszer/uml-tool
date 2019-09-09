import { observable } from "mobx";
import { Coords } from "../../services/dragndrop/drag-drop.service";

export class RectangleSelectionCoords {

  @observable
  public isActive: boolean = false;

  @observable
  public startCoords: Coords = {
    x: 0,
    y: 0,
  };

  @observable
  public endCoords: Coords = {
    x: 0,
    y: 0,
  }

  public getRefinedCoords() {
    const x1 = Math.min(rectangleSelectionCoords.startCoords.x, rectangleSelectionCoords.endCoords.x);
    const y1 = Math.min(rectangleSelectionCoords.startCoords.y, rectangleSelectionCoords.endCoords.y);
    const width = Math.abs(rectangleSelectionCoords.startCoords.x - rectangleSelectionCoords.endCoords.x);
    const height = Math.abs(rectangleSelectionCoords.startCoords.y - rectangleSelectionCoords.endCoords.y);
    const x2 = x1 + width;
    const y2 = y1 + height;

    return {
      x1, x2, y1, y2, width, height,
    };
  }
}

export const rectangleSelectionCoords = new RectangleSelectionCoords();
