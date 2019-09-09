import React from 'react';
import { ClassVisualizationCoords } from './class-visualization-coords';
import { observer } from 'mobx-react';
import { mouseEventService } from '../../services/mouse/mouse.event';

interface IProps {
  classCords: ClassVisualizationCoords;
  isSelected: boolean;
}

@observer
export class ClassVisualization extends React.Component<IProps> {
  public render() {
    if (!this.props.classCords.coords) {
      return null;
    }
    const strokeStyle = this.props.isSelected ? {
      stroke: 'red',
      strokeWidth: 2
    } : {};

    return <rect
      x={this.props.classCords.coords.x}
      y={this.props.classCords.coords.y}
      style={strokeStyle}
      onMouseDown={(event) => {
        mouseEventService.setOriginalTarget(this.props.classCords);
      }}
      width="100"
      height="100"
    />
  }
}
