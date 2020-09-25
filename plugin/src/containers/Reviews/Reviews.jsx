import React from "react";
import styled from "styled-components";
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

const REVIEW_DATA = Array(18);

const ReviewsContainer = () => {
  return (
    <Container>
      <Heading>Reviews (18)</Heading>

      <ReviewList>
        <ReviewBlock></ReviewBlock>
      </ReviewList>
    </Container>
  );
};

export default ReviewsContainer;
