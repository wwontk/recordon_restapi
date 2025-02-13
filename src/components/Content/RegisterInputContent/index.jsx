import styled from "styled-components";
import { TextInput } from "../../Common/Input/TextInput";
import PropTypes from "prop-types";

const RegisterInputContent = ({ selected }) => {
  // TODO: 사업자번호 없을 시 iq200에서 수정해야 하므로 placeholder 수정
  // TODO: api 연동
  return (
    <>
      <RegisterInputContainer>
        <form>
          <div>
            <label htmlFor="companyId">회사ID</label>
            <RegisterInput
              type="text"
              placeholder="회사ID를 입력해주세요."
              id="companyId"
              name="companyId"
              value={selected.companyId}
              disabled
            />
          </div>
          <div>
            <label htmlFor="companyName">회사명</label>
            <RegisterInput
              type="text"
              placeholder="회사명을 입력해주세요."
              id="companyName"
              name="companyName"
              value={selected.companyName}
              disabled
            />
          </div>
          <div>
            <label htmlFor="companyNumber">회사번호</label>
            <RegisterInput
              type="text"
              placeholder="회사번호를 입력해주세요."
              id="companyNumber"
              name="companyNumber"
              value={selected.companyNumber}
              disabled
            />
          </div>
          <div>
            <label htmlFor="businessNumber">사업자번호</label>
            <RegisterInput
              type="text"
              placeholder={
                selected.businessNumber
                  ? selected.bnCheck
                    ? ""
                    : "국세청에 등록되지 않은 사업자번호 입니다."
                  : "IQ200에서 사업자번호를 등록해주세요."
              }
              id="businessNumber"
              name="businessNumber"
              className="businessNumber"
              value={selected.businessNumber}
              disabled
            />
          </div>
          <div>
            <label htmlFor="salesresp">영업점</label>
            <RegisterInput
              type="text"
              placeholder="영업점을 입력해주세요."
              id="salesresp"
              name="saleseresp"
              value={selected.salesCompanyName}
              disabled
            />
          </div>
          <button>등록</button>
        </form>
      </RegisterInputContainer>
    </>
  );
};

export default RegisterInputContent;

RegisterInputContent.propTypes = {
  selected: PropTypes.shape({
    bnCheck: PropTypes.string,
    businessNumber: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
    companyId: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
    companyNumber: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
    salesCompanyName: PropTypes.string.isRequired,
    salesresp: PropTypes.number.isRequired,
  }).isRequired,
};

const RegisterInputContainer = styled.div`
  width: calc(100% - 500px);
  padding: 40px 80px 0 80px;

  & > form {
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    & > button {
      width: 100px;
      height: 40px;
      border: none;
      background-color: #4e4e4e;
      color: white;
      border-radius: 2px;
      font-family: "42dot Sans", serif;
      font-size: 14px;
      margin-top: 40px;
      cursor: pointer;
    }
  }
`;

const RegisterInput = styled(TextInput)`
  height: 36px;
  background-color: #f3fafa;
  padding-left: 8px;

  &.businessNumber {
    &::placeholder {
      color: #e53030;
    }
  }
`;
