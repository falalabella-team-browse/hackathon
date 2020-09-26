import React, { Fragment } from "react";
import styled from "styled-components";
import DownArrow from "./DownArrow";

const Label = styled.li`
  background-color: #aad500;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const ItemContainer = styled.li`
  width: 20px;
  height: 20px;
`;

const Item = styled.ol`
  list-style-type: none;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 25px;
`;

const ButtonFilled = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

const ButtonOutlined = styled.li`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const EllipsesContainer = styled.li`
  font-weight: 700;
  letter-spacing: 2px;
`;

const Pagination = ({
  currentPage,
  neighborButtonCount = 1,
  onChange,
  totalResults,
  resultsPerPage,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const renderPaginationItem = (pageIndex, key) => {
    return (
      <ButtonOutlined
        onClick={() => {
          onChange(pageIndex);
        }}
      >
        {pageIndex}
      </ButtonOutlined>
    );
  };

  const renderNeighborButtons = (type) => {
    let startIndex = 0;
    let endIndex = 0;

    if (type === "LEFT") {
      startIndex = currentPage - neighborButtonCount;
      startIndex = startIndex > 1 ? startIndex : 2;
      endIndex = currentPage - 1;
    }

    if (type === "RIGHT") {
      startIndex = currentPage + 1;
      endIndex = currentPage + neighborButtonCount;
    }

    const indexes = [];
    for (let i = startIndex; i <= endIndex && i < totalPages; i += 1) {
      indexes.push(i);
    }
    return indexes.map((e) => {
      return renderPaginationItem(e, `${type}${e}`);
    });
  };

  return (
    <Container>
      {/* Left Arrow */}
      {currentPage !== 1 && (
        <ButtonFilled
          onClick={() => {
            onChange(currentPage - 1);
          }}
        >
          <DownArrow rotate={90} />
        </ButtonFilled>
      )}

      {/* Pagination Button */}
      <Item>
        {currentPage !== 1 && renderPaginationItem(1)}
        {currentPage - 2 > neighborButtonCount && (
          <EllipsesContainer>...</EllipsesContainer>
        )}
        {renderNeighborButtons("LEFT")}
        <Label>{currentPage}</Label>
        {renderNeighborButtons("RIGHT")}
        {totalPages - (currentPage + 1) > neighborButtonCount && (
          <EllipsesContainer>...</EllipsesContainer>
        )}
        {currentPage !== totalPages && renderPaginationItem(totalPages)}
      </Item>

      {/* Right Arrow */}
      {currentPage !== totalPages && (
        <ButtonFilled
          onClick={() => {
            onChange(currentPage + 1);
          }}
        >
          <DownArrow rotate={-90} />
        </ButtonFilled>
      )}
    </Container>
  );
};

export default Pagination;
