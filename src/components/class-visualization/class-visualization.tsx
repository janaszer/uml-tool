import React from 'react';
import { ClassVisualizationCoords } from './class-visualization-coords';
import { observer } from 'mobx-react';
import { mouseEventService } from '../../services/mouse/mouse.event';

interface IProps {
  classVisualization: ClassVisualizationCoords;
  isSelected: boolean;
}

@observer
export class ClassVisualizationComponent extends React.Component<IProps> {
  public render() {
    if (!this.props.classVisualization.coords) {
      return null;
    }
    const strokeStyle = this.props.isSelected ? {
      stroke: 'red',
      strokeWidth: 2
    } : {};

    return <g>
      <rect
        x={this.props.classVisualization.coords.x}
        y={this.props.classVisualization.coords.y}
        style={strokeStyle}
        onMouseDown={(event) => {
          mouseEventService.setOriginalTarget(this.props.classVisualization);
        }}
        width={this.props.classVisualization.width}
        height={this.props.classVisualization.height}
      />
    </g>;
  }
}
