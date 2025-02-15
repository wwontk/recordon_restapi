import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import Refresh from "../../../assets/img/etc/refresh-ccw.svg";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useCallback, useEffect, useRef, useState } from "react";
import CompanyListContent from "../../../components/Content/CompanyListContent";
import Tooltip from "../../../components/Common/Tooltip";
import { searchCompany } from "../../../api/companyList/companyListInfo";

const List = () => {
  const [companies, setCompanies] = useState([]);
  const [companySort, setCompanySort] = useState(0);
  const [searchSort, setSearchSort] = useState("companyName");
  const [keyword, setKeyword] = useState("");

  const [isRotating, setIsRotating] = useState(false);
  const handleRefresh = () => {
    setCompanySort(0);
    setSearchSort("companyName");
    setKeyword("");
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    pageNumber === 0 ? searchCompanies() : setPageNumber(0);
  };

  // 무한스크롤
  const [pageNumber, setPageNumber] = useState(0);
  const [moreData, setMoreData] = useState(true);
  const observer = useRef(null);

  const containerRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && moreData) {
          setTimeout(() => setPageNumber((prev) => prev + 1), 800);
        }
      });
      if (node) observer.current.observe(node);
    },
    [moreData]
  );

  const searchCompanies = (page) => {
    setMoreData(true);
    const result = searchCompany({
      discd: 0,
      page: page ? page : pageNumber,
      [searchSort]: keyword,
    });
    result.then((res) => {
      if (res.data.content && pageNumber === 0) {
        if (res.data.last) setMoreData(false);
        setCompanies(res.data.content);
      } else if (res.data.content && pageNumber !== 0) {
        setCompanies((prev) => prev.concat(res.data.content));
        if (res.data.last) setMoreData(false);
      } else if (!res.data.content && pageNumber === 0) setCompanies([]);
      else {
        setCompanies((prev) => [...prev]);
        setMoreData(false);
      }
    });
  };

  useEffect(() => {
    if (companies.length > 0) searchCompanies();
  }, [pageNumber]);

  useEffect(() => {
    searchCompanies();
  }, []);

  return (
    <>
      <CompanyListContainer>
        <CompanyListTop>
          <form onSubmit={handleSubmit}>
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
                    onSelect={(option) => setCompanySort(option.value)}
                    width={"100px"}
                  />
                </InputWrapper>
                <InputWrapper>
                  <label>검색구분</label>
                  <SelectBox
                    options={[
                      { value: "companyName", label: "회사명" },
                      { value: "companyId", label: "회사ID" },
                      { value: "businessNumber", label: "사업자번호" },
                      { value: "companyNumber", label: "대표번호" },
                    ]}
                    selected={searchSort}
                    onSelect={(option) => setSearchSort(option.value)}
                    width={"120px"}
                  />
                  <CompanyListInput
                    placeholder="검색어를 입력해주세요."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    autoFocus
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

        <CompanyListContent
          data={companies}
          target={containerRef}
          moreData={moreData}
        />
      </CompanyListContainer>
    </>
  );
};

export default List;

const CompanyListContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > button {
    width: 50px;
    height: 28px;
    background-color: #666;
    border: none;
    border-radius: 2px;
    color: white;
    font-size: 12px;
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
  margin-left: 8px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyListTop = styled.div`
  width: 100%;
  height: 200px;
  padding: 42px 0 42px 80px;
  display: flex;
  align-items: center;

  & > form {
    width: 100%;

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
        gap: 24px;
      }

      label {
        display: inline-block;
        width: 80px;
      }
    }
  }
`;
