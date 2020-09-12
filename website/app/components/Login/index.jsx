import React, { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../../context/UserContext";
import http from "../../http";

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const FormContainer = styled.div`
  padding: 12px 8px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const Login = () => {
  const [data, setData] = useState({
    email: "",
    pwd: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { login } = useUserContext();

  const handleRoute = (route) => () => {
    history.replace(route);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    http.login(data).then((res) => {
      setLoading(false);
      if (res.success) {
        login(res.data.token);
        history.replace("/");
      } else {
        setError(res.message);
      }
    });
  };

  const handleInput = (prop) => (e) => {
    setData({
      ...data,
      [prop]: e.target.value,
    });
  };

  return (
    <Container>
      <Card>
        <Card.Header className="text-center">
          Login into {process.env.APP_NAME}
        </Card.Header>
        <Card.Body>
          <Card.Title>Hello There,</Card.Title>
          <Card.Text>
            Login into application by providing your credentials
          </Card.Text>
          <Form onSubmit={handleOnSubmit}>
            <FormContainer>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  value={data.email}
                  onChange={handleInput("email")}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  value={data.pwd}
                  onChange={handleInput("pwd")}
                />
              </Form.Group>
            </FormContainer>

            {loading && (
              <LoadingContainer>
                <Spinner animation="border" variant="primary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </LoadingContainer>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" block type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Link href="" onClick={handleRoute("/register")}>
            Register Here
          </Card.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
