import { Coords } from "../../DragState";

export class MouseEventService {
  constructor(
    private event: MouseEvent
  ) { }

  public getCoords(): Coords | undefined {
    const target = this.event.target as SVGGraphicsElement;
    const CTM = target.getScreenCTM();
    if (!CTM) {
      return;
    }

    return {
      x: (this.event.clientX - CTM.e) / CTM.a,
      y: (this.event.clientY - CTM.f) / CTM.d,
    };
  }
}