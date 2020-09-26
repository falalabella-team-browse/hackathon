import React, { useState } from "react";
import styled from "styled-components";
import { FilledButton } from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import ReviewBlock from "../../components/ReviewBlock";

const Container = styled.div``;

const Heading = styled.p`
  font-weight: 700;
  font-size: 16px;
  color: #424e55;
  letter-spacing: 0.4px;
`;

const ReviewList = styled.div`
  margin-top: 15px;
`;

const OPTIONS = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Helpful", value: "helpful" },
];

const ReviewsContainer = () => {
  const [selected, setSelected] = useState(OPTIONS[0].value);

  const handleOptionChange = (val) => {
    setSelected(val);
  };

  return (
    <Container>
      <Heading>Reviews (18)</Heading>

      <Dropdown
        options={OPTIONS}
        selected={selected}
        onChange={handleOptionChange}
      />

      <ReviewList>
        <ReviewBlock></ReviewBlock>

        <FilledButton>Load More</FilledButton>
      </ReviewList>
    </Container>
  );
};

export default ReviewsContainer;
