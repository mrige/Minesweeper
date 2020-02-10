import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GameCell from "./GameCell";
import axios from "axios";
import { Modal, Typography, Button } from "@material-ui/core";

const styles = {
  container: {
    backgroundColor: "#171f2f",
    paddingTop: "40vh",
    height: "200vh"
  },
  modal: {
    display: "flex",
    padding: "40vh",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 400,
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: "4",
    padding: 60,
    textAlign: "center"
  }
};

export class GameGrid extends Component {
  state = {
    board: [],
    game_over: false,
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

    return game_board;
  };

  handleClick = (x, y, e) => {
    e.preventDefault();
    console.log(e.type);
    params = {};
    if (e.type === "click") {
      params = {
        game_id: id,
        x_coord: x,
        y_coord: y,
        disabled: true
      };
    }
    if (e.type === "contextMenu") {
      params = {
        game_id: id,
        x_coord: x,
        y_coord: y,
        is_flagged: true,
        disabled: true
      };
    }
    const id = this.props.game_id
      ? this.state.game_id
      : this.props.match.params.id;

    axios.post("api/board/mark_board/", params).then(res => {
      if (res.data === "game over") {
        this.setState({
          game_over: true
        });
      } else {
        let temp = this.state.board;
        temp[res.data.x_coord][res.data.y_coord] = res.data.mine_count;
        this.setState({
          board: [...temp]
        });
      }
    });
  };

  componentDidMount() {
    const id = this.props.game_id
      ? this.props.game_id
      : this.props.match.params.id;

    this.props.game_id
      ? axios.get("/api/game/" + id + "/").then(res => {
          const board = this.generate_board(res.data["board_size"]);
          this.setState({ board: board, game_id: this.props.game_id });
        })
      : axios.get("/api/board/?game_id=" + id).then(res => {
          const board = this.generate_board(res.data["board_size"]);
          this.setState({ board: board, game_id: this.props.game_id });
        });
  }

  render() {
    return (
      <div style={styles.container}>
        {!this.state.game_over ? (
          <>
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
                        handleClick={e => this.handleClick(row, col, e)}
                      />
                    );
                  })}
                </Grid>
              );
            })}
          </>
        ) : (
          <Modal
            style={styles.modal}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
          >
            <div style={styles.paper}>
              <h2>Game Over</h2>
              <p>Refresh Page to Play Again</p>
              <Button
                color="secondary"
                onClick={e => window.location.reload(false)}
              >
                {" "}
                Restart
              </Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default GameGrid;
