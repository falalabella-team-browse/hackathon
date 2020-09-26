import React from "react";
import styled from "styled-components";

const Input = styled.textarea`
  width: 100%;
  border: 1px solid #e3e3e3;
  outline: none;
  padding: 8px 15px;
  border-radius: 3px;
`;

const TextArea = ({ placeholder, onChange, value }) => {
  return (
    <Input
      rows="5"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></Input>
  );
};

export default TextArea;
