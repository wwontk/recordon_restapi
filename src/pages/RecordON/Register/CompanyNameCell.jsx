import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const CompanyNameCell = ({ name }) => {
  const nameRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      setIsTruncated(nameRef.current.scrollWidth > nameRef.current.clientWidth);
    }
  }, [name]);

  return (
    <>
      <td>
        <NameDiv
          ref={nameRef}
          data-tooltip-id={isTruncated ? "nameTooltip" : ""}
          data-tooltip-content={name}
        >
          {name}
        </NameDiv>
      </td>
    </>
  );
};

export default CompanyNameCell;

CompanyNameCell.propTypes = {
  name: PropTypes.string,
};

const NameDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
