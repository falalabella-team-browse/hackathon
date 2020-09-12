import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import FullScreenLoader from "../components/FullScreenLoader";
import { Route, useHistory, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import Login from "../components/Login";
import Register from "../components/Register";
import HomePage from "./HomePage";
import http from "../http";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 64px 1fr;
`;

const Shell = () => {
  const [isLoaded, setLoaded] = useState(true);
  const { user, logout, updateUser } = useUserContext();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    http.validate().then((res) => {
      let isLoggedIn = false;

      if (res.success) {
        isLoggedIn = true;
      }

      if (
        !isLoggedIn &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        history.replace("/login");
      }

      if (
        isLoggedIn &&
        (location.pathname === "/login" || location.pathname === "/register")
      ) {
        history.replace("/");
      }

      updateUser({ isLoggedIn });
      setLoaded(false);
    });
  }, [history, location]);

  const handleRoute = (route) => () => {
    history.replace(route);
  };

  const handleLogout = () => {
    logout();
    history.replace("/login");
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={handleRoute("/")}>
          {process.env.APP_NAME}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={handleRoute("/")}>Home</Nav.Link>
        </Nav>
        <Nav>
          {user.isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <Nav.Link onClick={handleRoute("/login")}>Login</Nav.Link>
          )}
        </Nav>
      </Navbar>
      {isLoaded ? (
        <FullScreenLoader />
      ) : (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      )}
    </Container>
  );
};

export default Shell;
