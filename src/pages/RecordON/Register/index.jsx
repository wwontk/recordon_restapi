import styled from "styled-components";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useEffect, useRef, useState } from "react";
import RegisterInputContent from "../../../components/Content/RegisterInputContent";
import { searchIQ200CompDetail } from "../../../api/companyList/registerCompany";
import {
  formatbusinessNumber,
  formatCompanyNumber,
} from "../../../utils/formatNumber";
import closeCircle from "../../../assets/img/etc/x-circle.png";
import { Tooltip } from "react-tooltip";
import CompanyNameCell from "../../../components/Common/Tooltip/CompanyNameCell";
import InfiniteScroll from "../../../components/Common/InfiniteScroll/useInfiniteScroll";
import LoadingSpinnerBack from "../../../components/Common/LoadingSpinner/LoadingSpinnerBack";

const Register = () => {
  // ****** iq200 회사 리스트 조회 input ****** //
  const [salesSort, setSalesSort] = useState(0);
  const [searchSort, setSearchSort] = useState("companyName");
  const [searchInput, setSearchInput] = useState("");

  const [iq200CompList, setIq200CompList] = useState([]);
  const [selected, setSelected] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // ****** iq200 회사 리스트 조회 API ****** //
  const [pageNumber, setPageNumber] = useState(0);
  const [moreData, setMoreData] = useState(true);

  const searchIq200Companies = (page) => {
    setMoreData(true);
    const result = searchIQ200CompDetail({
      discd: 0,
      page: page ? page : pageNumber,
      [searchSort]: searchInput,
      sales: salesSort,
    });
    result
      .then((res) => {
        if (res.data.content && pageNumber === 0) {
          if (res.data.last) setMoreData(false);
          setIq200CompList(res.data.content);
        } else if (res.data.content && pageNumber !== 0) {
          setIq200CompList((prev) => prev.concat(res.data.content));
          if (res.data.last) setMoreData(false);
        } else if (!res.data.content && pageNumber === 0) setIq200CompList([]);
        else {
          setIq200CompList((prev) => [...prev]);
          setMoreData(false);
        }
      })
      .catch((err) => {
        console.log(err + " IQ200 회사 리스트 조회 실패");
      });
  };

  useEffect(() => {
    if (iq200CompList.length > 0) searchIq200Companies();
  }, [pageNumber]);

  useEffect(() => {
    searchIq200Companies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchSort === "companyName") {
      if (searchInput.length == 1) {
        alert("검색은 2글자 이상부터 가능합니다.");
        return;
      }
    } else if (searchSort === "businessNumber") {
      if (searchInput.length < 6) {
        alert("6자리 이상 입력해주세요.");
        return;
      }
    } else if (searchSort === "companyNumber") {
      if (searchInput.length < 4) {
        alert("4자리 이상 입력해주세요.");
        return;
      }
    }
    pageNumber === 0 ? searchIq200Companies() : setPageNumber(0);
    setSelected({});
  };

  // ****** 재조회시 스크롤 Top으로 ****** //
  const scrollRef = useRef();

  useEffect(() => {
    if (pageNumber === 0) scrollRef.current.scrollTop = 0;
  }, [pageNumber]);

  return (
    <>
      <RegisterContainer>
        <RegisterTop>
          <p>RecordON 회사 등록</p>
        </RegisterTop>
        <RegisterContent>
          <IQ200CompanyList>
            <form onSubmit={handleSubmit}>
              <div>
                <label>회사분류</label>
                <SelectBox
                  options={[
                    { value: 0, label: "고객사" },
                    { value: 1, label: "솔루션사" },
                  ]}
                  selected={salesSort}
                  onSelect={(option) => {
                    setSalesSort(option.value);
                  }}
                  width={"100px"}
                  height={"24px"}
                />
              </div>
              <div>
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
                    setSearchInput("");
                  }}
                  width={"100px"}
                  height={"24px"}
                />
                <SearchInputDiv>
                  <IQ200SearchInput
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    autoFocus
                  />
                  <img
                    src={closeCircle}
                    alt="resetBtn"
                    onClick={() => setSearchInput("")}
                  />
                </SearchInputDiv>
                <button>조회</button>
              </div>
            </form>
            <table>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>회사ID</th>
                  <th>회사명</th>
                  <th>대표번호</th>
                  <th>사업자번호</th>
                </tr>
              </thead>
              <tbody
                className={`scrollBar ${
                  iq200CompList.length < 15 ? "" : "long-list"
                }`}
                ref={scrollRef}
              >
                {iq200CompList.length > 0 ? (
                  iq200CompList.map((comp, idx) => (
                    <tr key={comp.companyId} onClick={() => setSelected(comp)}>
                      <td>{idx + 1}</td>
                      <td>{comp.companyId}</td>
                      <CompanyNameCell name={comp.companyName} />
                      <td>{formatCompanyNumber(comp.companyNumber)}</td>
                      <td>
                        <p
                          className={
                            comp.bnCheck === "FAIL"
                              ? "noRegister"
                              : comp.bnCheck == "03"
                              ? "closedDown"
                              : ""
                          }
                        >
                          {formatbusinessNumber(comp.businessNumber)}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <NoData>회사 목록이 존재하지 않습니다.</NoData>
                  </>
                )}
                {iq200CompList.length < 20 ? null : (
                  <InfiniteScroll
                    hasMore={moreData}
                    onLoadMore={() => setPageNumber((prev) => prev + 1)}
                  />
                )}
              </tbody>
            </table>
            <Tooltip
              anchorSelect=".noRegister"
              place="top"
              className="businessNoTooltip"
            >
              국세청에 등록되지 않은 사업자번호 입니다.
            </Tooltip>
            <Tooltip
              anchorSelect=".closedDown"
              place="top"
              className="businessNoTooltip"
            >
              폐업 처리된 사업자번호 입니다.
            </Tooltip>
            <Tooltip
              id="nameTooltip"
              place="top"
              className="businessNoTooltip"
            />
          </IQ200CompanyList>
          <RegisterInputContent
            selected={selected}
            setSelected={setSelected}
            setIsLoading={setIsLoading}
          />
          {isLoading && <LoadingSpinnerBack />}
        </RegisterContent>
      </RegisterContainer>
    </>
  );
};

