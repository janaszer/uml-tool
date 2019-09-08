import { DragDropState } from "../drag-drop.state";
import { DragMove } from "./drag-move";
import { DragDropService } from "../../drag-drop.service";

export class DragStart extends DragDropState {
  public name: string = 'Drag start';
  public onMouseMove(dragService: DragDropService): DragDropState {
    return new DragMove();
  }
}