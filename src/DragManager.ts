import { dragState } from "./DragState";
import { classBCoords } from "./components/ClassB/ClassBCoords";
import { classACoords } from "./components/ClassA/ClassACoords";

export class DragManager {

  public onMouseDrag(event: React.MouseEvent) {
    if (!dragState.isDragging) {
      return;
    }
    const xyCoords = this.getXYFromEvent(event);
    if (!xyCoords) {
      return;
    }

    dragState.originalCoords = xyCoords;
    classACoords.setCoords(xyCoords.x, xyCoords.y);
    classBCoords.coords = xyCoords;
  }

  public dragStart(event: React.MouseEvent) {
    const xyCoords = this.getXYFromEvent(event);
    dragState.originalCoords = xyCoords;
    dragState.isDragging = true;
  }

  public dragEnd(event: React.MouseEvent) {
    dragState.isDragging = false;
  }

  private getXYFromEvent(event: React.MouseEvent) {
    const elem: SVGGraphicsElement = event.target as SVGGraphicsElement;
    const CTM = elem.getScreenCTM();
    if (!CTM) {
      return;
    }

    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d,
    };
  }
}

export const dragManager = new DragManager();
