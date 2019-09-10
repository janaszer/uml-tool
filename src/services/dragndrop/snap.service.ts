import { Coords } from "./drag-drop.service";
import { ClassVisualizationCoords } from "../../components/class-visualization/class-visualization-coords";

type SnapTypeHorizontal = {
  snapType: 'HORIZONTAL',
  y: number,
}
type SnapTypeVertical = {
  snapType: 'VERTICAL',
  x: number;
};
type SnapType = SnapTypeHorizontal | SnapTypeVertical;
type WithDistance<T extends object> = T & { distance: number };
type WithId<T extends object> = T & { id: string };

export class SnapService {
  public calculateSnapCoords(target: ClassVisualizationCoords, snappingObjects: ClassVisualizationCoords[], desiredCoords: Coords): Coords {
    if (snappingObjects.length === 0) {
      return desiredCoords;
    }

    const snapCoords = this.calculateMiddleVerticalSnap(target, snappingObjects, desiredCoords);
    if (!snapCoords) {
      return desiredCoords;
    }

    return {
      x: snapCoords.x,
      y: desiredCoords.y,
    };
  }

  private calculateMiddleVerticalSnap(target: ClassVisualizationCoords, snappingObjects: ClassVisualizationCoords[], desiredCoords: Coords): WithId<WithDistance<SnapTypeVertical>> | undefined {
    const targetMiddleVertical = Math.round(target.width / 2) + desiredCoords.x;
    
    const snappingObjectsMiddleVertical = snappingObjects.map(snapObject => ({ 
      coords: snapObject,
      x: Math.round(snapObject.width / 2) + snapObject.coords.x,
    }));
    
    const availableMiddleVerticalSnaps = snappingObjectsMiddleVertical.filter(snapObjectX => this.isAroundRadius(targetMiddleVertical, snapObjectX.x, 20));
    if (availableMiddleVerticalSnaps.length === 0) {
      return undefined;
    }
    return {
      id: availableMiddleVerticalSnaps[0].coords.id,
      snapType: 'VERTICAL',
      x: availableMiddleVerticalSnaps[0].x - Math.round(target.width / 2),
      distance: 0,
    };
  }
  
  private calculateMiddleHorizontalSnap(target: ClassVisualizationCoords, snappingObjects: ClassVisualizationCoords[], desiredCoords: Coords): WithId<WithDistance<SnapTypeHorizontal>> | undefined {
    const targetMiddleHorizontal = Math.round(target.height / 2) + desiredCoords.y;
    const snappingObjectsMiddleHorizontal = snappingObjects.map(snapObject => ({
      coords: snapObject,
      x: Math.round(snapObject.height / 2) + snapObject.coords.y,
    }));
    return undefined;
  }

  private isAroundRadius(position: number, target: number, radius: number) {
    return position > (target - radius) &&
      position < (target + radius);
  }
}
