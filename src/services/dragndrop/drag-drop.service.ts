import { DragDropFsm } from "./fsm/drag-drop.fsm";
import { MouseEventService } from "../mouse/mouse.event";

export type Coords = {
  x: number;
  y: number;
}

export class DragDropService {
  private fsm: DragDropFsm;
  private currentEvent: MouseEvent;
  private originalCoords: Coords;
  
  constructor(dragDropFsm: DragDropFsm) {
    this.fsm = dragDropFsm;
  }

  public onMouseDown(event: MouseEvent) {
    this.currentEvent = event;
    this.fsm.onMouseDown(this);
  }
  public onMouseUp(event: MouseEvent) {
    this.currentEvent = event;
    this.fsm.onMouseUp(this);
  }
  public onMouseMove(event: MouseEvent) {
    this.currentEvent = event;
    this.fsm.onMouseMove(this);
  }

  public setOriginalCoords(coords: Coords) {
    this.originalCoords = coords;
  }

  public getOriginalCoords(): Coords {
    return this.originalCoords;
  }

  public getCoordsFromCurrentEvent(): Coords | undefined {
    const mouseEvent = new MouseEventService(this.currentEvent);
    return mouseEvent.getCoords();
  }
}
