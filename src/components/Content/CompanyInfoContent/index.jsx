import styled from "styled-components";
import { TextInput } from "../../Common/Input/TextInput";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { updateCompanyDetail } from "../../../api/companyList/companyListInfo";
import LoadingSpinnerBack from "../../Common/LoadingSpinner/LoadingSpinnerBack";

const CompanyInfoContent = ({ companyInfo }) => {
  const { corpIdx } = companyInfo;
  const [infoInputs, setInfoInputs] = useState({
    companyName: companyInfo.companyName ? companyInfo.companyName : "",
    companyId: companyInfo.companyId ? companyInfo.companyId : "",
    companyNumber: companyInfo.companyNumber ? companyInfo.companyNumber : "",
    businessNumber: companyInfo.businessNumber
      ? companyInfo.businessNumber
      : "",
  });

  const { companyName, companyId, companyNumber, businessNumber } = infoInputs;

  useEffect(() => {
    if (companyInfo) {
      setInfoInputs({
        companyName: companyInfo.companyName,
        companyId: companyInfo.companyId,
        companyNumber: companyInfo.companyNumber,
        businessNumber: companyInfo.businessNumber,
      });
    }
  }, [companyInfo]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInfoInputs({
      ...infoInputs,
      [name]: value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = updateCompanyDetail(corpIdx, infoInputs);
      result.then((res) => console.log(res));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                value={companyName || ""}
                onChange={handleInputs}
              />
            </div>
            <div>
              <label htmlFor="companyId">회사아이디</label>
              <InfoInput
                type="text"
                id="companyId"
                name="companyId"
                value={companyId || ""}
                onChange={handleInputs}
                disabled
              />
            </div>
            {/* <div>
              <label htmlFor="companyPassword">비밀번호</label>
              <InfoInput
                type="password"
                id="companyPassword"
                name="companyPassword"
              />
            </div> */}
            <div>
              <label htmlFor="companyNumber">회사번호</label>
              <InfoInput
                type="text"
                id="companyNumber"
                name="companyNumber"
                value={companyNumber || ""}
                onChange={handleInputs}
              />
            </div>
            <div>
              <label htmlFor="businessNumber">사업자번호</label>
              <InfoInput
                type="text"
                id="businessNumber"
                name="businessNumber"
                value={businessNumber || ""}
                onChange={handleInputs}
              />
            </div>
            {/* <div>
              <label htmlFor="salesresp">영업점</label>
              <InfoInput type="text" id="salesresp" name="salesresp" />
            </div> */}
          </div>
          <button>수정</button>
        </form>
        {isLoading && <LoadingSpinnerBack />}
      </ContentContainer>
    </>
  );
};

export default CompanyInfoContent;

CompanyInfoContent.propTypes = {
  companyInfo: PropTypes.shape({
    businessNumber: PropTypes.string,
    companyId: PropTypes.number,
    companyName: PropTypes.string,
    companyNumber: PropTypes.string,
    companyPassword: PropTypes.string,
    corpIdx: PropTypes.number,
    discd: PropTypes.number,
    regDate: PropTypes.string,
    sales: PropTypes.number,
    salesresp: PropTypes.number,
    updateDate: PropTypes.string,
  }).isRequired,
};

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  background-color: #f8f8f8;
  padding: 64px 80px 0;
  position: relative;

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
  font-size: 16px;
`;
