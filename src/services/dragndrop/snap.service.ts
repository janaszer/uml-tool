import { Coords } from "./drag-drop.service";
import { ClassVisualizationCoords } from "../../components/class-visualization/class-visualization-coords";

type SnappingObject = {
  obj: ClassVisualizationCoords,
  coord: number,
};

type SnapObjectResult = SnappingObject & {
  distance: number,
};

export class SnapService {
  public calculateSnapCoords(target: ClassVisualizationCoords, snappingObjects: ClassVisualizationCoords[], desiredCoords: Coords): Coords {
    if (snappingObjects.length === 0) {
      return desiredCoords;
    }

    const horizontalTargetStart = desiredCoords.y;
    const horizontalTargetMiddle = desiredCoords.y + Math.round(target.height / 2);
    const horizontalTargetEnd = desiredCoords.y + target.height;

    const snappingObjectsStart = snappingObjects.map(this.mapToHorizontalObjectStart);
    const snappingObjectsMiddle = snappingObjects.map(this.mapToHorizontalObjectMiddle);
    const snappingObjectsEnd = snappingObjects.map(this.mapToHorizontalObjectEnd);

    const horizontalSnapStart = this.calculateSnaps(horizontalTargetMiddle, snappingObjectsStart)
      .map(this.mapFromTargetStart(target));
    const horizontalSnapMiddle = this.calculateSnaps(horizontalTargetMiddle, snappingObjectsMiddle)
      .map(this.mapFromTargetMiddle(target));
    const horizontalSnapEnd = this.calculateSnaps(horizontalTargetMiddle, snappingObjectsEnd)
      .map(this.mapFromTargetEnd(target));

    const allHorizontalSnaps = [
      ...horizontalSnapStart,
      ...horizontalSnapMiddle,
      ...horizontalSnapEnd,
    ];

    allHorizontalSnaps.sort((a, b) => a.distance - b.distance);

    this.clearAllGuides(snappingObjects);
    if (allHorizontalSnaps.length === 0) {
      return desiredCoords;
    }

    const snapObject = allHorizontalSnaps[0];
    switch (snapObject.snapType) {
      case 'start':
        snapObject.obj.horizontalGuides.start = true;
        break;
      case 'middle':
        snapObject.obj.horizontalGuides.middle = true;
        break;
      case 'end':
        snapObject.obj.horizontalGuides.end = true;
        break;
    }

    return {
      x: desiredCoords.x,
      y: snapObject.coord,
    };
  }

  public clearAllGuides(snappingObjects: ClassVisualizationCoords[]) {
    snappingObjects.forEach(snapObject => snapObject.clearGuides());
  }

  private mapToHorizontalObjectStart(obj: ClassVisualizationCoords) {
    return {
      obj,
      coord: obj.coords.y,
    };
  }

  private mapToHorizontalObjectMiddle(obj: ClassVisualizationCoords) {
    return {
      obj,
      coord: obj.coords.y + Math.round(obj.height / 2),
    };
  }

  private mapToHorizontalObjectEnd(obj: ClassVisualizationCoords) {
    return {
      obj,
      coord: obj.coords.y + obj.height,
    };
  }

  private mapFromTargetStart(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult) => ({
      ...snap,
      coord: snap.coord - Math.round(target.height / 2),
      snapType: 'start',
    });
  }

  private mapFromTargetMiddle(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult) => ({
      ...snap,
      coord: snap.coord - Math.round(target.height / 2),
      snapType: 'middle',
    });
  }

  private mapFromTargetEnd(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult) => ({
      ...snap,
      coord: snap.coord - Math.round(target.height / 2),
      snapType: 'end',
    });
  }

  private calculateSnaps(coord: number, snappingObjects: SnappingObject[]): SnapObjectResult[] {    
    return snappingObjects
      .filter(snapObject => this.isAroundRadius(snapObject.coord, coord, 20))
      .map(snapObject => ({
        ...snapObject,
        distance: Math.abs(snapObject.coord - coord),
      }));
  }

  private isAroundRadius(position: number, target: number, radius: number) {
    return position > (target - radius) &&
      position < (target + radius);
  }
}
