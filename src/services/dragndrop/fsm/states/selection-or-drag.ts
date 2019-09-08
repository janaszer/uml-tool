import { DragDropState } from "../drag-drop.state";
import { DragStart } from "./drag-start";
import { SelectionToggle } from "./selection-toggle";
import { DragDropService } from "../../drag-drop.service";
import { mouseEventService } from "../../../mouse/mouse.event";
import { Idle } from "./idle";

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
    // TODO: compare original target to class
    if (mouseEventService.getOriginalTarget()) {
      return new DragStart();
    }
    return new Idle();
  }
  public onMouseUp(dragService: DragDropService): DragDropState {
    return new SelectionToggle();
  }
}