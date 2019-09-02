import React from 'react';
import { classBCoords } from "./ClassBCoords";
import { observer } from 'mobx-react';

@observer
export class ClassB extends React.Component {
  public render() {
    if (!classBCoords.coords) {
      return null;
    }

    return <rect
      x={classBCoords.coords.x + 200}
      y={classBCoords.coords.y + 200}
      width="100"
      height="100"
    />
  }
}