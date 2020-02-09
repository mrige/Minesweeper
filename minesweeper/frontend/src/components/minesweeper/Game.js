import React, { Component } from "react";
import GameGrid from "./GameGrid";
import axios from "axios";
import { Container, Select, MenuItem, Button } from "@material-ui/core";

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
      this.setState({ play: true, game_id: res.data.game_id });
    });
  };

  render() {
    const { size, board, play, game_id } = this.state;
    return (
      <Container component="main" maxWidth="md">
        {!play ? (
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <Select value={2} onChange={this.handleChange}>
                  <MenuItem value={10}>EASY</MenuItem>
                  <MenuItem value={20}>MIDEUM</MenuItem>
                  <MenuItem value={50}>DIFFICULT</MenuItem>
                </Select>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        ) : (
          <GameGrid size={size} board={board} game_id={game_id} />
        )}
      </Container>
    );
  }
}

export default Game;
