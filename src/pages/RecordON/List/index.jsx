import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import Refresh from "../../../assets/img/etc/refresh-ccw.svg";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useState } from "react";
import CompanyListContent from "../../../components/Content/CompanyListContent";
import Tooltip from "../../../components/Common/Tooltip";

const List = () => {
  const initialSearchInputs = {
    companyId: "",
    companySort: 0,
    companyName: "",
    companyNumber: "",
    businessNumber: "",
    discd: 0,
  };
  const [searchInputs, setSearchInputs] = useState(initialSearchInputs);

  const { companyId, companySort, companyName, companyNumber, businessNumber } =
    searchInputs;

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setSearchInputs({
      ...searchInputs,
      [name]: value.replace(/\xA0/g, " "),
    });
  };

  const [isRotating, setIsRotating] = useState(false);
  const handleRefresh = () => {
    setSearchInputs(initialSearchInputs);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(searchInputs);
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
                  <label>회사분류</label>
                  <SelectBox
                    options={[
                      { value: 0, label: "전체" },
                      { value: 1, label: "솔루션사" },
                      { value: 2, label: "고객사" },
                    ]}
                    selected={companySort}
                    onSelect={(option) =>
                      setSearchInputs((prev) => ({
                        ...prev,
                        companySort: option.value,
                      }))
                    }
                  />
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label htmlFor="companyId">회사아이디</label>
                  <CompanyListInput
                    type="text"
                    id="companyId"
                    name="companyId"
                    value={companyId}
                    placeholder="회사아이디를 입력하세요."
                    onChange={handleInputs}
                  />
                </InputWrapper>
                <InputWrapper>
                  <label htmlFor="companyName">회사이름</label>
                  <CompanyListInput
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={companyName}
                    placeholder="회사이름을 입력하세요."
                    onChange={handleInputs}
                  />
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label htmlFor="companyNumber">회사번호</label>
                  <CompanyListInput
                    type="text"
                    id="companyNumber"
                    name="companyNumber"
                    value={companyNumber}
                    placeholder="회사번호를 입력하세요."
                    onChange={handleInputs}
                  />
                </InputWrapper>
                <InputWrapper>
                  <label htmlFor="businessNumber">사업자번호</label>
                  <CompanyListInput
                    type="text"
                    id="businessNumber"
                    name="businessNumber"
                    value={businessNumber}
                    placeholder="사업자번호를 입력하세요."
                    onChange={handleInputs}
                  />
                </InputWrapper>
                <SearchBtnContainer>
                  <Tooltip text="조건 초기화" position="top">
                    <RefreshIcon
                      onClick={handleRefresh}
                      $isRotating={isRotating}
                    >
                      <img src={Refresh} alt="refresh" />
                    </RefreshIcon>
                  </Tooltip>
                  <button>검색</button>
                </SearchBtnContainer>
              </div>
            </div>
          </form>
        </CompanyListTop>

        <CompanyListContent />
      </CompanyListContainer>
    </>
  );
};

export default List;

const CompanyListContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: "42dot Sans", serif;
`;

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
    transform: scaleX(-1);
    filter: invert(72%) sepia(1%) saturate(2410%) hue-rotate(19deg)
      brightness(92%) contrast(89%);
    animation: ${({ $isRotating }) =>
      $isRotating ? "rotate 0.5s linear" : "none"};
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
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
