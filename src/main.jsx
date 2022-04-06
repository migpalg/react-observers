import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./core/app";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
