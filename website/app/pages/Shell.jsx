import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import ProductLanding from "./Product/ProductLanding";
import Admin from "./Admin/Admin";

const Shell = () => {
  return (
    <Switch>
      <Route path="/admin" exact>
        <Admin />
      </Route>
      <Route path="/:userId/:productId">
        <ProductLanding />
      </Route>
    </Switch>
  );
};

export default Shell;
