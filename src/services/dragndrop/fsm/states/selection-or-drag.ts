import { DragDropState } from "../drag-drop.state";
import { SelectionToggle } from "./selection-toggle";
import { DragDropService } from "../../drag-drop.service";
import { mouseEventService } from "../../../mouse/mouse.event";
import { Idle } from "./idle";
import { DragMove } from "./drag-move";

export class SelectionOrDrag extends DragDropState {
  public name: string = 'Selection or drag';

  public onInit(dragService: DragDropService): DragDropState {
    const originalCoords = dragService.getCoordsFromCurrentEvent();
    if (originalCoords) {
      dragService.setOriginalCoords(originalCoords);
    }
    return this;
  }
  public onMouseMove(dragService: DragDropService): DragDropState {
    // TODO: compare original target with class
    if (mouseEventService.getOriginalTarget()) {
      if (this.getDistance(dragService) < 5) {
        return this;
      }
      return new DragMove();
    }
    return new Idle();
  }
  public onMouseUp(dragService: DragDropService): DragDropState {
    return new SelectionToggle();
  }
  
  private getDistance(dragService: DragDropService): number {
    const originalCoords = dragService.getOriginalCoords();
    const currentCoords = dragService.getCoordsFromCurrentEvent();
    if (!currentCoords) {
      return 0;
    }
    return Math.sqrt(Math.pow(originalCoords.x - currentCoords.x, 2) + Math.pow(originalCoords.y - currentCoords.y, 2));
  }
}