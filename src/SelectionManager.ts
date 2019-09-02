import { observable, action, computed } from "mobx";

export class SelectionManager {
  @observable
  public selection: string[] = [];

  @action
  toggleSelection(key: string) {
    const presentInSelection = this.isSelected(key);
    console.log(presentInSelection);
    if (presentInSelection) {
      this.removeFromSelection(key);
      return;
    }
    this.addToSelection(key);
  }

  @action
  removeFromSelection(key: string) {
    (this.selection as any).remove(key);
  }

  @action
  addToSelection(key: string) {
    this.selection.push(key);
  }

  public isSelected(key: string) {
    return this.selection.find(element => element === key);
  }
}

export const selectionManager = new SelectionManager();
