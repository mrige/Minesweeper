import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GameCell from "./GameCell";
import axios from "axios";

const styles = {
  container: {
    backgroundColor: "#171f2f",
    paddingTop: "40vh",
    height: "100vh"
  }
};

export class GameGrid extends Component {
  state = {
    board: [],
    clicked_pos: [],
    game_id: ""
  };

  generate_board = size => {
    let game_board = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        game_board = Array(size)
          .fill("")
          .map(row => new Array(size).fill(""));
      }
    }
    console.log(game_board + "gh");

    return game_board;
  };

  handleClick = (x, y) => {
    console.log({ x: x, y: y });
    const id = this.props.game_id
      ? this.state.game_id
      : this.props.match.params.id;
    axios
      .post("api/board/mark_board/", {
        game_id: id,
        x_coord: x,
        y_coord: y,
        disabled: true
      })
      .then(res => {
        console.log(res);
        let temp = this.state.board;
        temp[res.data.x_coord][res.data.y_coord] = res.data.mine_count;
        this.setState({
          board: [...temp]
        });
      });

    console.log(this.props);
    console.log(this.state);
  };

  componentDidMount() {
    console.log(this.props);

    const id = this.props.game_id
      ? this.props.game_id
      : this.props.match.params.id;
    axios.get("/api/game/" + id + "/").then(res => {
      console.log({ res: res });

      const board = this.generate_board(res.data["board_size"]);
      this.setState({ board: board, game_id: this.props.game_id });
    });
  }

  render() {
    return (
      <div style={styles.container}>
        {this.state.board.map((n, row) => {
          return (
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
              key={row}
            >
              {n.map((n, col) => {
                return (
                  <GameCell
                    value={n}
                    key={col}
                    disable={this.state.disable}
                    handleClick={e => this.handleClick(row, col)}
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
