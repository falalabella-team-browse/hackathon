import React, { useEffect, useRef, useState } from "react";
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
  { label: "Relevant", value: "review_score:desc" },
  { label: "Recent", value: "created_date:desc" },
  { label: "High to low", value: "rating:desc" },
  { label: "Low to high", value: "rating:asc" },
  { label: "Most Helpful", value: "helpful_count:desc" },
];

const ReviewsContainer = ({ counter }) => {
  const [selected, setSelected] = useState(OPTIONS[0].value);
  const [reviews, setReviews] = useState([]);

  const loading = useRef();

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const user = useUser();

  const handleOptionChange = (val) => {
    if (loading.current) {
      return;
    }

    setSelected(val);
  };

  const loadReviews = async () => {
    if (loading.current || !hasMore) {
      return;
    }

    loading.current = true;

    const data = await http.getAllReviews(user.productId, page, selected);

    if (
      !data.success ||
      !Array.isArray(data.body.data.data) ||
      data.body.data.data.length === 0
    ) {
      loading.current = false;
      setHasMore(false);
      return;
    }

    const list =
      page === 0 ? data.body.data.data : [...reviews, ...data.body.data.data];

    setReviews(list);
    if (list.length === data.body.data.meta.total) {
      setHasMore(false);
    }

    console.log("done");
    setTotal(data.body.data.meta.total);

    loading.current = false;
  };

  const reset = () => {
    if (page === 0) {
      if (loading.current) {
        return;
      }

      loadReviews();
    } else {
      setPage(0);
    }
  };

  useEffect(() => {
    if (loading.current) {
      return;
    }

    loadReviews();
  }, [page]);

  useEffect(() => {
    setReviews([]);
    setHasMore(true);
    reset();
  }, [selected]);

  useEffect(() => {
    reset();
  }, [counter]);

  const handleLoadMore = () => {
    if (loading.current || !hasMore) {
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
          <ReviewBlock
            key={`${selected}_${page}_${r.id}`}
            review={r}
            onChange={reset}
          ></ReviewBlock>
        ))}

        {hasMore && (
          <FilledButton onClick={handleLoadMore}>
            {loading.current ? (
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
