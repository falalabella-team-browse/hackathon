import React from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
import ReviewsContainer from "../Reviews/Reviews";

const Container = styled.div`
  padding: 25px;
`;

const ReviewWrapper = styled.div`
  margin-top: 32px;
`;

const UserContainer = () => {
  return (
    <Container>
      <Heading.H1>User Reviews</Heading.H1>
      <ReviewWrapper>
        <ReviewsContainer forUser />
      </ReviewWrapper>
    </Container>
  );
};

export default UserContainer;
