import { Coords } from "./drag-drop.service";
import { ClassVisualizationCoords } from "../../components/class-visualization/class-visualization-coords";
import { classesVisualization } from "../../classes";
import { SnapService } from "./snap.service";

export class DragService {

  constructor(
    private snapService: SnapService,
  ) { }

  public setCoordsOffset(classVisualization: ClassVisualizationCoords, offset: Coords) {
    const originalCoords = classVisualization.getOriginalCoords();
    const desiredCoords = {
      x: originalCoords.x + offset.x,
      y: originalCoords.y + offset.y,
    };


    const snappingObjects = classesVisualization.filter(classVis => classVis.id !== classVisualization.id);
    const snapCoords = this.snapService.calculateSnapCoords(classVisualization, snappingObjects, desiredCoords);
    classVisualization.setCoords(snapCoords);
  }
}
