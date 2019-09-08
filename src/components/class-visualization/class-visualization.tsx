import React from 'react';
import { classACoords } from './ClassACoords';
import { observer } from 'mobx-react';

@observer
export class ClassVisualization extends React.Component<{}> {
  public render() {
    if (!classACoords.coords) {
      return null;
    }
    const strokeStyle = false ? {
      stroke: 'yellow',
      strokeWidth: 2
    } : {};

    return <rect
      x={classACoords.coords.x}
      y={classACoords.coords.y}
      style={strokeStyle}
      onClick={(event) => console.log('selection toggle')}
      width="100"
      height="100"
    />
  }
}
