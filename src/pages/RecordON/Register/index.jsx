import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import SelectBox from "../../../components/Common/Input/SelectBox";
import { useState } from "react";
import RegisterInputContent from "../../../components/Content/RegisterInputContent";

const Register = () => {
  const [searchSort, setSearchSort] = useState("companyName");
  return (
    <>
      <RegisterContainer>
        <RegisterTop>
          <p>RecordON 회사 등록</p>
        </RegisterTop>
        <RegisterContent>
          <IQ200CompanyList>
            <form>
              <div>
                <label htmlFor="sort">검색구분</label>
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
                <IQ200SearchInput type="text" />
              </div>
              <button>조회</button>
            </form>
            <table>
              <thead>
                <tr>
                  <th>회사명</th>
                  <th>회사번호</th>
                  <th>사업자번호</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>(주)비플비플비플비플비플비플비플</div>
                  </td>
                  <td>16612010</td>
                  <td>2208791940</td>
                </tr>
                <tr>
                  <td>
                    <div>(주)비플</div>
                  </td>
                  <td>16612010</td>
                  <td>2208791940</td>
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
  width: 500px;
  height: 100%;
  background-color: #f8f8f8;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 150px;

    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    & > button {
      height: 40px;
      background-color: #484848;
      color: white;
      border: none;
      margin-top: 8px;
      font-family: "42dot Sans", serif;
      font-size: 16px;
      cursor: pointer;
    }
  }

  & > table {
    height: calc(100% - 150px);
    background-color: #fff;
    border: 1px solid #d0d0d0;
    text-align: center;
    table-layout: fixed;

    th {
      color: #8d8d8d;
      padding: 0 10px;
      text-align: center;
      height: 40px;
      vertical-align: middle;
      background-color: #efefef;
    }
    td {
      height: 50px;
      color: #1e1e1e;
      padding: 0 10px;
      vertical-align: middle;
      line-height: 18px;
      max-height: 40px;
      overflow: hidden;
      white-space: normal;
      font-size: 14px;
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
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: #fff;
      border-bottom: none;
      & > tr {
        height: 50px;
        display: table;
        table-layout: fixed;
        width: 100%;
        & {
          border-bottom: 1px solid #d0d0d0;
        }
      }
    }
  }
`;

const IQ200SearchInput = styled(TextInput)`
  width: 100%;
  height: 30px;
  border-radius: 0;
`;
