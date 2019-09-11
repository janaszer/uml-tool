import { ClassVisualizationCoords } from "./class-visualization-coords";
import { observable } from "mobx";

export class ClassVisualization {
  
  @observable
  public name: string;

  @observable
  public extension?: string;

  @observable
  public implementation?: string;

  @observable
  coords: ClassVisualizationCoords;
}