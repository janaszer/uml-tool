import React from "react";
import { ClassVisualizationCoords } from "./class-visualization-coords";
import { observer } from "mobx-react";

interface IProps {
  classVisualization: ClassVisualizationCoords[];
}

@observer
export class GuideVisualization extends React.Component<IProps> {

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
    return this.props.classVisualization.map(classVisualization => {
      const middleX = classVisualization.coords.x + Math.round(classVisualization.width / 2);
      const middleY = classVisualization.coords.y + Math.round(classVisualization.height / 2);
      const endX = classVisualization.coords.x + Math.round(classVisualization.width);
      const endY = classVisualization.coords.y + Math.round(classVisualization.height);

      return <>
        {classVisualization.verticalGuides.start && this.drawVerticalGuide(classVisualization.coords.x)}
        {classVisualization.verticalGuides.middle && this.drawVerticalGuide(middleX)}
        {classVisualization.verticalGuides.end && this.drawVerticalGuide(endX)}
        {classVisualization.horizontalGuides.start && this.drawHorizontalGuide(classVisualization.coords.y)}
        {classVisualization.horizontalGuides.middle && this.drawHorizontalGuide(middleY)}
        {classVisualization.horizontalGuides.end && this.drawHorizontalGuide(endY)}
      </>
    });
  }
}