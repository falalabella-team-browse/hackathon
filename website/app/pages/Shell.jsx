import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { Route, useHistory, useLocation } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import http from "../http";
import ProductLanding from './Product/ProductLanding';


const Shell = () => {
  // const [isLoaded, setLoaded] = useState(true);
  // const { user, logout, updateUser } = useUserContext();

  // const history = useHistory();
  // const location = useLocation();

  // useEffect(() => {
  //   http.validate().then((res) => {
  //     let isLoggedIn = false;

  //     if (res.success) {
  //       isLoggedIn = true;
  //     }

  //     if (
  //       !isLoggedIn &&
  //       location.pathname !== "/login" &&
  //       location.pathname !== "/register"
  //     ) {
  //       history.replace("/login");
  //     }

  //     if (
  //       isLoggedIn &&
  //       (location.pathname === "/login" || location.pathname === "/register")
  //     ) {
  //       history.replace("/");
  //     }

  //     updateUser({ isLoggedIn });
  //     setLoaded(false);
  //   });
  // }, [history, location]);


  return(
    <Switch>
      <Route path="/" exact>
        <ProductLanding />
      </Route>
    </Switch>
  )
};

export default Shell;
