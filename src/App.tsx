import React from 'react';
import './App.css';

interface IState {
  isDragging: boolean;
  x: number;
  y: number;
}

export class App extends React.Component<{}, IState> {

  private svgRef: HTMLElement | null = null;

  constructor() {
    super({});
    this.state = {
      isDragging: false,
      x: 0,
      y: 0,
    };
  }

  private onMouseDrag(event: React.MouseEvent) {
    if (!this.state.isDragging) {
      return;
    }

    const elem: SVGGraphicsElement = event.target as SVGGraphicsElement;
    const CTM = elem.getScreenCTM();
    if (!CTM) {
      return;
    }

    this.setState({
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d,
    });
  }

  private dragStart() {
    this.setState({
      isDragging: true,
    });
  }

  private dragEnd() {
    this.setState({
      isDragging: false,      
    });
  }

  public render() {
    return (
      <div className="App">
        <svg width="1000" height="500" viewBox="0 0 1000 500"
          onMouseMove={(event: React.MouseEvent) => this.onMouseDrag(event)}
          onMouseDown={() => this.dragStart()}
          onMouseUp={() => this.dragEnd()}
        >
          <rect
            x={this.state.x}
            y={this.state.y}
            width="200"
            height="300"
          />
        </svg>
      </div>
    );
  }
}

export default App;
