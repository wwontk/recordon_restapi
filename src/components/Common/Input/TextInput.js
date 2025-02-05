import styled from "styled-components";

export const TextInput = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 2px;
  outline: none;
  transition: border-color 0.3s;

  &::placeholder {
    font-family: "42dot Sans", serif;
    font-size: 14px;
  }

  &:focus {
    border-color: #000;
  }
`;
