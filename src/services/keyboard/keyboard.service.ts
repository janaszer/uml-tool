import { keyboardEventService } from "./keyboard.event";

export class KeyboardService {

  private CTRL_CODE = 17;
  private OPTION_CODE = 18;
  private COMMAND_CODE = 91;

  public attachEvents() {
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case this.CTRL_CODE:
          keyboardEventService.commandPressed = true;
          return;
        case this.OPTION_CODE:
          keyboardEventService.optionPressed = true;
          return;
        case this.COMMAND_CODE:
          keyboardEventService.commandPressed = true;
          return;
      };
    }, false);
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case this.CTRL_CODE:
          keyboardEventService.commandPressed = false;
          return;
        case this.OPTION_CODE:
          keyboardEventService.optionPressed = false;
          return;
        case this.COMMAND_CODE:
          keyboardEventService.commandPressed = false;
          return;
      };
    }, false);
  }
}