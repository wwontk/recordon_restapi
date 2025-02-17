import styled from "styled-components";
import backIcon from "../../../assets/img/etc/chevrons-left.png";
import { TextInput } from "../../Common/Input/TextInput";
import {
  formatbusinessNumber,
  formatCompanyNumber,
} from "../../../utils/formatNumber";
import { format } from "date-fns";

const CompanyDetailContent = (props) => {
  return (
    <>
      <CompanyDetailContainer>
        <CompanyDetailTop>
          <img
            src={backIcon}
            alt="back"
            onClick={() => props.setCompanyDetailOpen(false)}
          />
          <p>상세 정보</p>
        </CompanyDetailTop>
        <CompanyDetailInfo>
          <div>
            <div>
              <label>회사명</label>
              <CompanyDetailInput
                type="text"
                value={props.detail.companyName}
                disabled
              />
            </div>
            <div>
              <label>회사ID</label>
              <CompanyDetailInput
                type="text"
                value={props.detail.companyId}
                disabled
              />
            </div>
            <div>
              <label>회사번호</label>
              <CompanyDetailInput
                type="text"
                value={formatCompanyNumber(props.detail.companyNumber)}
                disabled
              />
            </div>
            <div>
              <label>사업자번호</label>
              <CompanyDetailInput
                type="text"
                value={formatbusinessNumber(props.detail.businessNumber)}
                disabled
              />
            </div>
            <div>
              <label>영업점</label>
              <CompanyDetailInput
                type="text"
                value={props.detail.salesCompanyName}
                disabled
              />
            </div>
            <div>
              <label>등록일</label>
              <CompanyDetailInput
                type="text"
                value={format(props.detail.regDate, "yyyy-MM-dd")}
                disabled
              />
              <label>등록자</label>
              <CompanyDetailInput
                type="text"
                value={props.detail.createdBy}
                disabled
              />
            </div>
            <div>
              <label>최종수정일</label>
              <CompanyDetailInput
                type="text"
                value={format(props.detail.updateDate, "yyyy-MM-dd")}
                disabled
              />
              <label>최종수정자</label>
              <CompanyDetailInput
                type="text"
                value={props.detail.modifiedBy}
                disabled
              />
            </div>
            <div>
              <label>사용여부</label>
              <CompanyDetailInput
                type="text"
                value={props.detail.discd === 0 ? "사용" : "미사용"}
                disabled
              />
            </div>
            <span></span>
          </div>
        </CompanyDetailInfo>
      </CompanyDetailContainer>
    </>
  );
};

export default CompanyDetailContent;

const CompanyDetailContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
`;

const CompanyDetailTop = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #d3d3d3;

  & > img {
    cursor: pointer;
    border-radius: 2px;
    margin-right: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ccc;
    }
  }
`;

const CompanyDetailInfo = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 24px 58px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > div {
      display: flex;
      align-items: center;
      & > label {
        width: 100px;
      }
    }

    & > span {
      width: 100%;
      height: 1px;
      background-color: #d3d3d3;
      margin: 24px 0;
    }
  }
`;

const CompanyDetailInput = styled(TextInput)`
  border-radius: 0px;
  margin-right: 16px;
  padding-left: 8px;
`;
