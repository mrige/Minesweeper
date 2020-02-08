import React, { Component } from "react";
import GameGrid from "./GameGrid";

export class Game extends Component {
  state = {
    size: 0,
    board: [],
    play: false
  };

  onChange = e => this.setState({ [e.target.name]: parseInt(e.target.value) });

  onSubmit = e => {
    e.preventDefault();
    const {size } = this.state;
    const temp = Array(size)
      .fill("")
      .map(row => new Array(size).fill(""));
    this.setState({ board: temp, play: true });
  };

  render() {
    const { size, board, play } = this.state;
    return (
      <div container>
        {!play ? (
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="number"
                name="size"
                onChange={this.onChange}
                value={size}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <GameGrid size={size} board={board} />
        )}
      </div>
    );
  }
}

export default Game;
