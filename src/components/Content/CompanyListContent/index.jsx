import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoreIcon from "../../../assets/img/etc/more-vertical.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import {
  formatbusinessNumber,
  formatCompanyNumber,
} from "../../../utils/formatNumber";
import PropTypes from "prop-types";
import InfiniteScroll from "../../Common/useInfiniteScroll";

// TODO: 데이터 무한스크롤 구현

const CompanyListContent = ({ data, onLoadMore, moreData }) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

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
    if (scrollRef.current.clientHeight < data.length * 40) setMoreFuncTop(true);
    else setMoreFuncTop(false);
  }, [data]);

  return (
    <ContentContainer>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>회사ID</th>
            <th>회사이름</th>
            <th>대표번호</th>
            <th>사업자번호</th>
            <th>영업점</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody className="scrollBar" ref={scrollRef}>
          {data.map((list, idx) => (
            <tr key={list.companyId}>
              <td>{idx + 1}</td>
              <td>{list.companyId}</td>
              <td>{list.companyName}</td>
              <td>{formatCompanyNumber(list.companyNumber)}</td>
              <td>{formatbusinessNumber(list.businessNumber)}</td>
              <td>
                {list.salesCompanyName === "없음" || list.salesresp === 0
                  ? ""
                  : list.salesCompanyName}
              </td>
              <td>
                <p>{moment(list.regDate).format("YYYY.MM.DD")}</p>
                <div ref={selectedCompany === list.companyId ? menuRef : null}>
                  <MoreBtn $isActive={selectedCompany === list.companyId}>
                    <img
                      src={MoreIcon}
                      alt="more"
                      onClick={() =>
                        setSelectedCompany((prev) =>
                          prev === list.companyId ? "" : list.companyId
                        )
                      }
                    />
                  </MoreBtn>
                  {selectedCompany === list.companyId && (
                    <DropdownMenu
                      className={
                        moreFuncTop &&
                        (data.length - 1 === idx || data.length - 2 === idx)
                          ? "top-data"
                          : ""
                      }
                    >
                      <li
                        onClick={() => {
                          navigate(`/recordon/list/${list.corpIdx}`);
                        }}
                      >
                        상세조회
                      </li>
                      <li>해지</li>
                    </DropdownMenu>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {data.length < 20 ? null : (
            <InfiniteScroll onLoadMore={onLoadMore} hasMore={moreData} />
          )}
        </tbody>
      </table>
    </ContentContainer>
  );
};

export default CompanyListContent;

CompanyListContent.propTypes = {
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
    })
  ).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  moreData: PropTypes.bool,
};

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  max-height: calc(100% - 200px);
  background-color: #f8f8f8;
  padding: 20px 40px;

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
      height: 600px;
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
      // & > tr:last-child {
      //   border-bottom: none;
      // }
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
      width: 160px;
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
    top: -85px;
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
