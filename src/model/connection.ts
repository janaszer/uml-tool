import { Class } from './class';

export abstract class Connection {
  public abstract name: string;
  public from: Class;
  public to: Class;
}