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
  { label: "Most Recent", value: "created_date_asc" },
  { label: "Most Rated", value: "rating_asc" },
  { label: "Most Helpful", value: "helpful_count_asc" },
];

const ReviewsContainer = () => {
  const [selected, setSelected] = useState(OPTIONS[1].value);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const user = useUser();

  const handleOptionChange = (val) => {
    if (loading) {
      return;
    }

    setSelected(val);
  };

  const loadReviews = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    const data = await http.getAllReviews(user.productId, page, selected);

    if (
      !data.success ||
      !Array.isArray(data.body.data.data) ||
      data.body.data.data.length === 0
    ) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    setTotal(data.body.data.meta.total);
    setReviews([...reviews, ...data.body.data.data]);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, [page]);

  useEffect(() => {
    setReviews([]);
    setHasMore(true);

    if (page === 0) {
      loadReviews();
    } else {
      setPage(0);
    }
  }, [selected]);

  const handleLoadMore = () => {
    if (loading || !hasMore) {
      return;
    }

    setPage(page + 1);
  };

  return (
    <Container>
      <Heading>Reviews ({total})</Heading>

      <Dropdown
        options={OPTIONS}
        selected={selected}
        onChange={handleOptionChange}
      />

      <ReviewList>
        {reviews.map((r) => (
          <ReviewBlock key={r.id} review={r}></ReviewBlock>
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
