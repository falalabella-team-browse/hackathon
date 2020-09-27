import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Shell from "./pages/Shell";

import "./styles.scss";

const RootComponent = () => (
  <BrowserRouter>
    <Shell />
  </BrowserRouter>
);

ReactDOM.render(<RootComponent />, document.getElementById("root"));
