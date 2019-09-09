import { DragDropState } from "../drag-drop.state";
import { SelectionOrDrag } from "./selection-or-drag";
import { DragDropService } from "../../dragndrop/drag-drop.service";

export class Idle extends DragDropState {
  public name: string = 'Idle';
  public onMouseDown(dragService: DragDropService): DragDropState {
    return new SelectionOrDrag();
  }
}
