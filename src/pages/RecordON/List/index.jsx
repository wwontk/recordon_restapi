import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import Refresh from "../../../assets/img/etc/refresh-ccw.svg";
import SelectBox from "../../../components/Common/Input/SelectBox";

const List = () => {
  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CompanyListContainer>
        <CompanyListTop>
          <form onSubmit={handleSumbit}>
            <p>리스트 목록</p>
            <div>
              <div>
                <InputWrapper>
                  <label htmlFor="compSort">회사분류</label>
                  <SelectBox options={["전체", "솔루션사", "고객사"]} />
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label htmlFor="compId">회사아이디</label>
                  <CompanyListInput
                    type="text"
                    id="compId"
                    name="compId"
                    placeholder="회사아이디를 입력하세요."
                  />
                </InputWrapper>
                <InputWrapper>
                  <label htmlFor="compName">회사이름</label>
                  <CompanyListInput
                    type="text"
                    id="compName"
                    name="compName"
                    placeholder="회사이름을 입력하세요."
                  />
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label htmlFor="companyNo">회사번호</label>
                  <CompanyListInput
                    type="text"
                    id="companyNo"
                    name="companyNo"
                    placeholder="회사번호를 입력하세요."
                  />
                </InputWrapper>
                <InputWrapper>
                  <label htmlFor="businessNo">사업자번호</label>
                  <CompanyListInput
                    type="text"
                    id="businessNo"
                    name="businessNo"
                    placeholder="사업자번호를 입력하세요."
                  />
                </InputWrapper>
                <SearchBtnContainer>
                  <RefreshIcon>
                    <img src={Refresh} alt="refresh" />
                  </RefreshIcon>
                  <button>검색</button>
                </SearchBtnContainer>
              </div>
            </div>
          </form>
        </CompanyListTop>
        <CompanyListContent></CompanyListContent>
      </CompanyListContainer>
    </>
  );
};

export default List;

const SearchBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 32px;

  & > button {
    width: 50px;
    height: 28px;
    background-color: #666;
    border: none;
    border-radius: 2px;
    color: white;
    font-size: 12px;
    font-family: "42dot Sans", serif;
    cursor: pointer;
  }
`;

const RefreshIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  cursor: pointer;

  & > img {
    width: 16px;
    height: 16px;
    filter: invert(72%) sepia(1%) saturate(2410%) hue-rotate(19deg)
      brightness(92%) contrast(89%);
  }
`;

const CompanyListInput = styled(TextInput)`
  width: 240px;
  height: 32px;
  border-radius: 0;
  padding-left: 8px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyListContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: "42dot Sans", serif;
`;

const CompanyListTop = styled.div`
  width: 100%;
  height: 240px;
  padding: 42px 0 42px 80px;

  & > form {
    width: 100%;
    height: 100%;

    & > p {
      font-size: 20px;
      margin-bottom: 30px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px;

      & > div {
        height: 32px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      label {
        display: inline-block;
        width: 90px;
      }
    }
  }
`;

const CompanyListContent = styled.div`
  width: 100%;
  height: calc(100% - 240px);
  background-color: #f8f8f8;
`;
