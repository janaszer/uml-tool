import { DragDropState } from "../drag-drop.state";
import { DragDropService } from "../../drag-drop.service";
import { rectangleSelectionCoords } from "../../../../components/rectangle-selection/rectangle-selection-coords";
import { Idle } from "./idle";

export class RectangleSelectionMove extends DragDropState {
  public name: string = 'Rectangle selection';

  public onInit(dragService: DragDropService) {
    rectangleSelectionCoords.isActive = true;
    const originalCoords = {
      ...dragService.getOriginalCoords(),
    };
    rectangleSelectionCoords.startCoords = originalCoords;
    rectangleSelectionCoords.endCoords = originalCoords;
    return this;
  }

  public onMouseMove(dragService: DragDropService) {
    const coords = dragService.getCoordsFromCurrentEvent();
    if (!coords) {
      return this;
    }
    rectangleSelectionCoords.endCoords = coords;
    return this;
  }

  public onMouseUp(dragService: DragDropService) {
    rectangleSelectionCoords.isActive = false;
    
    return new Idle();
  }

}