import React, { Component } from "react";
import GameGrid from "./GameGrid";
import axios from "axios";
import { Container, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

const styles = {
  formControl: {
    margin: 50,
    minWidth: 120
  },
  btn: {
    marginTop: 20
  },
  container: {
    margin: 10
  }
};

export class Game extends Component {
  state = {
    size: 0,
    play: false,
    game_id: ""
  };

  onChange = e => this.setState({ [e.target.name]: parseInt(e.target.value) });

  onSubmit = e => {
    e.preventDefault();
    const { size } = this.state;
    axios.post("api/game/create_game/", { board_size: size }).then(res => {
      console.log(res);

      this.setState({ play: true, game_id: res.data.game_id });
    });
  };

  handleChange = event => {
    this.setState({ size: event.target.value });
  };

  render() {
    const { size, board, play } = this.state;
    return (
      <>
        {!play ? (
          <div style={styles.container}>
            <form onSubmit={this.onSubmit} style={styles.formControl}>
              <InputLabel>Choose Level</InputLabel>
              <Select
                fullWidth
                value={this.state.size}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={5}>Baby Mode</MenuItem>
                <MenuItem value={10}>Easy</MenuItem>
                <MenuItem value={20}>Medium</MenuItem>
                <MenuItem value={30}>Hard</MenuItem>
              </Select>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                style={styles.btn}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <GameGrid size={size} board={board} game_id={this.state.game_id} />
        )}
      </>
    );
  }
}

export default Game;
