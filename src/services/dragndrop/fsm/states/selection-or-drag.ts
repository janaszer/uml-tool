import { DragDropState } from "../drag-drop.state";
import { DragStart } from "./drag-start";
import { SelectionToggle } from "./selection-toggle";
import { DragDropService } from "../../drag-drop.service";

export class SelectionOrDrag extends DragDropState {
  public name: string = 'Selection or drag';
  public onMouseMove(dragService: DragDropService): DragDropState {
    return new DragStart();
  }
  public onMouseDown(dragService: DragDropService): DragDropState {
    const originalCoords = dragService.getCoordsFromCurrentEvent();
    if (originalCoords) {
      dragService.setOriginalCoords(originalCoords);
    }
    return this;
  }
  public onMouseUp(dragService: DragDropService): DragDropState {
    return new SelectionToggle();
  }
}