import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ $position }) => {
    switch ($position) {
      case "top":
        return "bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-8px);";
      case "bottom":
        return "top: 100%; left: 50%; transform: translateX(-50%) translateY(8px);";
      case "left":
        return "right: 100%; top: 50%; transform: translateY(-50%) translateX(-8px);";
      case "right":
        return "left: 100%; top: 50%; transform: translateY(-50%) translateX(8px);";
      default:
        return "";
    }
  }}
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  // transition: opacity 0.2s ease-in-out;
`;

const TooltipText = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  position: relative;
`;

const TooltipArrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;

  ${({ $position }) => {
    switch ($position) {
      case "top":
        return "border-width: 6px 6px 0 6px; border-color: rgba(0, 0, 0, 0.85) transparent transparent transparent; top: 100%; left: 50%; transform: translateX(-50%);";
      case "bottom":
        return "border-width: 0 6px 6px 6px; border-color: transparent transparent rgba(0, 0, 0, 0.85) transparent; bottom: 100%; left: 50%; transform: translateX(-50%);";
      case "left":
        return "border-width: 6px 0 6px 6px; border-color: transparent transparent transparent rgba(0, 0, 0, 0.85); left: 100%; top: 50%; transform: translateY(-50%);";
      case "right":
        return "border-width: 6px 6px 6px 0; border-color: transparent rgba(0, 0, 0, 0.85) transparent transparent; right: 100%; top: 50%; transform: translateY(-50%);";
      default:
        return "";
    }
  }}
`;

const Tooltip = ({ text, position = "top", children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <TooltipWrapper $isVisible={isVisible} $position={position}>
        <TooltipArrow $position={position} />
        <TooltipText>{text}</TooltipText>
      </TooltipWrapper>
      {children}
    </TooltipContainer>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  children: PropTypes.node.isRequired,
};

export default Tooltip;
