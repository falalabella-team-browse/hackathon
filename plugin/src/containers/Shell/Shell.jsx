import React from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
import ReviewSummary from "../../components/ReviewSummary";

const Container = styled.div`
  padding: 25px;
`;

const ReviewsSummarySection = styled.div`
  margin-top: 25px;
`;

const AppShell = () => {
  return (
    <Container>
      <Heading.H1>Comentarios</Heading.H1>

      <ReviewsSummarySection>
        <ReviewSummary rating="4.44" count="33"></ReviewSummary>
      </ReviewsSummarySection>
    </Container>
  );
};

export default AppShell;
