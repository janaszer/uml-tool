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
      strokeWidth: 2,
    } : {
      stroke: 'black',
      strokeWidth: 1,
    };

    const halfWidth = Math.round(this.props.classVisualization.width / 2);

    return <g>
      <rect
        x={this.props.classVisualization.coords.x}
        y={this.props.classVisualization.coords.y}
        style={strokeStyle}
        fill="#23c1e8" // "#fbe703"
        onMouseDown={(event) => {
          mouseEventService.setOriginalTarget(this.props.classVisualization);
        }}
        width={this.props.classVisualization.width}
        height={this.props.classVisualization.height}
      >
      </rect>
      <text
        x={this.props.classVisualization.coords.x + halfWidth}
        y={this.props.classVisualization.coords.y + 10}
        width={this.props.classVisualization.width}
        height={this.props.classVisualization.height}
        style={{ font: 'bold 10px sans-serif', }}
        textAnchor="middle"
      >
        DragMove
      </text>
      <line
        stroke="black"
        strokeWidth="1"
        x1={this.props.classVisualization.coords.x}
        y1={this.props.classVisualization.coords.y + 15}
        x2={this.props.classVisualization.coords.x + this.props.classVisualization.width}
        y2={this.props.classVisualization.coords.y + 15}
      />
    </g>;
  }
}
