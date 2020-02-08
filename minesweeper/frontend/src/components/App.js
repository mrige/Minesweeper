import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import GameGrid from "./minesweeper/GameGrid";
import { Game } from "./minesweeper/Game";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Fragment>
          <Game/>
        </Fragment>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
