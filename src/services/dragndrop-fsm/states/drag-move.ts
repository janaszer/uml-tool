import { DragDropState } from "../drag-drop.state";
import { Idle } from "./idle";
import { DragDropService } from "../../dragndrop/drag-drop.service";
import { mouseEventService } from "../../mouse/mouse.event";
import { classesVisualization } from "../../../classes";
import { selectionService } from "../../selection/selection.service";

export class DragMove extends DragDropState {
  public name: string = 'Drag move';

  public onInit(dragService: DragDropService): DragDropState {
    const originalTarget = mouseEventService.getOriginalTarget();
    if (!originalTarget) {
      return this;
    }

    if (!selectionService.isSelected(originalTarget.id)) {
      selectionService.clearSelection();
      selectionService.addToSelection(originalTarget.id);
    }

    return this;
  }

  public onMouseUp(dragService: DragDropService): DragDropState {
    classesVisualization.forEach(classVis => classVis.commitPosition());
    mouseEventService.clearOriginalTarget();
    return new Idle();
  }

  public onMouseMove(dragService: DragDropService): DragDropState {
    const originalCoords = dragService.getOriginalCoords();
    const currentCoords = dragService.getCoordsFromCurrentEvent();
    if (!currentCoords) {
      return this;
    }
    const xShift = currentCoords.x - originalCoords.x;
    const yShift = currentCoords.y - originalCoords.y;

    classesVisualization
      .filter(classVis => selectionService.isSelected(classVis.id))
      .forEach(classVis => classVis.setCoordsOffset({ x: xShift, y: yShift }));

    return this;
  }
}
