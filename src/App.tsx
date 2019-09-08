import React from 'react';
import { observer } from 'mobx-react';
import './App.css';
import { ClassVisualization } from './components/class-visualization/class-visualization';
import { MouseService } from './services/mouse/mouse.service';
import { DragDropService } from './services/dragndrop/drag-drop.service';
import { dragDropFsm } from './services/dragndrop/fsm/drag-drop.fsm';
import { classesVisualization } from './classes';
import { selectionService } from './services/selection/selection.service';

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

  private renderClasses() {
    return classesVisualization.map(
      classCoords => {
        const isSelected = selectionService.isSelected(classCoords.id);

        return <ClassVisualization classCords={classCoords} isSelected={isSelected} />;
      }
    )
  }

  public render() {
    return (
      <div className="App">
        <div style={{ position: 'fixed', top: 0, right: 0 }}>{dragDropFsm.currentState.name}</div>
        <svg width="1000" height="500" viewBox="0 0 1000 500"
          style={{ border: 'solid 1px black', }}
          ref={this.svgRef}
        >
          {this.renderClasses()}
        </svg>
      </div>
    );
  }
}

export default App;
