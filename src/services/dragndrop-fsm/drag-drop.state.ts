import { DragDropService } from "../dragndrop/drag-drop.service";

export abstract class DragDropState {
  public abstract name: string;
  public onMouseMove?(dragDropService: DragDropService): DragDropState;
  public onMouseDown?(dragDropService: DragDropService): DragDropState;
  public onMouseUp?(dragDropService: DragDropService): DragDropState;
  public onInit?(dragDropService: DragDropService): DragDropState;
}