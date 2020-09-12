import React, { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    pwd: "",
    confirmPwd: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleRoute = (route) => () => {
    history.replace(route);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (data.pwd !== data.confirmPwd) {
      setError("Password doesn't match");
      return;
    }

    http.register(data).then((res) => {
      setLoading(false);
      if (res.success) {
        history.replace("/login");
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
        <Card.Header className="text-center">Create a new Account</Card.Header>
        <Card.Body>
          <Card.Title>Hello There,</Card.Title>
          <Card.Text>
            Enter your credentials to register into {process.env.APP_NAME}
          </Card.Text>
          <Form onSubmit={handleOnSubmit}>
            <FormContainer>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter name"
                  value={data.name}
                  onChange={handleInput("name")}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
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
                  required
                  type="password"
                  placeholder="Password"
                  value={data.pwd}
                  onChange={handleInput("pwd")}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={data.confirmPwd}
                  onChange={handleInput("confirmPwd")}
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
              Register
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Card.Link href="" onClick={handleRoute("/register")}>
            Already have Account? Login!
          </Card.Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Register;
