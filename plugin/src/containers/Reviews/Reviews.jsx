import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FilledButton } from "../../components/Button";
import CircularLoader from "../../components/CircluarLoader";
import Dropdown from "../../components/Dropdown";
import ReviewBlock from "../../components/ReviewBlock";
import { useUser } from "../../Context/UserContext";
import http from "../../http";

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const user = useUser();

  const handleOptionChange = (val) => {
    setSelected(val);
  };

  const loadReviews = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    const data = await http.getAllReviews(user.productId, page);

    if (!data.success || data.body.data.length === 0) {
      setHasMore(false);
      return;
    }

    setReviews([...reviews, ...data.body.data]);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, [page]);

  const handleLoadMore = () => {
    if (loading || !hasMore) {
      return;
    }

    setPage(page + 1);
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
        {reviews.map((r) => (
          <ReviewBlock key={r._id} review={r}></ReviewBlock>
        ))}

        {hasMore && (
          <FilledButton onClick={handleLoadMore}>
            {loading ? (
              <CircularLoader size="18px" color="white" />
            ) : (
              "Load More"
            )}
          </FilledButton>
        )}
      </ReviewList>
    </Container>
  );
};

export default ReviewsContainer;
