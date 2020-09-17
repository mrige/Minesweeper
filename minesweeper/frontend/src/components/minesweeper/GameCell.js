import React, { Component } from "react";
import { Button } from "@material-ui/core";

const GameCell = props => {
  return (
    <Button
      onContextMenu={props.handleClick}
      onClick={props.handleClick}
      variant="contained"
      color={props.disable ? "primary" : "secondary"}
      size="small"
      style={{
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
        border: "1px solid"

      }}
      contextMenu={props.disable.toString()}
    >
      {props.value}
    </Button>
  );
};

export default GameCell;
