import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import GameGrid from "./minesweeper/GameGrid";
import { Game } from "./minesweeper/Game";

class App extends Component {
  render() {
    return (
      <>
        <Game />
      </>
    );
  }
}
export default App;
