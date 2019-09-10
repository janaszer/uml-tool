import { Coords } from "./drag-drop.service";
import { ClassVisualizationCoords } from "../../components/class-visualization/class-visualization-coords";

type SnappingObject = {
  obj: ClassVisualizationCoords,
  coord: number,
};

export class SnapService {
  public calculateSnapCoords(target: ClassVisualizationCoords, snappingObjects: ClassVisualizationCoords[], desiredCoords: Coords): Coords {
    if (snappingObjects.length === 0) {
      return desiredCoords;
    }

    const horizontalTargetStart = desiredCoords.y;
    const horizontalTargetMiddle = desiredCoords.y + Math.round(target.height / 2);
    const horizontalTargetEnd = desiredCoords.y + target.height;

    const snappingObjectsMiddle = snappingObjects.map(obj => ({
      obj,
      coord: obj.coords.y + Math.round(obj.height / 2),
    }))

    const horizontalSnapStart = this.calculateSnaps(horizontalTargetMiddle, snappingObjectsMiddle)
      .map(snap => ({
        obj: snap.obj,
        coord: snap.coord - Math.round(target.height / 2),
      }));

    this.clearAllGuides(snappingObjects);
    if (horizontalSnapStart.length === 0) {
      return desiredCoords;
    }

    const snapObject = horizontalSnapStart[0];
    snapObject.obj.horizontalGuides.middle = true;

    return {
      x: desiredCoords.x,
      y: snapObject.coord,
    };
  }

  public clearAllGuides(snappingObjects: ClassVisualizationCoords[]) {
    snappingObjects.forEach(snapObject => snapObject.clearGuides());
  }

  private calculateSnaps(coord: number, snappingObjects: SnappingObject[]) {    
    return snappingObjects
      .filter(snapObject => this.isAroundRadius(snapObject.coord, coord, 20));
  }

  private isAroundRadius(position: number, target: number, radius: number) {
    return position > (target - radius) &&
      position < (target + radius);
  }
}
