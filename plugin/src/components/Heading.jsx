import React from "react";
import styled from "styled-components";

const Heading1 = styled.h1`
  border-bottom: 2px solid #aad500;
  font-weight: 400;
  font-size: 20px;
  padding-bottom: 8px;
`;

const Heading4 = styled.h1`
  font-weight: 700;
  font-size: 20px;
  margin-top: 8px;
`;

const Heading2 = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const H1 = ({ children }) => {
  return <Heading1>{children}</Heading1>;
};

const H4 = ({ children }) => {
  return <Heading4>{children}</Heading4>;
};

const H2 = ({ children }) => {
  return <Heading2>{children}</Heading2>;
};

const Heading = {
  H1,
  H4,
  H2,
};

export default Heading;
