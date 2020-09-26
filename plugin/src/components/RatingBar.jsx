import React, { Fragment } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  grid-row-gap: 6px;
  align-items: center;
`;

const Label = styled.span`
  font-size: 13px;
  color: #979b9c;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  height: 8px;
  position: relative;
  transition: 0.3s all linear;
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

const Value = styled.span`
  font-size: 13px;
  color: #979b9c;
  margin-left: 12px;
`;

const LABELS = ["Poor", "Below Average", "Average", "Good", "Excellent"];

const COLORS = ["#ee3b11", "#f7a521", "#f7e731", "#a5d72f", "#4aa54a"];

const RatingBar = ({ ratings, totalRating }) => {
  const getValue = (i) => {
    return {
      value: totalRating ? Math.floor((ratings[i + 1] * 100) / totalRating) : 0,
      count: ratings[i + 1],
      name: LABELS[i],
      color: COLORS[i],
    };
  };

  const data = LABELS.map((_, i) => getValue(i)).reverse();

  return (
    <Container>
      {data.map((row) => (
        <Fragment key={row.name}>
          <Label>{row.name}</Label>
          <Bar value={row.value} color={row.color}></Bar>
          <Value>( {row.count} )</Value>
        </Fragment>
      ))}
    </Container>
  );
};

export default RatingBar;
