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
  private drawVerticalGuide(x: number) {
    return <line
      strokeDasharray="5, 10, 5"
      stroke="#29a6e1"
      strokeWidth="2"
      x1={x}
      x2={x}
      y1="0"
      y2="500"
    />;
  }

  private drawHorizontalGuide(y: number) {
    return <line
      strokeDasharray="5, 10, 5"
      stroke="#29a6e1"
      strokeWidth="2"
      x1="0"
      x2="1000"
      y1={y}
      y2={y}
    />;
  }

  public render() {
    if (!this.props.classVisualization.coords) {
      return null;
    }
    const strokeStyle = this.props.isSelected ? {
      stroke: 'red',
      strokeWidth: 2
    } : {};
    const middleX = this.props.classVisualization.coords.x + Math.round(this.props.classVisualization.width / 2);
    const middleY = this.props.classVisualization.coords.y + Math.round(this.props.classVisualization.height / 2);
    const endX = this.props.classVisualization.coords.x + Math.round(this.props.classVisualization.width);
    const endY = this.props.classVisualization.coords.y + Math.round(this.props.classVisualization.height);

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
      {this.props.classVisualization.verticalGuides.start && this.drawVerticalGuide(this.props.classVisualization.coords.x)}
      {this.props.classVisualization.verticalGuides.middle && this.drawVerticalGuide(middleX)}
      {this.props.classVisualization.verticalGuides.end && this.drawVerticalGuide(endX)}
      {this.props.classVisualization.horizontalGuides.start && this.drawHorizontalGuide(this.props.classVisualization.coords.y)}
      {this.props.classVisualization.horizontalGuides.middle && this.drawHorizontalGuide(middleY)}
      {this.props.classVisualization.horizontalGuides.end && this.drawHorizontalGuide(endY)}
    </g>;
  }
}
