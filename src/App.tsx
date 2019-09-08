import React from 'react';
import { observer } from 'mobx-react';
import './App.css';
import { ClassA } from './components/ClassA/ClassA';
import { ClassB } from './components/ClassB/ClassB';
import { MouseService } from './services/mouse/mouse.service';
import { DragDropService } from './services/dragndrop/drag-drop.service';
import { dragDropFsm } from './services/dragndrop/fsm/drag-drop.fsm';

type IProps = {};

interface IState {
  svgRef: SVGSVGElement | null;
}

@observer
export class App extends React.Component<IProps, IState> {
  private svgRef: React.RefObject<SVGSVGElement>;

  constructor(props: IProps) {
    super(props);
    this.svgRef = React.createRef();
  }

  public componentDidMount() {
    const dragDropService = new DragDropService(dragDropFsm);
    const mouseService = new MouseService(dragDropService);
    if (this.svgRef && this.svgRef.current) {
      mouseService.attachEvents(this.svgRef.current);
    }
  }

  public render() {
    return (
      <div className="App">
        <div style={{ position: 'fixed', top: 0, right: 0 }}>{dragDropFsm.currentState.name}</div>
        <svg width="1000" height="500" viewBox="0 0 1000 500"
          ref={this.svgRef}
          /* onMouseMove={(event) => dragManager.onMouseDrag(event)}
          onMouseDown={(event) => dragManager.dragStart(event)}
          onMouseUp={(event) => dragManager.dragEnd(event)} */
        >
          <ClassA />
          <ClassB />
        </svg>
      </div>
    );
  }
}

export default App;
