import styled from "styled-components";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useState } from "react";
import RegisterInputContent from "../../../components/Content/RegisterInputContent";
import { searchIQ200CompDetail } from "../../../api/companyList/registerCompany";
import {
  formatbusinessNumber,
  formatCompanyNumber,
} from "../../../utils/formatNumber";
import closeCircle from "../../../assets/img/etc/x-circle.png";
import { Tooltip } from "react-tooltip";
import CompanyNameCell from "./CompanyNameCell";

const Register = () => {
  const [searchSort, setSearchSort] = useState("companyName");
  const [searchInput, setSearchInput] = useState("");

  const [iq200CompList, setIq200CompList] = useState([]);
  const [selected, setSeleceted] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchSort === "companyName") {
      if (searchInput.length == 1) {
        alert("검색은 2글자 이상부터 가능합니다.");
        return;
      }
    }

    const param = { discd: 0, [searchSort]: searchInput };
    const result = searchIQ200CompDetail(param);
    result.then((res) => setIq200CompList(res.data.content));
  };

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
                  width={"240px"}
                />
              </div>
              <div>
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
                  <th>회사ID</th>
                  <th>회사명</th>
                  <th>대표번호</th>
                  <th>사업자번호</th>
                </tr>
              </thead>
              <tbody className="scrollBar">
                {iq200CompList.map((comp) => (
                  <tr key={comp.companyId} onClick={() => setSeleceted(comp)}>
                    <td>{comp.companyId}</td>
                    {/* TODO: hover시 풀네임 확인가능하도록 */}
                    {/* <td>
                      <div>{comp.companyName}</div>
                    </td> */}
                    <CompanyNameCell name={comp.companyName} />
                    <td>{formatCompanyNumber(comp.companyNumber)}</td>
                    <td>
                      <p
                        className={comp.bnCheck === "FAIL" ? "businessNo" : ""}
                      >
                        {formatbusinessNumber(comp.businessNumber)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Tooltip
              anchorSelect=".businessNo"
              place="top"
              className="businessNoTooltip"
            >
              국세청에 등록되지 않은 사업자번호 입니다.
            </Tooltip>
            <Tooltip
              id="nameTooltip"
              place="top"
              className="businessNoTooltip"
            />
          </IQ200CompanyList>
          <RegisterInputContent selected={selected} />
        </RegisterContent>
      </RegisterContainer>
    </>
  );
};

export default Register;

const SearchInputDiv = styled.div`
  width: 320px;
  height: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-right: 20px;

  & > img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const RegisterContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: "42dot Sans", serif;
`;

const RegisterTop = styled.div`
  width: 100%;
  height: 100px;
  padding: 40px 0 40px 80px;
  border-bottom: 1px solid #d3d3d3;

  & > p {
    font-size: 20px;
  }
`;

const RegisterContent = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
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
    gap: 8px;

    & > div {
      display: flex;
      align-items: center;

      & > label {
        width: 80px;
      }

      & > button {
        width: 60px;
        height: 30px;
        background-color: #484848;
        color: white;
        border: none;
        border-radius: 2px;
        font-family: "42dot Sans", serif;
        font-size: 14px;
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

    th {
      color: #8d8d8d;
      padding: 0 8px;
      text-align: center;
      height: 30px;
      vertical-align: middle;
      background-color: #efefef;
      white-space: nowrap;
      overflow: hidden;
      font-size: 14px;
    }
    td {
      max-height: 50px;
      color: #1e1e1e;
      padding: 0 8px;
      vertical-align: middle;
      line-height: 18px;
      font-size: 14px;
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
        border-top: 1px solid #d0d0d0;
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
      border-bottom: none;
      & > tr {
        height: 40px;
        display: table;
        table-layout: fixed;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s ease;

        & {
          border-bottom: 1px solid #d0d0d0;
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
            &.businessNo {
              color: red;
            }
          }
        }
      }
    }
    tr th:first-child,
    tr td:first-child {
      width: 60px;
      padding: 0 2px;
    }
    tr th:nth-child(2),
    tr td:nth-child(2) {
      width: 220px;
    }
    tr th:nth-child(2),
    tr td:nth-child(2) {
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

const IQ200SearchInput = styled.input`
  height: 100%;
  border: none;
  flex: 1;
  font-family: "42dot Sans", serif;

  &:focus {
    outline: none;
  }
`;
