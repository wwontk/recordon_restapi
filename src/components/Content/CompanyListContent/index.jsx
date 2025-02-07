import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoreIcon from "../../../assets/img/etc/more-vertical.png";
import { CompanyList } from "./data";
import { useNavigate } from "react-router-dom";

const CompanyListContent = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <ContentContainer>
      <table>
        <thead>
          <tr>
            <th>회사번호</th>
            <th>회사이름</th>
            <th>회사아이디</th>
            <th>사업자번호</th>
            <th>영업점</th>
          </tr>
        </thead>
        <tbody>
          {CompanyList.map((list) => (
            <tr key={list.companyId}>
              <td>{list.companyNumber}</td>
              <td>{list.companyName}</td>
              <td>{list.companyId}</td>
              <td>{list.businessNumber}</td>
              <td>
                <p>{list.salesresp}</p>
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
                    <DropdownMenu>
                      <li
                        onClick={() => {
                          navigate(`/recordon/list/${list.companyId}`);
                        }}
                      >
                        상세조회
                      </li>
                      <li>삭제</li>
                    </DropdownMenu>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentContainer>
  );
};

export default CompanyListContent;

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 240px);
  background-color: #f8f8f8;
  padding: 20px 80px 0;

  & > table {
    min-width: 900px;
    height: 100%;
    display: grid;
    grid-template-rows: 32px;

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
      & > tr {
        height: 22px;
        display: table;
        table-layout: fixed;
        width: 100%;
      }
    }
    tbody {
      &::-webkit-scrollbar {
        width: 4px;
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #c0c0c0;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background: #fff;
      }

      position: relative;
      display: block;
      width: calc(100% + 4px);
      height: 100%;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #d0d0d0;
      border-bottom: none;
      & > tr {
        height: 40px;
        display: table;
        table-layout: fixed;
        width: 100%;
        & {
          border-bottom: 1px solid #d0d0d0;
        }
      }

      .scrollBar {
        &::-webkit-scrollbar {
          width: 16px;
        }
      }
    }
    tr th:first-child,
    tr td:first-child {
      width: 80px;
    }
    tr th:nth-child(2),
    tr td:nth-child(2) {
      width: 200px;
    }
    tr th:nth-child(3),
    tr td:nth-child(3) {
      width: 200px;
    }
    tr th:nth-child(4),
    tr td:nth-child(4) {
      width: 200px;
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
  width: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;

  li {
    height: 40px;
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
