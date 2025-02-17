import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import Refresh from "../../../assets/img/etc/refresh-ccw.svg";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useEffect, useRef, useState } from "react";
import CompanyListContent from "../../../components/Content/CompanyListContent";
import Tooltip from "../../../components/Common/Tooltip";
import { searchCompany } from "../../../api/companyList/companyListInfo";
import CalendarIcon from "../../../assets/img/etc/calendar.png";
import Calendar from "../../../components/Common/Calendar/Calendar";
import { format } from "date-fns";

// TODO: 기간 설정 (캘린더)

const List = () => {
  const [companies, setCompanies] = useState([]);
  const [companySort, setCompanySort] = useState(0);
  const [searchSort, setSearchSort] = useState("companyName");
  const [discdSort, setDiscdSort] = useState(0);
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

  // calendar
  const [CalendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef();
  const calendarBtnRef = useRef();

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

  const [pageNumber, setPageNumber] = useState(0);
  const [moreData, setMoreData] = useState(true);

  // TODO: discd (사용구분) 설정
  const searchCompanies = (page) => {
    setMoreData(true);
    const result = searchCompany({
      discd: 0,
      companySort: companySort,
      [searchSort]: keyword,
      page: page ? page : pageNumber,
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
                  <label>사용구분</label>
                  <SelectBox
                    options={[
                      { value: 0, label: "전체" },
                      { value: 1, label: "사용" },
                      { value: 2, label: "미사용" },
                    ]}
                    selected={discdSort}
                    onSelect={(option) => setDiscdSort(option.value)}
                    width={"100px"}
                  />
                </InputWrapper>
              </div>
              <div>
                <InputWrapper>
                  <label>기간</label>
                  <div className="calendar-container">
                    <CalendarInput type="text" readOnly value={selectDate} />
                    <button
                      onClick={() => setCalendarOpen((prev) => !prev)}
                      ref={calendarBtnRef}
                    >
                      <img src={CalendarIcon} alt="calendarBtn" />
                    </button>
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
          onLoadMore={() => setPageNumber((prev) => prev + 1)}
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

const CalendarInput = styled(TextInput)`
  width: 180px;
  height: 28px;
  border-radius: 0;
  font-size: 14px;
  text-align: center;

  &:focus {
    border-color: #ccc;
  }

  & + button {
    width: 28px;
    height: 28px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin-left: 4px;
    cursor: pointer;

    & > img {
      width: 16px;
      height: 16px;
      filter: invert(61%) sepia(7%) saturate(12%) hue-rotate(38deg)
        brightness(88%) contrast(84%);
    }
  }
`;

const CompanyListInput = styled(TextInput)`
  width: 240px;
  height: 28px;
  border-radius: 0;
  padding-left: 8px;
  margin-left: 4px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  .calendar-container {
    position: relative;
    display: flex;
    align-items: center;
  }
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
        height: 28px;
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
