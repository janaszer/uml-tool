import { Coords } from "../dragndrop/drag-drop.service";

export class MouseEventService {

  // should be changed to class instead of svg element
  private originalTarget?: SVGElement;

  public setOriginalTarget(target: SVGElement) {
    this.originalTarget = target;
  }

  public getOriginalTarget() {
    return this.originalTarget;
  }

  public clearOriginalTarget() {
    this.originalTarget = undefined;
  }

  public getCoords(event: MouseEvent): Coords | undefined {
    const target = event.target as SVGGraphicsElement;
    const CTM = target.getScreenCTM();
    if (!CTM) {
      return;
    }

    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d,
    };
  }
}

export const mouseEventService = new MouseEventService();
