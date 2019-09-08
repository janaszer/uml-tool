import { DragDropState } from "../drag-drop.state";
import { Idle } from "./idle";
import { DragDropService } from "../../drag-drop.service";
import { classACoords } from "../../../../components/class-visualization/ClassACoords";

export class DragMove extends DragDropState {
  public name: string = 'Drag move';

  public onMouseUp(dragService: DragDropService): DragDropState {
    return new Idle();
  }

  public onMouseMove(dragService: DragDropService): DragDropState {
    const originalCoords = dragService.getOriginalCoords();
    const currentCoords = dragService.getCoordsFromCurrentEvent();
    if (!currentCoords) {
      return this;
    }
    const xShift = currentCoords.x - originalCoords.x;
    const yShift = currentCoords.y - originalCoords.y;

    classACoords.coords = {
      x: xShift,
      y: yShift,
    };

    return this;
  }
}