import styled from "styled-components";

const CompanyListContent = () => {
  return (
    <>
      <ContentContainer>
        <table>
          <thead>
            <tr>
              <th>회사이름</th>
              <th>회사번호</th>
              <th>회사아이디</th>
              <th>사업자번호</th>
              <th>영업점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>비플</td>
              <td>2</td>
              <td>bptest</td>
              <td>111222333</td>
              <td>비플</td>
            </tr>
            <tr>
              <td>비플</td>
              <td>2</td>
              <td>bptest</td>
              <td>111222333</td>
              <td>비플</td>
            </tr>
            <tr>
              <td>비플</td>
              <td>2</td>
              <td>bptest</td>
              <td>111222333</td>
              <td>비플</td>
            </tr>
            <tr>
              <td>비플</td>
              <td>2</td>
              <td>bptest</td>
              <td>111222333</td>
              <td>비플</td>
            </tr>
            <tr>
              <td>비플</td>
              <td>2</td>
              <td>bptest</td>
              <td>111222333</td>
              <td>비플</td>
            </tr>
            <tr>
              <td>비플</td>
              <td>2</td>
              <td>bptest</td>
              <td>111222333</td>
              <td>비플</td>
            </tr>
          </tbody>
        </table>
      </ContentContainer>
    </>
  );
};

export default CompanyListContent;

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 240px);
  background-color: #f8f8f8;
  padding: 20px 80px 0;

  & > table {
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
      position: relative;
      display: block;
      width: 100%;
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
    }
  }
`;
