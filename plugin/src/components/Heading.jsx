import React from "react";
import styled from "styled-components";

const Heading1 = styled.h1`
  border-bottom: 2px solid #aad500;
  font-weight: 400;
  font-size: 20px;
  padding-bottom: 8px;
`;

const H1 = ({ children }) => {
  return <Heading1>{children}</Heading1>;
};


const Heading = {
  H1,
};

export default Heading;
