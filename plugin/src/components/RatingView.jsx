import React from "react";
import styled from "styled-components";
import Star, { VIEW_FULL, VIEW_HALF, VIEW_EMPTY } from "./Star";

const MAX_RATING = 5;
const Container = styled.div``;

const getViews = (rating) => {
  return Array(MAX_RATING)
    .fill(1)
    .map((_, i) => {
      if (rating >= i + 1) {
        return VIEW_FULL;
      }

      if (rating >= i + 0.5) {
        return VIEW_HALF;
      }

      return VIEW_EMPTY;
    });
};

const RatingView = ({ rating, size }) => {
  const views = getViews(rating);

  return (
    <Container>
      {views.map((v, i) => (
        <Star height={size} width={size} key={i} view={v} />
      ))}
    </Container>
  );
};

export default RatingView;
