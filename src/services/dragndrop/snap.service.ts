import { Coords } from "./drag-drop.service";
import { ClassVisualizationCoords } from "../../components/class-visualization/class-visualization-coords";

type SnappingObject = {
  obj: ClassVisualizationCoords,
  coord: number,
};

type SnapObjectResult = SnappingObject & {
  distance: number,
};

type SnapType = {
  snapType: 'start' | 'middle' | 'end',
};

type SnapObjectWithType = SnapObjectResult & SnapType;

export class SnapService {
  public calculateSnapCoords(target: ClassVisualizationCoords, snappingObjects: ClassVisualizationCoords[], desiredCoords: Coords): Coords {
    if (snappingObjects.length === 0) {
      return desiredCoords;
    }

    const horizontalTargetMiddle = desiredCoords.y + Math.round(target.height / 2);
    
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
    
    const verticalTargetMiddle = desiredCoords.x + Math.round(target.width / 2);

    const snappingObjectVerticalStart = snappingObjects.map(this.mapToVerticalObjectStart);
    const snappingObjectVerticalMiddle = snappingObjects.map(this.mapToVerticalObjectMiddle);
    const snappingObjectVerticalEnd = snappingObjects.map(this.mapToVerticalObjectEnd);

    const verticalSnapStart = this.calculateSnaps(verticalTargetMiddle, snappingObjectVerticalStart)
      .map(this.mapFromVerticalTargetStart(target));
    const verticalSnapMiddle = this.calculateSnaps(verticalTargetMiddle, snappingObjectVerticalMiddle)
      .map(this.mapFromVerticalTargetMiddle(target));
    const verticalSnapEnd = this.calculateSnaps(verticalTargetMiddle, snappingObjectVerticalEnd)
      .map(this.mapFromVerticalTargetEnd(target));

    const allVerticalSnaps = [
      ...verticalSnapStart,
      ...verticalSnapMiddle,
      ...verticalSnapEnd,
    ];
    allVerticalSnaps.sort((a, b) => a.distance - b.distance);

    this.clearAllGuides(snappingObjects);

    const horizontalSnapObject = allHorizontalSnaps[0] as SnapObjectWithType | undefined;
    const verticalSnapObject = allVerticalSnaps[0] as SnapObjectWithType | undefined;
    horizontalSnapObject && this.triggerHorizontalGuide(horizontalSnapObject);
    verticalSnapObject && this.triggerVerticalGuide(verticalSnapObject);

    return {
      x: verticalSnapObject ? verticalSnapObject.coord : desiredCoords.x,
      y: horizontalSnapObject ? horizontalSnapObject.coord : desiredCoords.y,
    };
  }

  public clearAllGuides(snappingObjects: ClassVisualizationCoords[]) {
    snappingObjects.forEach(snapObject => snapObject.clearGuides());
  }

  private toSnapCoords(obj: ClassVisualizationCoords) {

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

  private mapToVerticalObjectStart(obj: ClassVisualizationCoords) {
    return {
      obj,
      coord: obj.coords.x,
    };
  }

  private mapToVerticalObjectMiddle(obj: ClassVisualizationCoords) {
    return {
      obj,
      coord: obj.coords.x + Math.round(obj.width / 2),
    };
  }

  private mapToVerticalObjectEnd(obj: ClassVisualizationCoords) {
    return {
      obj,
      coord: obj.coords.x + obj.width,
    };
  }

  private mapFromTargetStart(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult): SnapObjectWithType => ({
      ...snap,
      coord: snap.coord - Math.round(target.height / 2),
      snapType: 'start',
    });
  }

  private mapFromTargetMiddle(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult): SnapObjectWithType => ({
      ...snap,
      coord: snap.coord - Math.round(target.height / 2),
      snapType: 'middle',
    });
  }

  private mapFromTargetEnd(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult): SnapObjectWithType => ({
      ...snap,
      coord: snap.coord - Math.round(target.height / 2),
      snapType: 'end',
    });
  }

  private mapFromVerticalTargetStart(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult): SnapObjectWithType => ({
      ...snap,
      coord: snap.coord - Math.round(target.width / 2),
      snapType: 'start',
    });
  }

  private mapFromVerticalTargetMiddle(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult): SnapObjectWithType => ({
      ...snap,
      coord: snap.coord - Math.round(target.width / 2),
      snapType: 'middle',
    });
  }

  private mapFromVerticalTargetEnd(target: ClassVisualizationCoords) {
    return (snap: SnapObjectResult): SnapObjectWithType => ({
      ...snap,
      coord: snap.coord - Math.round(target.width / 2),
      snapType: 'end',
    });
  }

  private triggerHorizontalGuide(snapObject: SnapObjectWithType) {
    switch (snapObject.snapType) {
      case 'start':
        snapObject.obj.horizontalGuides.start = true;
        return;
      case 'middle':
        snapObject.obj.horizontalGuides.middle = true;
        return;
      case 'end':
        snapObject.obj.horizontalGuides.end = true;
        return;
    }
  }

  private triggerVerticalGuide(snapObject: SnapObjectWithType) {
    switch (snapObject.snapType) {
      case 'start':
        snapObject.obj.verticalGuides.start = true;
        return;
      case 'middle':
        snapObject.obj.verticalGuides.middle = true;
        return;
      case 'end':
        snapObject.obj.verticalGuides.end = true;
        return;
    }
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
