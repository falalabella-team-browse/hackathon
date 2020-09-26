import React, { useEffect } from "react";
import styled from "styled-components";
import RatingBar from "../../components/RatingBar";
import { useUser } from "../../Context/UserContext";
import http from "../../http";

const Container = styled.div`
  padding-right: 32px;
  margin-top: 45px;
`;

const RatingFilterContainer = ({ ratings, totalRating }) => {
  return (
    <Container>
      <RatingBar ratings={ratings} totalRating={totalRating}></RatingBar>
    </Container>
  );
};

export default RatingFilterContainer;
