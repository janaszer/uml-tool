import { observable, action } from "mobx";
import { Coords } from "../../services/dragndrop/drag-drop.service";

export class ClassACoords {
  
  @observable
  public coords?: Coords = {
    x: 0,
    y: 0,
  };

  @action
  public setCoords(x: number, y: number) {
    if (!this.coords) {
      this.coords = {
        x,
        y,
      };
      return;
    }

    this.coords.x = x;
    this.coords.y = y;
  }

}

export const classACoords = new ClassACoords();
