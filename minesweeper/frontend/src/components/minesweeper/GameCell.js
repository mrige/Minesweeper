import React, { Component } from "react";
import { Button } from "@material-ui/core";

const GameCell = props => {
  return (
    <Button
      onClick={props.handleClick}
      variant="contained"
      color="secondary"
      size="small"
      style={{
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
        border: "1px solid"
      }}
      disabled={props.disable}
      disableElevation
    >
      {props.value}
    </Button>
  );
};

export default GameCell;
