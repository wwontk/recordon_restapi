import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import dropdownArrow from "../../../assets/img/etc/chevron-down.png";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectButton = styled.button.attrs({ type: "button" })`
  width: 120px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: "42dot Sans", serif;
  font-size: 14px;
  padding: 0 8px;

  & > img {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
    ${({ $isOpen }) => $isOpen && "transform: rotate(180deg);"}
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  left: 0;
  margin-top: 4px;
  width: 100%;
  background-color: white;
  border: 1px solid #d1d5db;
  border-top: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  list-style: none;
  padding: 0;
  font-size: 14px;

  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    opacity: 1;
    transform: scaleY(1);
  `}
`;

const DropdownItem = styled.li`
  padding: 8px 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SelectBox = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SelectContainer ref={dropdownRef}>
      <SelectButton onClick={() => setIsOpen((prev) => !prev)} $isOpen={isOpen}>
        {selected}
        <img src={dropdownArrow} alt="dropdown" />
      </SelectButton>
      <DropdownMenu $isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </SelectContainer>
  );
};

export default SelectBox;

SelectBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
};
