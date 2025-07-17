import styled from "styled-components";
import Close from "../../../assets/img/etc/modal-close.png";
import PropTypes from "prop-types";

const SearchCompanyModal = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const stopClickPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Content onClick={stopClickPropagation}>
        <div>
          <p>회사 검색</p>
          <img src={Close} alt="닫기" onClick={onClose} />
        </div>
      </Content>
    </Overlay>
  );
};

export default SearchCompanyModal;

SearchCompanyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 600px;
  height: 700px;
  background-color: #fff;

  & > div:first-of-type {
    width: 100%;
    height: 60px;
    background-color: #5d5d5d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    color: #fff;

    & > p {
      font-size: 20px;
      font-weight: 600;
    }

    & > img {
      cursor: pointer;
    }
  }
`;
