import React from "react";
import ReactDOM from "react-dom";

import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import GameGrid from "./components/minesweeper/GameGrid";

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route exact path="game" component={GameGrid} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("app"));
