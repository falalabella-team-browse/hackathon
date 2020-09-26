import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DownArrow from "./DownArrow";

const Container = styled.div`
  position: relative;
  margin: 12px 0;
  padding: 8px 0;
  border-bottom: 2px solid #dfdfdf;
  max-width: 300px;
  cursor: pointer;
`;

const Selected = styled.span`
  font-weight: bold;
  font-size: 14px;
  padding: 0 12px;
`;

const Options = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: white;
  list-style-type: none;
`;

const Option = styled.li`
  padding: 12px 12px;
  font-weight: 400;
  font-size: 14px;

  &:hover {
    background-color: #dfdfdf;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
`;

const Dropdown = ({ options = [], selected, onChange }) => {
  const [focus, setFocus] = useState(false);
  const wrapperRef = useRef();

  const selectedOption =
    options.find((opt) => opt.value === selected) || options[0];

  const handleOnClick = () => {
    setFocus(!focus);
  };

  const handleClickOutside = (e) => {
    if (wrapperRef && !wrapperRef.current.contains(e.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleOptionSelected = (value) => () => {
    onChange(value);
  };

  return (
    <Container onClick={handleOnClick} ref={(r) => (wrapperRef.current = r)}>
      <Selected>{selectedOption.label}</Selected>
      <Icon>
        <DownArrow />
      </Icon>
      {focus && (
        <Options>
          {options.map(({ label, value }) => (
            <Option onClick={handleOptionSelected(value)} key={value}>
              {label}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default Dropdown;
