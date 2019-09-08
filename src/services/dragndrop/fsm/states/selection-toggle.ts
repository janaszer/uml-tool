import { DragDropState } from '../drag-drop.state';
import { Idle } from './idle';

export class SelectionToggle extends DragDropState {

  public name: string = 'selection-toggle';
  public onInit() {
    // select object here
    return new Idle();
  }
}
