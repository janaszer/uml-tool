import React from 'react';
import { observer } from 'mobx-react';
import './App.css';
import { dragState } from './DragState';
import { ClassA } from './components/ClassA/ClassA';
import { ClassB } from './components/ClassB/ClassB';
import { dragManager } from './DragManager';

type IProps = {};

interface IState {
  x: number;
  y: number;
}

@observer
export class App extends React.Component<IProps, IState> {
  public render() {
    return (
      <div className="App">
        <svg width="1000" height="500" viewBox="0 0 1000 500"
          onMouseMove={(event) => dragManager.onMouseDrag(event)}
          onMouseDown={(event) => dragManager.dragStart(event)}
          onMouseUp={(event) => dragManager.dragEnd(event)}
        >
          <ClassA />
          <ClassB />
        </svg>
      </div>
    );
  }
}

export default App;
