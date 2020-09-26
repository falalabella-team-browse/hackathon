import React, { useState } from "react";
import styled from "styled-components";
import Star, { VIEW_FULL, VIEW_HALF, VIEW_EMPTY } from "./Star";

const MAX_RATING = 5;
const Container = styled.div`
  cursor: ${(prop) => (prop.editable ? "pointer" : "auto")};
`;

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

const RatingView = ({
  rating,
  size,
  editable = false,
  onChange,
  gap = { gap },
}) => {
  const [views, setViews] = useState(getViews(rating));

  const handleOnClick = (i) => () => {
    if (editable) {
      setViews(getViews(i));
      onChange(i);
    }
  };

  return (
    <Container editable={editable}>
      {views.map((v, i) => (
        <Star
          height={size}
          width={size}
          key={i}
          view={v}
          gap={gap}
          onClick={handleOnClick(i + 1)}
        />
      ))}
    </Container>
  );
};

export default RatingView;
