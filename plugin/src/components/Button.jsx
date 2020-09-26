import React from "react";
import styled from "styled-components";

const OutlineButton = styled.button`
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  padding: 10px 18px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.7px;

  @media (max-width: 568px) {
    width: 100%;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const FillButton = styled.button`
  background-color: #aad500;
  color: white;
  border: none;
  border-radius: 4px;
  outline: none;
  padding: 10px 18px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.7px;
  margin-top: 15px;

  &:hover {
    background-color: #bcec02;
  }
`;

const OutlinedButton = ({ children, onClick }) => {
  return <OutlineButton onClick={onClick}>{children}</OutlineButton>;
};

const FilledButton = ({ children, onClick }) => {
  return <FillButton onClick={onClick}>{children}</FillButton>;
};

export { OutlinedButton, FilledButton };
