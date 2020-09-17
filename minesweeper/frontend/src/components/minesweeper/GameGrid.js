import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GameCell from "./GameCell";
import axios from "axios";
import { Modal, Button } from "@material-ui/core";

const styles = {
  container: {
    backgroundColor: "#171f2f",
    paddingTop: "40vh",
    height: "200vh",
  },
  modal: {
    display: "flex",
    padding: "40vh",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: "4",
    padding: 60,
    textAlign: "center",
  },
};

export class GameGrid extends Component {
  state = {
    board: [],
    played_cells: [],
    game_over: false,
    game_id: "",
  };

  generate_board = (size, value) => {
    let game_board = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        game_board = Array(size)
          .fill("")
          .map((row) => new Array(size).fill(value));
      }
    }

    return game_board;
  };

  handleClick = (x, y, e) => {
    e.preventDefault();
    const id = this.props.game_id
      ? this.state.game_id
      : this.props.match.params.id;

    let params = {};
    if (e.type === "click") {
      params = {
        game_id: id,
        x_coord: x,
        y_coord: y,
        is_flagged: false,
        checked: true,
      };
    }
    if (e.type === "contextmenu") {
      params = {
        game_id: id,
        x_coord: x,
        y_coord: y,
        is_flagged: true,
        checked: false,
      };
    }

    axios
      .post("api/board/mark_board/", params)
      .then((res) => {
        if (res.data === "game over") {
          this.setState({
            game_over: true,
          });
        } else {
          let temp = this.state.board;
          let temp_cells = this.state.played_cells;
          temp_cells[res.data.x_coord][res.data.y_coord] = res.data.checked;
          temp[res.data.x_coord][res.data.y_coord] = res.data.is_flagged
            ? "f"
            : res.data.mine_count === 0
              ? ""
              : res.data.mine_count;
          this.setState({
            board: [...temp],
            played_cells: [...temp_cells],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // need to fix loading previous game values
    const id = this.props.game_id
      ? this.props.game_id
      : this.props.match.params.id;

    this.props.game_id
      ? axios
        .get("/api/game/" + id + "/")
        .then((res) => {
          const board = this.generate_board(res.data["board_size"], "");
          const played_cells = this.generate_board(
            res.data["board_size"],
            false
          );
          this.setState({
            board: board,
            game_id: this.props.game_id,
            played_cells: played_cells,
          });
        })
        .catch((err) => console.log(err))
      : axios
        .get("/api/game/" + id + "/")
        .then((res) => {
          const board = this.generate_board(res.data["board_size"], "");
          const played_cells = this.generate_board(
            res.data["board_size"],
            false
          );
          this.setState({
            board: board,
            game_id: this.props.game_id,
            played_cells: played_cells,
          });
        })
        .catch((err) => console.log(err));
  }

  render() {
    return (
      <div style={styles.container}>
        {" "}
        {!this.state.game_over ? (
          <>
            {" "}
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
                        disable={this.state.played_cells[row][col]}
                        handleClick={(e) => this.handleClick(row, col, e)}
                      />
                    );
                  })}{" "}
                </Grid>
              );
            })}{" "}
          </>
        ) : (
            <Modal
              style={styles.modal}
              disablePortal
              disableEnforceFocus
              disableAutoFocus
              open
            >
              <div style={styles.paper}>
                <h2> Game Over </h2> <p> Refresh Page to Play Again </p>{" "}
                <Button
                  color="secondary"
                  onClick={(e) => window.location.reload(false)}
                >
                  {" "}
                Restart{" "}
                </Button>{" "}
              </div>{" "}
            </Modal>
          )}{" "}
      </div>
    );
  }
}

export default GameGrid;
