import { DragDropState } from "../drag-drop.state";
import { DragDropService } from "../../dragndrop/drag-drop.service";
import { rectangleSelectionCoords } from "../../../components/rectangle-selection/rectangle-selection-coords";
import { Idle } from "./idle";
import { classesVisualization } from "../../../classes";
import { selectionService } from "../../selection/selection.service";

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
    const coords = rectangleSelectionCoords.getRefinedCoords();
    const classesToSelect = classesVisualization.filter(classVis => {
      const x1 = classVis.coords.x;
      const y1 = classVis.coords.y;
      const x2 = x1 + classVis.width;
      const y2 = y1 + classVis.height;

      return coords.x1 < x2 &&
        coords.x2 > x1 &&
        coords.y1 < y2 &&
        coords.y2 > y1;
    });
    const idsToSelect = classesToSelect.map(classVis => classVis.id);
    selectionService.clearSelection();
    idsToSelect.forEach(id => selectionService.addToSelection(id));

    return new Idle();
  }

}