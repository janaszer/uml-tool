import { DragDropService } from "../dragndrop/drag-drop.service";

export class MouseService {
  constructor(
    private dragDropService: DragDropService,
  ) { }

  public attachEvents(element: SVGGraphicsElement) {
    element.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseMove(event);
    });
    element.addEventListener('mouseup', (event: MouseEvent) => {
      this.mouseUp(event);
    });
    element.addEventListener('mousedown', (event: MouseEvent) => {
      this.mouseDown(event);
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
