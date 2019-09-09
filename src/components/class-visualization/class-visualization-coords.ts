import { observable, action } from "mobx";
import { Coords } from "../../services/dragndrop/drag-drop.service";

export class ClassVisualizationCoords {
  public id: string;
  private originalCoords: Coords = {
    x: 0,
    y: 0,
  }
  
  @observable
  public coords: Coords = {
    x: 0,
    y: 0,
  };

  public width: number = 100;
  public height: number = 100;

  constructor(x: number, y: number, id: string) {
    this.originalCoords = {
      x,
      y,
    };
    this.coords = {
      x,
      y,
    };
    this.id = id;
  }

  @action
  public setCoords(x: number, y: number) {
    this.coords.x = x;
    this.coords.y = y;
  }

  @action
  public setCoordsOffset(offset: Coords) {
    this.coords.x = this.originalCoords.x + offset.x;
    this.coords.y = this.originalCoords.y + offset.y;
  }

  public commitPosition() {
    this.originalCoords = {
      x: this.coords.x,
      y: this.coords.y,
    };
  }

}
