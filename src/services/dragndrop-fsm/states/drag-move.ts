import { DragDropState } from "../drag-drop.state";
import { Idle } from "./idle";
import { DragDropService } from "../../dragndrop/drag-drop.service";
import { mouseEventService } from "../../mouse/mouse.event";
import { classesVisualization } from "../../../classes";
import { selectionService } from "../../selection/selection.service";
import { SnapService } from "../../dragndrop/snap.service";
import { DragService } from "../../dragndrop/drag.service";

export class DragMove extends DragDropState {

  private dragService: DragService;
  private snapService: SnapService;

  public name: string = 'Drag move';

  constructor() {
    super();
    this.snapService = new SnapService();
    this.dragService = new DragService(this.snapService);
  }

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
    this.snapService.clearAllGuides(classesVisualization);
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

    const selectedClasses = classesVisualization
      .filter(classVis => selectionService.isSelected(classVis.id))

    if (selectedClasses.length === 1) {
      this.dragService.setCoordsOffset(selectedClasses[0], { x: xShift, y: yShift });
      return this;
    }
    
    selectedClasses.forEach(classVis => classVis.setCoordsOffset({ x: xShift, y: yShift }));

    return this;
  }
}
