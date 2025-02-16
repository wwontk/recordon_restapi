import { useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InfiniteScroll = ({ hasMore, onLoadMore }) => {
  const observer = useRef(null);
  const targetRef = useRef(null);

  const handleObserver = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => onLoadMore(), 800);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    if (targetRef.current) handleObserver(targetRef.current);
  }, [handleObserver]);

  return (
    <>
      <Target ref={targetRef}>
        <td colSpan="7">
          {hasMore
            ? "목록을 불러오는 중 입니다."
            : "데이터를 모두 불러왔습니다."}
        </td>
      </Target>
    </>
  );
};

InfiniteScroll.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default InfiniteScroll;

const Target = styled.tr`
  height: 20px !important;
  background-color: #e6e6e6;
  border-bottom: none !important;
  display: flex !important;
  justify-content: center;
  align-items: center;

  & > td {
    width: auto !important;
    height: 16px !important;
  }
`;
