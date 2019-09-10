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

  @observable
  public verticalGuides = {
    start: false,
    middle: false,
    end: false,
  };

  @observable
  public horizontalGuides = {
    start: false,
    middle: false,
    end: false,
  }

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
  public setCoords(coords: Coords) {
    this.coords.x = coords.x;
    this.coords.y = coords.y;
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

  public getOriginalCoords(): Coords {
    return this.originalCoords;
  }

  @action
  public clearGuides() {
    this.verticalGuides.start = false;
    this.verticalGuides.middle = false;
    this.verticalGuides.middle = false;
    this.horizontalGuides.start = false;
    this.horizontalGuides.middle = false;
    this.horizontalGuides.middle = false;
  }

}
