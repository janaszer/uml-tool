import React from 'react';
import { classACoords } from './ClassACoords';
import { observer } from 'mobx-react';
import { selectionManager } from '../../SelectionManager';

@observer
export class ClassA extends React.Component<{}> {
  public render() {
    if (!classACoords.coords) {
      return null;
    }
    const selected = selectionManager.isSelected('a');
    const strokeStyle = selected ? {
      stroke: 'yellow',
      strokeWidth: 2
     } : {};

    return <rect
      x={classACoords.coords.x}
      y={classACoords.coords.y}
      style={strokeStyle}
      onClick={(event) => selectionManager.toggleSelection('a')}
      width="100"
      height="100"
    />
  }
}
