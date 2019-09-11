import React from 'react';
import { observer } from 'mobx-react';
import './App.css';
import { ClassVisualizationComponent } from './components/class-visualization/class-visualization.component';
import { MouseService } from './services/mouse/mouse.service';
import { DragDropService } from './services/dragndrop/drag-drop.service';
import { dragDropFsm } from './services/dragndrop-fsm/drag-drop.fsm';
import { classesVisualization } from './classes';
import { selectionService } from './services/selection/selection.service';
import { KeyboardService } from './services/keyboard/keyboard.service';
import { RectangleSelection } from './components/rectangle-selection/rectangle-selection';
import { GuideVisualization } from './components/class-visualization/guide-visualization';

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
    const keyboardService = new KeyboardService();
    keyboardService.attachEvents();
    if (this.svgRef && this.svgRef.current) {
      mouseService.attachEvents(this.svgRef.current);
    }
  }

  private renderClasses() {
    return classesVisualization.map(
      classVisualization => {
        const isSelected = selectionService.isSelected(classVisualization.id);

        return <ClassVisualizationComponent classVisualization={classVisualization} isSelected={isSelected} />;
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
          <RectangleSelection />
          <GuideVisualization classVisualization={classesVisualization} />
        </svg>
      </div>
    );
  }
}

export default App;
