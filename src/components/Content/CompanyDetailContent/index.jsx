import styled from "styled-components";
import backIcon from "../../../assets/img/etc/chevrons-left.png";
import { TextInput } from "../../Common/Input/TextInput";
import {
  formatbusinessNumber,
  formatCompanyNumber,
} from "../../../utils/formatNumber";
import { format } from "date-fns";
import PropTypes from "prop-types";

const CompanyDetailContent = ({ detail, setCompanyDetailOpen }) => {
  // TODO: 새로고침시 팝업 닫힘 해결
  return (
    <>
      <CompanyDetailContainer>
        <CompanyDetailTop>
          <img
            src={backIcon}
            alt="back"
            onClick={() => setCompanyDetailOpen(false)}
          />
          <p>상세 정보</p>
        </CompanyDetailTop>
        <CompanyDetailInfo>
          <div>
            <div>
              <label>회사명</label>
              <CompanyDetailInput
                type="text"
                value={detail.companyName}
                disabled
              />
            </div>
            <div>
              <label>회사ID</label>
              <CompanyDetailInput
                type="text"
                value={detail.companyId}
                disabled
              />
            </div>
            <div>
              <label>회사번호</label>
              <CompanyDetailInput
                type="text"
                value={formatCompanyNumber(detail.companyNumber)}
                disabled
              />
            </div>
            <div>
              <label>사업자번호</label>
              <CompanyDetailInput
                type="text"
                value={formatbusinessNumber(detail.businessNumber)}
                disabled
              />
            </div>
            <div>
              <label>영업점</label>
              <CompanyDetailInput
                type="text"
                value={detail.salesCompanyName}
                disabled
              />
            </div>
            <div>
              <label>등록일</label>
              <CompanyDetailInput
                type="text"
                value={format(detail.regDate, "yyyy-MM-dd")}
                disabled
              />
              <label>등록자</label>
              <CompanyDetailInput
                type="text"
                value={detail.regUserId}
                disabled
              />
            </div>
            <div>
              <label>최종수정일</label>
              <CompanyDetailInput
                type="text"
                value={format(detail.updateDate, "yyyy-MM-dd")}
                disabled
              />
              <label>최종수정자</label>
              <CompanyDetailInput
                type="text"
                value={detail.updateUserId}
                disabled
              />
            </div>
            <div>
              <label>사용여부</label>
              <CompanyDetailInput
                type="text"
                value={detail.discd === 0 ? "사용" : "미사용"}
                disabled
              />
            </div>
            <span></span>
            <div>
              <label>API 인증키 활성화 여부</label>
              <CompanyDetailInput
                type="text"
                disabled
                value={detail.authCheck ? detail.authCheck : ""}
              />
            </div>
            <div>
              <label>API 인증키 등록일</label>
              <CompanyDetailInput type="text" disabled />
              <label>API 인증키 만료일</label>
              <CompanyDetailInput type="text" disabled />
            </div>
            <span></span>
            <div>
              <label>RecordON PC 인증</label>
              <CompanyDetailInput type="text" disabled />
            </div>
          </div>
        </CompanyDetailInfo>
      </CompanyDetailContainer>
    </>
  );
};

export default CompanyDetailContent;

CompanyDetailContent.propTypes = {
  detail: PropTypes.shape({
    corpIdx: PropTypes.number,
    companyId: PropTypes.number,
    salesresp: PropTypes.number,
    salesCompanyName: PropTypes.string,
    companyName: PropTypes.string,
    companyNumber: PropTypes.string,
    businessNumber: PropTypes.string,
    sales: PropTypes.number,
    discd: PropTypes.number,
    regDate: PropTypes.string,
    updateDate: PropTypes.string,
    regUserId: PropTypes.string,
    updateUserId: PropTypes.string,
    authCheck: PropTypes.string,
  }).isRequired,
  setCompanyDetailOpen: PropTypes.func,
};

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
        width: 160px;
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
