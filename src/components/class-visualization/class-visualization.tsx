import React from 'react';
import { classCords } from './class-visualization-coords';
import { observer } from 'mobx-react';

@observer
export class ClassVisualization extends React.Component<{}> {
  public render() {
    if (!classCords.coords) {
      return null;
    }
    const strokeStyle = false ? {
      stroke: 'yellow',
      strokeWidth: 2
    } : {};

    return <rect
      x={classCords.coords.x}
      y={classCords.coords.y}
      style={strokeStyle}
      onClick={(event) => {}}
      width="100"
      height="100"
    />
  }
}
