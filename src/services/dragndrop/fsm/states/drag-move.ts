import { DragDropState } from "../drag-drop.state";
import { Idle } from "./idle";
import { DragDropService } from "../../drag-drop.service";

export class DragMove extends DragDropState {
  public name: string = 'Drag move';
  public onMouseUp(dragService: DragDropService): DragDropState {
    return new Idle();
  }
}