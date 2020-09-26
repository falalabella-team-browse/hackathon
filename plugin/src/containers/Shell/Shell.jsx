import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
import RatingView from "../../components/RatingView";
import ReviewSummary from "../../components/ReviewSummary";
import { OutlinedButton } from "../../components/Button";
import ReviewFilterContainer from "../Filters/Filters";
import ReviewsContainer from "../Reviews/Reviews";
import Modal from "../../components/Modal";
import ReviewForm from "../Form/Form";

const Container = styled.div`
  padding: 25px;
`;

const ReviewsSummarySection = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
`;

const RatingButtonContainer = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  margin-top: 45px;
`;

const AppShell = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCreateModal = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <Heading.H1>Comentarios</Heading.H1>

      <ReviewsSummarySection>
        <ReviewSummary rating="4.84" count="33" />
        <RatingView rating={4.84} />
        <RatingButtonContainer>
          <OutlinedButton onClick={handleCreateModal}>
            Escribir comentario
          </OutlinedButton>
        </RatingButtonContainer>
      </ReviewsSummarySection>

      <ContentContainer>
        <ReviewFilterContainer></ReviewFilterContainer>
        <ReviewsContainer></ReviewsContainer>
      </ContentContainer>

      {showModal && (
        <Modal>
          <ReviewForm
            onClose={() => {
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </Container>
  );
};

export default AppShell;
