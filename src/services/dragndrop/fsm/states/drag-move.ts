import { DragDropState } from "../drag-drop.state";
import { Idle } from "./idle";
import { DragDropService } from "../../drag-drop.service";
import { classCords } from "../../../../components/class-visualization/class-visualization-coords";
import { mouseEventService } from "../../../mouse/mouse.event";

export class DragMove extends DragDropState {
  public name: string = 'Drag move';

  public onMouseUp(dragService: DragDropService): DragDropState {
    classCords.commitPosition();
    mouseEventService.clearOriginalTarget();
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

    classCords.setCoordsOffset({ x: xShift, y: yShift });

    return this;
  }
}