import { ClassVisualizationCoords } from "./class-visualization-coords";
import { observable } from "mobx";

type ObjectType = 'class' | 'abstract-class' | 'interface';

export class ClassVisualization {

  @observable
  public type: ObjectType;
  
  @observable
  public name: string;

  @observable
  public extension?: string;

  @observable
  public implementation?: string;

  @observable
  coords: ClassVisualizationCoords;
}