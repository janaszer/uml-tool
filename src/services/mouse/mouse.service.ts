import { DragDropService, Coords } from "../dragndrop/drag-drop.service";
import { MouseEventService, mouseEventService } from "./mouse.event";

export class MouseService {
  constructor(
    private dragDropService: DragDropService,
  ) { }

  public attachEvents(element: SVGGraphicsElement) {
    const elementDimension = {
      x: element.clientWidth,
      y: element.clientHeight,
    };
    element.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseMove(event);
    });
    element.addEventListener('mouseup', (event: MouseEvent) => {
      this.mouseUp(event);
    });
    element.addEventListener('mousedown', (event: MouseEvent) => {
      this.mouseDown(event);
    });
    element.addEventListener('mouseout', (event) => {
      const coords = mouseEventService.getCoords(event);
      if (coords) {
        if (this.isCoordOutsideElement(coords, elementDimension)) {
          this.mouseUp(event);
        }
      }
    });
  }

  private isCoordOutsideElement(coords: Coords, elementDimension: Coords) {
    return coords.x < 0 ||
      coords.x > elementDimension.x ||
      coords.y < 0 ||
      coords.y > elementDimension.y;
  }

  private mouseDown(event: MouseEvent) {
    this.dragDropService.onMouseDown(event);
  }
  private mouseUp(event: MouseEvent) {
    this.dragDropService.onMouseUp(event);
  }
  private mouseMove(event: MouseEvent) {
    this.dragDropService.onMouseMove(event);
  }
}
