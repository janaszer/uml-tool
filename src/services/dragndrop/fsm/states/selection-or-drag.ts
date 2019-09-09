import { DragDropState } from "../drag-drop.state";
import { DragStart } from "./drag-start";
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
      console.log('drag move');
      return new DragMove();
    }
    return new Idle();
  }
  public onMouseUp(dragService: DragDropService): DragDropState {
    return new SelectionToggle();
  }
}