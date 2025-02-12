import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useState } from "react";
import RegisterInputContent from "../../../components/Content/RegisterInputContent";

const Register = () => {
  const [searchSort, setSearchSort] = useState("companyName");
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput);
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
                    { value: "companyNumber", label: "회사번호" },
                    { value: "businessNumber", label: "사업자번호" },
                  ]}
                  selected={searchSort}
                  onSelect={(option) => setSearchSort(option.value)}
                  width={"240px"}
                />
              </div>
              <div>
                <IQ200SearchInput
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  autoFocus
                />
                <button>조회</button>
              </div>
            </form>
            <table>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>회사명</th>
                  <th>회사번호</th>
                  <th>사업자번호</th>
                </tr>
              </thead>
              <tbody className="scrollBar">
                <tr>
                  <td>1</td>
                  <td>$(주)에스엘케이종합건축사사무소 필아</td>
                  <td>070-1661-5959</td>
                  <td>22-087-919401</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>(주)비플</td>
                  <td>1661-2010</td>
                  <td>22-087-91940</td>
                </tr>
              </tbody>
            </table>
          </IQ200CompanyList>
          <RegisterInputContent />
        </RegisterContent>
      </RegisterContainer>
    </>
  );
};

export default Register;

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
      }
    }
    tr th:first-child,
    tr td:first-child {
      width: 40px;
      padding: 0 4px;
    }
    tr th:nth-child(2),
    tr td:nth-child(2) {
      width: 220px;
    }
    tr th:nth-child(3),
    tr td:nth-child(3) {
      min-width: 120px;
      overflow: hidden;
      white-space: nowrap;
    }
    tr th:last-child,
    tr td:last-child {
      min-width: 120px;
    }
  }
`;

const IQ200SearchInput = styled(TextInput)`
  width: 320px;
  height: 30px;
  border-radius: 0;
  margin-right: 20px;
`;
