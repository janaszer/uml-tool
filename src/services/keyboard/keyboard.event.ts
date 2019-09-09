import { observable } from "mobx";

export class KeyboardEventService {

  @observable
  public ctrlPressed: boolean = false;
  
  @observable
  public optionPressed: boolean = false;

  @observable
  public commandPressed: boolean = false;
}

export const keyboardEventService = new KeyboardEventService();
