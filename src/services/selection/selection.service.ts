import { Class } from "../../model/class";
import { observable, action, IObservableArray } from "mobx";

export class SelectionService {

  @observable
  public selectedClasses: IObservableArray<Class> = [] as unknown as IObservableArray<Class>;

  @action
  public addToSelection(item: Class) {
    this.selectedClasses.push(item);
  }
  public removeFromSelection(item: Class) {
    this.selectedClasses.remove(item);
  }
  public clearSelection() {
    this.selectedClasses.clear();
  }
  public getSelectedItems(): Class[] {
    return this.selectedClasses;
  }
  public isSelected(item: Class): boolean {
    return this.selectedClasses.some(cl => cl === item);
  }
}

export const selectionService = new SelectionService();
