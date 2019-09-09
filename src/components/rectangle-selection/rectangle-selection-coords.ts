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
}

export const rectangleSelectionCoords = new RectangleSelectionCoords();
