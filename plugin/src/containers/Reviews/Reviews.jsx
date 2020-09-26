import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FilledButton } from "../../components/Button";
import CircularLoader from "../../components/CircluarLoader";
import Dropdown from "../../components/Dropdown";
import Pagination from "../../components/Pagination";
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

const LoadingContainer = styled.div`
  text-align: center;
`;

const OPTIONS = [
  { label: "Relevant", value: "review_score:desc" },
  { label: "Recent", value: "created_date:desc" },
  { label: "Rating - High to Low", value: "rating:desc" },
  { label: "Rating - Low to High", value: "rating:asc" },
  { label: "Most Helpful", value: "helpful_count:desc" },
];

const ReviewsContainer = ({ counter }) => {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(OPTIONS[0].value);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const user = useUser();

  const handleOptionChange = (val) => {
    setSelected(val);
  };

  const loadReviews = async () => {
    setLoading(true);
    const data = await http.getAllReviews(user.productId, page, selected);
    setLoading(false);

    if (
      !data.success ||
      !Array.isArray(data.body.data.data) ||
      data.body.data.data.length === 0
    ) {
      return;
    }

    setReviews(data.body.data.data);
    setTotal(data.body.data.meta.total);
  };

  const reset = () => {
    if (page === 0) {
      loadReviews();
    } else {
      setPage(0);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [page]);

  useEffect(() => {
    reset();
  }, [selected, counter]);

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

        {loading && (
          <LoadingContainer>
            <CircularLoader />
          </LoadingContainer>
        )}

        <Pagination
          currentPage={page + 1}
          onChange={(page) => {
            if (!loading) {
              setPage(page - 1);
            }
          }}
          totalResults={total}
          resultsPerPage={10}
        />
      </ReviewList>
    </Container>
  );
};

export default ReviewsContainer;
