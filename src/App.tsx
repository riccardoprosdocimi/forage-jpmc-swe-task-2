import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, // add a new state variable to indicate whether the graph should be shown
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false, // graph is hidden until user clicks 'Start Streaming Data' button
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>) // only render graph if showGraph is true
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0; // add a counter to keep track of how many times getDataFromServer() is called
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds, // update data state with new data from server
          showGraph: true, // show graph once data is received
        });
      });
      x++; // increment counter
      if (x > 1000) {
        clearInterval(interval); // stop requesting data once counter reaches 1000
      }
    }, 100); // request data every 100ms
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
