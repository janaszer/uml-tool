import { DragDropState } from './drag-drop.state';
import { DragDropService, Coords } from '../drag-drop.service';
import { Idle } from './states/idle';
import { observable } from 'mobx';

export class DragDropFsm {

  @observable
  public currentState: DragDropState;

  constructor(initialState: DragDropState) {
    this.currentState = initialState;
  }

  public onMouseDown(dragDropService: DragDropService) {
    const nextState = this.currentState.onMouseDown &&
      this.currentState.onMouseDown(dragDropService);
    if (nextState) {
      this.setNextState(
        nextState,
        dragDropService,
      );
    }
  }
  public onMouseUp(dragDropService: DragDropService) {
    const nextState = this.currentState.onMouseUp &&
      this.currentState.onMouseUp(dragDropService);
    if (nextState) {
      this.setNextState(
        nextState,
        dragDropService,
      );
    }
  }
  public onMouseMove(dragDropService: DragDropService) {
    const nextState = this.currentState.onMouseMove &&
      this.currentState.onMouseMove(dragDropService);
    if (nextState) {
      this.setNextState(
        nextState,
        dragDropService,
      );
    }
  }

  private setNextState(state: DragDropState, dragDropService: DragDropService) {
    if (state === this.currentState) {
      return;
    }
    this.currentState = state;
    const nextState = state.onInit && state.onInit(dragDropService);
    if (nextState) {
      this.currentState = nextState;
      return;
    }
  }
}

export const dragDropFsm = new DragDropFsm(new Idle());
(window as any).dragDropFsm = dragDropFsm;
