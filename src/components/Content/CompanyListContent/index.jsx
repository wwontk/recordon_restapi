import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoreIcon from "../../../assets/img/etc/more-vertical.png";
import moment from "moment";
import "moment/locale/ko";
import {
  formatbusinessNumber,
  formatCompanyNumber,
} from "../../../utils/formatNumber";
import PropTypes from "prop-types";
import InfiniteScroll from "../../Common/InfiniteScroll/useInfiniteScroll";
import LoadingSpinnerBack from "../../Common/LoadingSpinner/LoadingSpinnerBack";
import { searchCompanyDetail } from "../../../api/companyList/companyListInfo";

const CompanyListContent = ({
  pageNumber,
  data,
  count,
  onLoadMore,
  moreData,
  setCompanyDetailOpen,
  setCompanyDetailInfo,
  handleDeleteCompany,
  isLoading,
}) => {
  const [selectedCompany, setSelectedCompany] = useState("");

  // ****** 더보기(상세조회, 해지) 버튼 ****** //
  const menuRef = useRef(null);
  const scrollRef = useRef();
  const [moreFuncTop, setMoreFuncTop] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedCompany("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pageNumber === 0) scrollRef.current.scrollTop = 0;
    if (scrollRef.current.clientHeight < data.length * 40) setMoreFuncTop(true);
    else setMoreFuncTop(false);
  }, [data]);

  // ****** 회사 상세정보 조회 API ****** //
  const handleGetCompanyInfo = (corpIdx) => {
    const result = searchCompanyDetail(corpIdx);
    result
      .then((res) => setCompanyDetailInfo(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <ContentContainer>
      <div>
        <p>
          전체: <span>{count.total}</span>
        </p>
        <p>
          솔루션사: <span>{count.solution}</span>
        </p>
        <p>
          고객사: <span>{count.cust}</span>
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>회사ID</th>
            <th>회사이름</th>
            <th>대표번호</th>
            <th>사업자번호</th>
            <th>영업점</th>
            <th>API 인증키 등록일</th>
            <th>API 인증키 만료일</th>
            <th>사용여부</th>
            <th>등록일</th>
            <th>등록자</th>
            <th>최종수정일</th>
            <th>최종수정자</th>
          </tr>
        </thead>
        <tbody
          className={`scrollBar ${data.length > 11 ? "long-list" : ""}`}
          ref={scrollRef}
        >
          {data.length > 0 ? (
            data.map((list, idx) => (
              <tr key={list.companyId}>
                <td>{idx + 1}</td>
                <td>
                  <p>{list.companyId}</p>
                  {list.sales === 1 && <span></span>}
                </td>
                <td>{list.companyName}</td>
                <td>{formatCompanyNumber(list.companyNumber)}</td>
                <td>{formatbusinessNumber(list.businessNumber)}</td>
                <td>
                  {list.salesCompanyName === "없음" || list.salesresp === 0
                    ? ""
                    : list.salesCompanyName}
                </td>
                <td>{list.acctokenStartDate}</td>
                <td>{list.acctokenEndDate}</td>
                <td className={list.discd !== 0 ? "not-used" : ""}>
                  {list.discd === 0 ? "사용" : "미사용"}
                </td>
                <td>{moment(list.regDate).format("YYYY.MM.DD")}</td>
                <td>{list.regUserId}</td>
                <td>{moment(list.updateDate).format("YYYY.MM.DD")}</td>
                <td>
                  <p>{list.updateUserId}</p>
                  <div
                    ref={selectedCompany === list.companyId ? menuRef : null}
                  >
                    <MoreBtn $isActive={selectedCompany === list.companyId}>
                      <img
                        src={MoreIcon}
                        alt="more"
                        onClick={() => {
                          setSelectedCompany((prev) =>
                            prev === list.companyId ? "" : list.companyId
                          );
                          handleGetCompanyInfo(list.corpIdx);
                        }}
                      />
                    </MoreBtn>
                    {selectedCompany === list.companyId && (
                      <DropdownMenu
                        className={`${
                          moreFuncTop &&
                          (data.length - 1 === idx || data.length - 2 === idx)
                            ? "top-data"
                            : ""
                        } ${list.sales === 1 ? "solutionComp" : ""}`}
                      >
                        <li
                          onClick={() => {
                            setSelectedCompany("");
                            setCompanyDetailOpen(true);
                          }}
                        >
                          상세 조회
                        </li>
                        {list.sales === 1 && <li>고객사 조회</li>}
                        <li
                          onClick={() => {
                            handleDeleteCompany(list.corpIdx);
                            setSelectedCompany("");
                          }}
                        >
                          해지
                        </li>
                      </DropdownMenu>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <>
              <NoData>회사 목록이 존재하지 않습니다.</NoData>
            </>
          )}
          {data.length < 20 ? null : (
            <InfiniteScroll onLoadMore={onLoadMore} hasMore={moreData} />
          )}
        </tbody>
      </table>
      {isLoading && <LoadingSpinnerBack />}
    </ContentContainer>
  );
};

export default CompanyListContent;

CompanyListContent.propTypes = {
  pageNumber: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      companyId: PropTypes.number.isRequired,
      companyName: PropTypes.string.isRequired,
      companyNumber: PropTypes.string.isRequired,
      businessNumber: PropTypes.string.isRequired,
      salesCompanyName: PropTypes.string,
      corpIdx: PropTypes.number,
      discd: PropTypes.number,
      sales: PropTypes.number,
      salesresp: PropTypes.number,
      regDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]).isRequired,
      updateDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]),
      acctokenStartDate: PropTypes.string,
      acctokenEndDate: PropTypes.string,
    })
  ).isRequired,
  count: PropTypes.shape({
    total: PropTypes.number,
    solution: PropTypes.number,
    cust: PropTypes.number,
  }),
  onLoadMore: PropTypes.func.isRequired,
  moreData: PropTypes.bool,
  setCompanyDetailOpen: PropTypes.func,
  setCompanyDetailInfo: PropTypes.func,
  handleDeleteCompany: PropTypes.func,
  isLoading: PropTypes.bool,
};

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 220px);
  max-height: calc(100% - 220px);
  background-color: #f8f8f8;
  padding: 50px 40px 20px;
  position: relative;

  > :first-child {
    position: absolute;
    top: 14px;
    left: 40px;

    background-color: #fff;
    border-radius: 50px;
    border: 1px solid #42b8c8;
    padding: 4px 8px;
    color: #8d8d8d;

    display: flex;
    gap: 12px;

    font-size: 12px;

    span {
      color: #42b8c8;
      font-weight: 700;
    }
  }

  & > table {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 32px;
    font-size: 12px;

    th {
      color: #8d8d8d;
      padding: 0 10px;
      text-align: left;
    }
    td {
      color: #1e1e1e;
      padding: 0 10px;
      vertical-align: middle;
      line-height: 18px;

      &.not-used {
        color: #f93636;
      }
    }
    thead {
      user-select: none;
      font-size: 14px;
      & > tr {
        height: 22px;
        display: table;
        table-layout: fixed;
        width: 100%;
      }
    }
    tbody {
      position: relative;
      display: block;
      width: calc(100% + 4px);
      height: 570px;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #d0d0d0;

      & > tr {
        height: 50px;
        display: table;
        table-layout: fixed;
        width: 100%;
        & {
          border-bottom: 1px solid #d0d0d0;
        }
      }

      &.long-list {
        & > tr:last-child {
          border-bottom: none;
        }
      }
    }
    tr th:first-child,
    tr td:first-child {
      width: 40px;
      padding: 0 2px;
      text-align: center;
    }
    tr th:nth-child(2),
    tr td:nth-child(2) {
      width: 70px;
      position: relative;
      & > span {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #42b8c8;
        border-radius: 50px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
    tr th:nth-child(3),
    tr td:nth-child(3) {
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
    }
    tr th:nth-child(4),
    tr td:nth-child(4) {
      width: 130px;
    }
    tr th:nth-child(5),
    tr td:nth-child(5) {
      width: 130px;
    }
    tr th:nth-child(6),
    tr td:nth-child(6) {
      width: 155px;
    }
    tr th:nth-child(7),
    tr td:nth-child(7) {
      width: 150px;
    }
    tr th:nth-child(8),
    tr td:nth-child(8) {
      width: 150px;
    }
    tr th:nth-child(9),
    tr td:nth-child(9) {
      // width: 100px;
      width: 80px;
    }
    tr th:nth-child(10),
    tr td:nth-child(10) {
      width: 100px;
    }
    tr th:nth-child(11),
    tr td:nth-child(11) {
      width: 100px;
    }
    tr th:nth-child(12),
    tr td:nth-child(12) {
      width: 100px;
    }
    tr td:last-child {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > img {
        width: 28px;
        height: 28px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        padding: 2px;
        border-radius: 2px;

        &:hover {
          background-color: #e9e9e9;
        }
      }

      & > div {
        position: relative;
      }
    }
  }
`;

const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.$isActive ? "#e9e9e9" : "transparent")};
  border: none;

  & > img {
    width: 28px;
    height: 28px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 4px;
    border-radius: 2px;

    &:hover {
      background-color: #e9e9e9;
    }
    &:active {
      background-color: #e9e9e9;
    }
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #d0d0d0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  list-style: none;
  width: 80px;
  z-index: 10;
  display: flex;
  flex-direction: column;

  &.top-data {
    top: -65px;
    &.solutionComp {
      top: -95px;
    }
  }

  li {
    height: 30px;
    cursor: pointer;
    transition: background 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

const NoData = styled.td`
  display: flex;
  justify-content: center;
  padding: 12px 0 !important;
  border-bottom: 1px solid #d0d0d0;
  font-size: 14px !important;
  font-weight: 500;
  color: #8d8d8d !important;
`;
