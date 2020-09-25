import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border: 1px solid #e3e3e3;
  outline: none;
  padding: 8px 15px;
  border-radius: 3px;
`;

const TextInput = ({ placeholder }) => {
  return <Input type="text" placeholder={placeholder} />;
};

export default TextInput;
