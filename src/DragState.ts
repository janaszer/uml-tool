import { observable } from 'mobx';

export type Coords = {
  x: number,
  y: number,
}

export class DragState {

  @observable
  public isDragging: boolean = false;

  @observable
  public originalCoords: Coords | undefined;
}

export const dragState = new DragState();
