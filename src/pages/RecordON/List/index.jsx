import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import Refresh from "../../../assets/img/etc/refresh-ccw.svg";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useEffect, useRef, useState } from "react";
import CompanyListContent from "../../../components/Content/CompanyListContent";
import Tooltip from "../../../components/Common/Tooltip";
import {
  deleteCompany,
  searchCompany,
} from "../../../api/companyList/companyListInfo";
import CalendarIcon from "../../../assets/img/etc/calendar.png";
import Calendar from "../../../components/Common/Calendar/Calendar";
import { format } from "date-fns";
import CompanyDetailContent from "../../../components/Content/CompanyDetailContent";
import CloseIcon from "../../../assets/img/etc/x-circle.png";

const List = () => {
  // ****** 회사 리스트 조회 input ******//
  const [companies, setCompanies] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    solution: 0,
    cust: 0,
  });
  const [companySort, setCompanySort] = useState(0);
  const [searchSort, setSearchSort] = useState("companyName");
  const [discdSort, setDiscdSort] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [solutionName, setSolutionName] = useState("");

  // ****** 기간 조회 Calendar ****** //
  const [CalendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef();
  const calendarBtnRef = useRef();

  const [allDate, setAllDate] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  const [selectDate, setSelectDate] = useState(
    format(dateRange.startDate, "yyyy.MM.dd") +
      " - " +
      format(dateRange.endDate, "yyyy.MM.dd")
  );
  useEffect(() => {
    if (CalendarOpen) setAllDate(false);
    setSelectDate(
      format(dateRange.startDate, "yyyy.MM.dd") +
        " - " +
        format(dateRange.endDate, "yyyy.MM.dd")
    );
  }, [dateRange]);

  const closeCalendar = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      calendarBtnRef.current &&
      !calendarBtnRef.current.contains(event.target)
    ) {
      setCalendarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeCalendar);
    return () => {
      document.removeEventListener("mousedown", closeCalendar);
    };
  }, [CalendarOpen]);

  // ****** 회사 조회 API ****** //
  const [pageNumber, setPageNumber] = useState(0);
  const [moreData, setMoreData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const searchCompanies = (page) => {
    setMoreData(true);
    const result = searchCompany({
      discd: discdSort,
      sales: companySort,
      [searchSort]: keyword,
      startDate: allDate
        ? ""
        : format(dateRange.startDate, "yyyy-MM-dd'T'00:00:00"),
      endDate: allDate
        ? ""
        : format(dateRange.endDate, "yyyy-MM-dd'T'23:59:59"),
      page: page ? page : pageNumber,
      solutionName: solutionName,
    });
    result
      .then((res) => {
        if (res.data.companies.content && pageNumber === 0) {
          if (res.data.companies.last) setMoreData(false);
          setCompanies(res.data.companies.content);
          setCounts({
            total: res.data.totalCount,
            solution: res.data.solution,
            cust: res.data.customer,
          });
        } else if (res.data.companies.content && pageNumber !== 0) {
          setCompanies((prev) => prev.concat(res.data.companies.content));
          setCounts({
            total: res.data.totalCount,
            solution: res.data.solution,
            cust: res.data.customer,
          });
          if (res.data.companies.last) setMoreData(false);
        } else if (!res.data.companies.content && pageNumber === 0) {
          setCompanies([]);
          setCounts({
            total: res.data.totalCount,
            solution: res.data.solution,
            cust: res.data.customer,
          });
        } else {
          setCompanies((prev) => [...prev]);
          setCounts({
            total: res.data.totalCount,
            solution: res.data.solution,
            cust: res.data.customer,
          });
          setMoreData(false);
        }
      })
      .catch((err) => {
        console.log(err + " RecordON 회사 리스트 조회 실패");
      });
  };

  useEffect(() => {
    if (companies.length > 0) searchCompanies();
  }, [pageNumber]);

  useEffect(() => {
    searchCompanies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchSort === "companyName") {
      if (keyword.length === 1) {
        alert("2글자 이상 입력해주세요.");
        return;
      }
    } else if (searchSort === "businessNumber") {
      if (keyword.length < 6) {
        alert("6글자 이상 입력해주세요.");
        return;
      }
    } else if (searchSort === "companyNumber") {
      if (keyword.length < 4) {
        alert("4글자 이상 입력해주세요.");
        return;
      }
    }
    pageNumber === 0 ? searchCompanies() : setPageNumber(0);
  };

  // ****** 회사 리스트 조회 조건 초기화 ****** //
  const [isRotating, setIsRotating] = useState(false);
  const handleRefresh = () => {
    setCompanySort(0);
    setSearchSort("companyName");
    setKeyword("");
    setDiscdSort(0);
    setAllDate(true);
    setDateRange({
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(),
    });
    setSolutionName("");
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  // ****** RecordON 회사 REST API 해지 ****** //
  const handleDeleteCompany = (compIdx) => {
    const isDelete = confirm("해지하시겠습니까?");

    if (isDelete) {
      setIsLoading(true);
      const result = deleteCompany(compIdx);
      result
        .then((res) => {
          console.log("해지 처리 되었습니다.", res);
          alert("해지처리가 성공적으로 완료 되었습니다.");
          pageNumber === 0 ? searchCompanies() : setPageNumber(0);
        })
        .catch((err) => {
          console.log(err + " 해지 실패");
          alert("해지를 실패하였습니다.");
        })
        .finally(() => setIsLoading(false));
    } else {
      return;
    }
  };

  // ****** 회사 상세조회 Info ****** //
  const [companyDetailOpen, setCompanyDetailOpen] = useState(false);
  const [companyDetailInfo, setCompanyDetailInfo] = useState({});

  return (
    <>
      <CompanyListContainer>
        <CompanyListTop>
          <form onSubmit={handleSubmit}>
            <p>RecordON API 조회</p>
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
                    width={"80px"}
                  />
                </InputWrapper>
                <InputWrapper>
                  <label>사용구분</label>
                  <SelectBox
                    options={[
                      { value: "", label: "전체" },
                      { value: 0, label: "사용" },
                      { value: 1, label: "미사용" },
                    ]}
                    selected={discdSort}
                    onSelect={(option) => setDiscdSort(option.value)}
                    width={"80px"}
                  />
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label>기간</label>
                  <div className="calendar-container">
                    <CalendarInput
                      type="text"
                      readOnly
                      value={selectDate}
                      disabled={allDate}
                    />
                    <button
                      onClick={() => setCalendarOpen((prev) => !prev)}
                      ref={calendarBtnRef}
                      type="button"
                    >
                      <img src={CalendarIcon} alt="calendarBtn" />
                    </button>
                    <input
                      type="checkbox"
                      name="allDate"
                      id="allDate"
                      checked={allDate}
                      onChange={() => setAllDate(!allDate)}
                    />
                    <label htmlFor="allDate">전체기간</label>
                    {CalendarOpen && (
                      <Calendar
                        calendarref={calendarRef}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                      />
                    )}
                  </div>
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label>영업점</label>
                  <div className="textInput">
                    <input
                      placeholder="영업점을 입력해주세요."
                      className="salesInput"
                      value={solutionName}
                      onChange={(e) => setSolutionName(e.target.value)}
                    />
                    <img
                      src={CloseIcon}
                      alt="reset"
                      onClick={() => setSolutionName("")}
                    />
                  </div>
                </InputWrapper>
              </div>
              <div>
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
                    onSelect={(option) => {
                      setSearchSort(option.value);
                      setKeyword("");
                    }}
                    width={"100px"}
                  />
                  <div className="keywordInput">
                    <input
                      placeholder="검색어를 입력해주세요."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      autoFocus
                    />
                    <img
                      src={CloseIcon}
                      alt="reset"
                      onClick={() => setKeyword("")}
                    />
                  </div>
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
                  <button disabled={isLoading}>검색</button>
                </SearchBtnContainer>
              </div>
            </div>
          </form>
        </CompanyListTop>

        <CompanyListContent
          pageNumber={pageNumber}
          data={companies}
          count={counts}
          onLoadMore={() => setPageNumber((prev) => prev + 1)}
          moreData={moreData}
          setCompanyDetailOpen={setCompanyDetailOpen}
          setCompanyDetailInfo={setCompanyDetailInfo}
          handleDeleteCompany={handleDeleteCompany}
          isLoading={isLoading}
        />
        {companyDetailOpen && (
          <CompanyDetailContent
            setCompanyDetailOpen={setCompanyDetailOpen}
            detail={companyDetailInfo}
          />
        )}
      </CompanyListContainer>
    </>
  );
};

export default List;

const CompanyListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CompanyListTop = styled.div`
  width: 100%;
  height: 220px;
  padding: 0 0 0 80px;
  display: flex;
  align-items: center;

  & > form {
    width: 100%;

    & > p {
      font-size: 18px;
      margin-bottom: 30px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px;

      & > div {
        height: 24px;
        display: flex;
        align-items: center;
        gap: 24px;
      }

      label {
        display: inline-block;
        width: 70px;
      }
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  & > label {
    font-size: 14px;
  }

  .calendar-container {
    position: relative;
    display: flex;
    align-items: center;

    & > label {
      width: auto;
      font-size: 14px;
      margin-left: 4px;
    }

    & > input[type="checkbox"] {
      margin-left: 20px;
      background-color: #ccc;
    }
  }

  .keywordInput {
    width: 240px;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    margin-left: 4px;
    padding: 0 8px;

    & > input {
      border: none;
      font-size: 12px;
      flex: 1;

      &:focus {
        outline: none;
      }
    }

    & > img {
      width: 14px;
      height: 14px;
      margin-left: 8px;
      cursor: pointer;
      filter: invert(82%) sepia(8%) saturate(5%) hue-rotate(329deg)
        brightness(93%) contrast(83%);
    }
  }

  .textInput {
    width: 344px;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    padding: 0 8px;

    & > input {
      border: none;
      font-size: 12px;
      flex: 1;

      &:focus {
        outline: none;
      }
    }

    & > img {
      width: 14px;
      height: 14px;
      margin-left: 8px;
      cursor: pointer;
      filter: invert(82%) sepia(8%) saturate(5%) hue-rotate(329deg)
        brightness(93%) contrast(83%);
    }
  }
`;

const CalendarInput = styled(TextInput)`
  width: 160px;
  height: 24px;
  border-radius: 0;
  font-size: 12px;
  text-align: center;
  padding: 0 8px;

  &:focus {
    border-color: #ccc;
  }

  & + button {
    width: 24px;
    height: 24px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-left: 4px;
    cursor: pointer;

    & > img {
      width: 14px;
      height: 14px;
      filter: invert(61%) sepia(7%) saturate(12%) hue-rotate(38deg)
        brightness(88%) contrast(84%);
    }
  }
`;

const SearchBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > button {
    width: 44px;
    height: 24px;
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
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  cursor: pointer;

  & > img {
    width: 14px;
    height: 14px;
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
