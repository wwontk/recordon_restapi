import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import dropdownArrow from "../../../assets/img/etc/chevron-down.png";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ $width }) => $width || "120px"};
`;

const SelectButton = styled.button.attrs({ type: "button" })`
  width: ${({ $width }) => $width || "120px"};
  height: ${({ $height }) => $height || "24px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  color: black;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 12px;
  padding: 0 8px;

  & > img {
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease;
    ${({ $isOpen }) => $isOpen && "transform: rotate(180deg);"}
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  left: 0;
  width: ${({ $width }) => $width || "120px"};
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
  font-size: 12px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SelectBox = ({ options, selected, onSelect, width, height }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((option) => option.value === selected) || options[0];

  const handleSelect = (option) => {
    if (onSelect) onSelect(option);
    setIsOpen(false);
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
    <SelectContainer ref={dropdownRef} $width={width}>
      <SelectButton
        onClick={() => setIsOpen((prev) => !prev)}
        $isOpen={isOpen}
        $width={width}
        $height={height}
      >
        {selectedOption.label}
        <img src={dropdownArrow} alt="dropdown" />
      </SelectButton>
      <DropdownMenu $isOpen={isOpen} $width={width}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </SelectContainer>
  );
};

export default SelectBox;

SelectBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onSelect: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};
