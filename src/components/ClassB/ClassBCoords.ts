import { Coords } from "../../DragState";
import { observable } from "mobx";

export class ClassBCoords {

  @observable
  public coords?: Coords = {
    x: 0,
    y: 0,
  };

}

export const classBCoords = new ClassBCoords();
(window as any).classBCoords = classBCoords;