export default Register;

const RegisterContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const RegisterTop = styled.div`
  width: 100%;
  height: 100px;
  padding: 40px 0 40px 80px;
  border-bottom: 1px solid #d3d3d3;

  & > p {
    font-size: 18px;
  }
`;

const RegisterContent = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  position: relative;
`;

const IQ200CompanyList = styled.div`
  width: 900px;
  height: 100%;
  background-color: #f8f8f8;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  & > form {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > div {
      display: flex;
      align-items: center;

      & > label {
        font-size: 14px;
        width: 80px;
      }

      & > button {
        width: 50px;
        height: 24px;
        background-color: #484848;
        color: white;
        border: none;
        border-radius: 2px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }

  & > table {
    flex: 1;
    height: calc(100% - 150px);
    background-color: #fff;
    text-align: center;
    table-layout: fixed;
    border: 1px solid #d0d0d0;

    th {
      color: #8d8d8d;
      padding: 0 8px;
      text-align: center;
      height: 30px;
      vertical-align: middle;
      background-color: #efefef;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
    }
    td {
      max-height: 50px;
      color: #1e1e1e;
      padding: 0 8px;
      vertical-align: middle;
      line-height: 18px;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    thead {
      user-select: none;
      & > tr {
        height: 22px;
        display: table;
        table-layout: fixed;
        width: 100%;
        // border-top: 1px solid #d0d0d0;
        border-bottom: 1px solid #d0d0d0;
      }
    }
    tbody {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: #fff;
      // border-bottom: 1px solid #d0d0d0;
      & > tr {
        height: 36px;
        display: table;
        table-layout: fixed;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s ease;

        & {
          border-bottom: 1px solid #d0d0d0;
        }

        &.long-list {
          border-bottom: none;
        }

        &:hover {
          background-color: #f4f4f4;
        }

        & > td {
          & > div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          & > p {
            &.noRegister,
            &.closedDown {
              color: red;
            }
          }
        }
      }
    }
    tr th:first-child,
    tr td:first-child {
      width: 40px;
      padding: 0 2px;
    }
    tr th:nth-child(2),
    tr td:nth-child(2) {
      width: 60px;
      padding: 0 2px;
    }
    tr th:nth-child(3),
    tr td:nth-child(3) {
      width: 220px;
    }
    tr th:nth-child(4),
    tr td:nth-child(4) {
      min-width: 120px;
      overflow: hidden;
      white-space: nowrap;
    }
    tr th:last-child,
    tr td:last-child {
      min-width: 120px;
    }
  }

  .businessNoTooltip {
    padding: 8px;
    font-size: 12px;
  }
`;

const SearchInputDiv = styled.div`
  width: 240px;
  height: 24px;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-left: 4px;
  margin-right: 20px;

  & > img {
    width: 14px;
    height: 14px;
    margin-left: 8px;
    cursor: pointer;
`;

const IQ200SearchInput = styled.input`
  height: 100%;
  border: none;
  flex: 1;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 0;
  border-bottom: 1px solid #d0d0d0;
  font-size: 14px;
  font-weight: 500;
  color: #8d8d8d;
`;
