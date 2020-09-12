import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Shell from "./pages/Shell";

import "./styles.scss";

const RootComponent = () => (
  <UserProvider>
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  </UserProvider>
);

ReactDOM.render(<RootComponent />, document.getElementById("root"));
