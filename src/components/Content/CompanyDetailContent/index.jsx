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
              <label>PW</label>
              <CompanyDetailInput
                type="text"
                // value={detail.regUserId}
                disabled
              />
            </div>
            <div>
              <label>대표번호</label>
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
                value={
                  detail.regDate
                    ? format(detail.regDate, "yyyy-MM-dd HH:mm:ss")
                    : ""
                }
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
                value={
                  detail.updateDate
                    ? format(detail.updateDate, "yyyy-MM-dd HH:mm:ss")
                    : ""
                }
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
              <label>API 인증키 활성화</label>
              <CompanyDetailInput
                type="text"
                disabled
                value={detail.accessTokenCheck ? detail.accessTokenCheck : ""}
              />
            </div>
            <div>
              <label>API 인증키</label>
              <CompanyTokenInput
                type="text"
                disabled
                value={detail.accessToken ? detail.accessToken : ""}
              />
              <APICopyBtn
                onClick={() => {
                  if (detail.accessToken) {
                    navigator.clipboard.writeText(detail.accessToken);
                    alert("API 인증키가 복사되었습니다.");
                  }
                }}
              >
                인증키 복사
              </APICopyBtn>
            </div>
            <div>
              <label>API 인증키 등록일</label>
              <CompanyDetailInput
                type="text"
                disabled
                value={detail.acctokenStartDate ? detail.acctokenStartDate : ""}
              />
              <label>API 인증키 만료일</label>
              <CompanyDetailInput
                type="text"
                disabled
                value={detail.acctokenEndDate ? detail.acctokenEndDate : ""}
              />
            </div>
            <span></span>
            <div>
              <label>서버 PC 인증</label>
              <CompanyDetailInput
                type="text"
                disabled
                value={detail.authCheck ? detail.authCheck : ""}
              />
              <label>서버 PC 인증 최근 날짜</label>
              <CompanyDetailInput
                type="text"
                disabled
                value={detail.authLastDate ? detail.authLastDate : ""}
              />
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
    acctokenStartDate: PropTypes.string,
    acctokenEndDate: PropTypes.string,
    accessToken: PropTypes.string,
    authLastDate: PropTypes.string,
    accessTokenCheck: PropTypes.string,
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
  font-size: 14px;

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
  width: 240px;
  height: 28px;
  border-radius: 0px;
  margin-right: 20px;
  padding-left: 8px;
  font-size: 14px;
`;

const CompanyTokenInput = styled(CompanyDetailInput)`
  width: 660px;
`;

const APICopyBtn = styled.button`
  padding: 2px 8px;
  border: 1px solid #ccc;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`;
