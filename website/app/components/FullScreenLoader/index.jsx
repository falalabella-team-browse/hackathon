import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #dfe6e9;
`;

const FullScreenLoader = () => {
  return (
    <Container>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default FullScreenLoader;
