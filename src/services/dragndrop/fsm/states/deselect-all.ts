import { DragDropState } from "../drag-drop.state";
import { Idle } from "./idle";
import { DragDropService } from "../../drag-drop.service";
import { selectionService } from "../../../selection/selection.service";


// TODO: to be changed to rectangle selection at some point
export class DeselectAll extends DragDropState {
  public name: string = 'Deselect all';

  public onInit(dragService: DragDropService): DragDropState {
    selectionService.clearSelection();
    return new Idle();
  }

}
