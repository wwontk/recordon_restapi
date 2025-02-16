import { useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const InfiniteScroll = ({ hasMore, onLoadMore }) => {
  const observer = useRef(null);
  const targetRef = useRef(null);

  const handleObserver = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log(entries[0].isIntersecting);
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

  return <div ref={targetRef} style={{ height: "10px", width: "10px" }} />;
};

InfiniteScroll.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default InfiniteScroll;
