import { DragDropService } from "../dragndrop/drag-drop.service";
import { MouseEventService } from "./mouse.event";

export class MouseService {
  constructor(
    private dragDropService: DragDropService,
  ) { }

  public attachEvents(element: SVGGraphicsElement) {
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;
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
      const eventService = new MouseEventService(event);
      const coords = eventService.getCoords();
      if (coords) {
        if (coords.x < 0 || coords.x > elementWidth || coords.y < 0 || coords.y > elementHeight) {
          this.mouseUp(event);
        }
      }
    });
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
