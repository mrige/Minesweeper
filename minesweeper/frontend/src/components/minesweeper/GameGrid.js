import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GameCell from "./GameCell";

export class GameGrid extends Component {
  state = {
    disable: false
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ disable: true });
  };
  render() {
    return (
      <div container>
        {this.props.board.map((n, index) => {
          return (
            <Grid container direction="row" justify="center" key={index}>
              {n.map((n, index) => {
                return (
                  <GameCell
                    value={n}
                    key={index}
                    disable={this.state.disable}
                    handleClick={this.handleClick}
                  />
                );
              })}
            </Grid>
          );
        })}
      </div>
    );
  }
}

export default GameGrid;
