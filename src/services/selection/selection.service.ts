import { Class } from "../../model/class";
import { observable, action, IObservableArray } from "mobx";

export class SelectionService {

  @observable
  public selectedClasses: IObservableArray<string> = [] as unknown as IObservableArray<string>;

  @action
  public addToSelection(item: string) {
    this.selectedClasses.push(item);
  }

  @action
  toggleSelection(item: string) {
    if (this.isSelected(item)) {
      this.removeFromSelection(item);
      return;
    }
    this.addToSelection(item);
  }

  @action
  public removeFromSelection(item: string) {
    this.selectedClasses.remove(item);
  }

  @action
  public clearSelection() {
    this.selectedClasses.clear();
  }

  public getSelectedItems(): string[] {
    return this.selectedClasses;
  }
  public isSelected(item: string): boolean {
    return this.selectedClasses.some(cl => cl === item);
  }
}

export const selectionService = new SelectionService();
(window as any).selectionService = selectionService;
