import { DragDropState } from '../drag-drop.state';
import { Idle } from './idle';
import { mouseEventService } from '../../../mouse/mouse.event';
import { selectionService } from '../../../selection/selection.service';
import { keyboardEventService } from '../../../keyboard/keyboard.event';

export class SelectionToggle extends DragDropState {

  public name: string = 'selection-toggle';
  public onInit() {
    const originalTarget = mouseEventService.getOriginalTarget();
    if (!keyboardEventService.commandPressed) {
      selectionService.clearSelection();
    }
    if (originalTarget) {
      selectionService.toggleSelection(originalTarget.id);
      mouseEventService.clearOriginalTarget();
      return new Idle();
    }

    selectionService.clearSelection();
    return new Idle();
  }
}
