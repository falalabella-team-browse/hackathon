import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
import RatingView from "../../components/RatingView";
import ReviewSummary from "../../components/ReviewSummary";
import { OutlinedButton } from "../../components/Button";
import ReviewFilterContainer from "../Filters/Filters";
import ReviewsContainer from "../Reviews/Reviews";
import Modal from "../../components/Modal";
import ReviewForm from "../Form/Form";
import { useUser } from "../../Context/UserContext";
import http from "../../http";

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
  const [data, setData] = useState({
    rating: 0,
    reviewCount: 0,
    ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    totalRating: 0,
  });
  const [counter, setCounter] = useState(1);

  const handleCreateModal = () => {
    setShowModal(true);
  };

  const user = useUser();

  const loadData = async () => {
    const data = await http.getAggregatedDetails(user.productId);

    if (data.success) {
      const { averageRating, totalNumberOfReviews, rating_buckets } = data.body;

      let totalRating = 0;
      const ratings = rating_buckets.reduce((obj, { key, value }) => {
        totalRating += value;
        return {
          ...obj,
          [key]: value,
        };
      }, {});

      setData({
        rating: Math.floor(averageRating * 10) / 10,
        reviewCount: totalNumberOfReviews,
        ratings,
        totalRating,
      });
    }
  };

  const refreshContent = () => {
    loadData();
    setCounter(counter + 1);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Heading.H1>Comentarios</Heading.H1>

      <ReviewsSummarySection>
        <ReviewSummary rating={data.rating} count={data.reviewCount} />
        <RatingView rating={data.rating} />
        <RatingButtonContainer>
          <OutlinedButton onClick={handleCreateModal}>
            Escribir comentario
          </OutlinedButton>
        </RatingButtonContainer>
      </ReviewsSummarySection>

      <ContentContainer>
        <ReviewFilterContainer
          ratings={data.ratings}
          totalRating={data.totalRating}
        ></ReviewFilterContainer>
        <ReviewsContainer counter={counter}></ReviewsContainer>
      </ContentContainer>

      {showModal && (
        <Modal>
          <ReviewForm
            onClose={() => {
              setShowModal(false);
            }}
            onChange={refreshContent}
          />
        </Modal>
      )}
    </Container>
  );
};

export default AppShell;
