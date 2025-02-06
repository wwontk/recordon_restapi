import styled from "styled-components";
import BackIcon from "../../../../assets/img/etc/chevrons-left.png";
import { useNavigate } from "react-router-dom";
import CompanyInfoContent from "../../../../components/Content/CompanyInfoContent";

const Info = () => {
  const navigate = useNavigate();

  return (
    <>
      <CompanyInfoContainer>
        <CompanyInfoTop>
          <div onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="back" />
          </div>
          <p>상세 조회</p>
        </CompanyInfoTop>
        <CompanyInfoContent />
      </CompanyInfoContainer>
    </>
  );
};

export default Info;

const CompanyInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: "42dot Sans", serif;
`;

const CompanyInfoTop = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 0 0 80px;
  position: relative;

  & > div {
    position: absolute;
    left: 10px;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e9e9e9;
    }

    img {
      width: 32px;
      height: 32px;
    }
  }

  & > p {
    font-size: 20px;
  }
`;
