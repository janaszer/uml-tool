import { Class } from "../../model/class";

export class SelectionService {
  private selectedClasses: Class[] = [];

  public addToSelection(item: Class) {}
  public removeFromSelection(item: Class) {}
  public clearSelection() {}
  public getSelectedItems(): Class[] {
    return this.selectedClasses;
  }
}
