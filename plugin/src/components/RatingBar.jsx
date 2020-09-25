import React, { Fragment } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-row-gap: 6px;
`;

const Label = styled.span`
  font-size: 13px;
  color: #979b9c;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  height: 8px;
  position: relative;
  &:after {
    position: absolute;
    content: " ";
    background-color: ${(prop) => prop.color};
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(prop) => prop.value}%;
  }
`;

const RatingBar = () => {
  const data = [
    {
      name: "Excellent",
      value: 20,
      color: "#4aa54a",
    },
    {
      name: "Good",
      value: 40,
      color: "#a5d72f",
    },
    {
      name: "Average",
      value: 10,
      color: "#f7e731",
    },
    {
      name: "Below Average",
      value: 20,
      color: "#f7a521",
    },
    {
      name: "Poor",
      value: 10,
      color: "#ee3b11",
    },
  ];

  return (
    <Container>
      {data.map((row) => (
        <Fragment key={row.name}>
          <Label>{row.name}</Label>
          <Bar value={row.value} color={row.color}></Bar>
        </Fragment>
      ))}
    </Container>
  );
};

export default RatingBar;
