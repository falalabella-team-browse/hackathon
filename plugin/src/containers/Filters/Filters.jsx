import React from "react";
import styled from "styled-components";
import RatingBar from "../../components/RatingBar";

const Container = styled.div`
  padding-right: 32px;
  margin-top: 45px;
`;

const RatingFilterContainer = ({ ratings }) => {
  return (
    <Container>
      <RatingBar></RatingBar>
    </Container>
  );
};

export default RatingFilterContainer;
