import styled from "styled-components";
import { TextInput } from "../../Common/Input/TextInput";
import PropTypes from "prop-types";

const CompanyInfoContent = ({ companyInfo }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <ContentContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="companyName">회사이름</label>
              <InfoInput
                type="text"
                id="companyName"
                name="companyName"
                value={companyInfo.companyName}
              />
            </div>
            <div>
              <label htmlFor="companyId">회사아이디</label>
              <InfoInput
                type="text"
                id="companyId"
                name="companyId"
                value={companyInfo.companyId}
              />
            </div>
            <div>
              <label htmlFor="companyPassword">비밀번호</label>
              <InfoInput
                type="password"
                id="companyPassword"
                name="companyPassword"
              />
            </div>
            <div>
              <label htmlFor="companyNumber">회사번호</label>
              <InfoInput
                type="text"
                id="companyNumber"
                name="companyNumber"
                value={companyInfo.companyNumber}
              />
            </div>
            <div>
              <label htmlFor="businessNumber">사업자번호</label>
              <InfoInput
                type="text"
                id="businessNumber"
                name="businessNumber"
                value={companyInfo.businessNumber}
              />
            </div>
            <div>
              <label htmlFor="salesresp">영업점</label>
              <InfoInput type="text" id="salesresp" name="salesresp" />
            </div>
          </div>
          <button>수정</button>
        </form>
      </ContentContainer>
    </>
  );
};

export default CompanyInfoContent;

CompanyInfoContent.propTypes = {
  companyInfo: PropTypes.shape({
    businessNumber: PropTypes.string.isRequired,
    companyId: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
    companyNumber: PropTypes.string.isRequired,
    companyPassword: PropTypes.string,
    corpIdx: PropTypes.number.isRequired,
    discd: PropTypes.number.isRequired,
    regDate: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
    salesresp: PropTypes.number.isRequired,
    updateDate: PropTypes.string.isRequired,
  }).isRequired,
};

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  background-color: #f8f8f8;
  padding: 64px 80px 0;

  & > form {
    & > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      & > div {
        display: flex;
        align-items: center;
        & > label {
          width: 100px;
        }
      }
    }
    & > button {
      margin-top: 60px;
      width: 60px;
      height: 36px;
      background-color: white;
      border: 1px solid #ce296f;
      color: #ce296f;
      cursor: pointer;
      font-family: "42dot Sans", serif;
      font-size: 16px;
      border-radius: 2px;
    }
  }
`;

const InfoInput = styled(TextInput)`
  width: 280px;
  height: 30px;
  padding-left: 12px;
  border-radius: 0;
  font-family: "42dot Sans", serif;
  font-size: 16px;
`;
