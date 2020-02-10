import React from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import GameGrid from "./components/minesweeper/GameGrid";
import { Switch } from "@material-ui/core";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/:id" component={props => <GameGrid {...props} />} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("app"));
