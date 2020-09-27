import React from "react";
import ReactDOM from "react-dom";
import RootContainer from "./containers/Root/Root";
import UserContainer from "./containers/UserContainer";
import UserContext from "./Context/UserContext";

const load = (element, user) => {
  ReactDOM.render(
    <UserContext.Provider value={user}>
      <RootContainer />
    </UserContext.Provider>,
    element
  );
};

const loadUserPanel = (element, user) => {
  ReactDOM.render(
    <UserContext.Provider value={user}>
      <UserContainer />
    </UserContext.Provider>,
    element
  );
};

if (process.env.NODE_ENV !== "production") {
  window.RNR = {
    basePath: "https://hack.rlab.app",
    // basePath: "http://localhost:3000",
  };

  loadUserPanel(document.getElementById("reviews"), {
    userId: "12",
    productId: "929",
  });
} else {
  window.RNR = {
    load,
    loadUserPanel,
    basePath: "http://localhost:3000",
    setHost: (path) => {
      window.RNR.basePath = path;
    },
  };
}
