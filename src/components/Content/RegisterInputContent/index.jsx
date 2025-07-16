import styled from "styled-components";
import { TextInput } from "../../Common/Input/TextInput";
import PropTypes from "prop-types";
import {
  checkSolution,
  registerCompany,
  searchIQ200CompDetail,
  toggleSales,
} from "../../../api/companyList/registerCompany";
import { useEffect, useState } from "react";

const RegisterInputContent = ({
  selected,
  setSelected,
  setIsLoading,
  reloadList,
}) => {
  // console.log(selected);
  // ****** 영업점 솔루션사 체크 ****** //
  const [solutionCheck, setSolutionCheck] = useState(0);
  const [solutionInfo, setSolutionInfo] = useState({});
  useEffect(() => {
    const fetchSolutionCheck = async () => {
      const result = await checkSolution({ companyId: selected.salesresp });
      setSolutionCheck(result.data.companyType);
    };
    const fetchSolutionInfo = async () => {
      const result = await searchIQ200CompDetail({
        companyId: selected.salesresp,
      });
      setSolutionInfo(result.data.content[0]);
    };

    if (selected.salesresp) {
      fetchSolutionCheck();
      fetchSolutionInfo();
    }
  }, [selected]);

  // ****** 솔루션사 등록 ****** //
  const RegisterSolution = async () => {
    const isSolutionRegister = confirm(
      `${solutionInfo.companyName}을(를) 등록하시겠습니까?`
    );
    if (isSolutionRegister) {
      if (!solutionInfo.businessNumber) {
        alert("해당 솔루션사의 사업자번호를 IQ200에서 등록해주세요.");
        return;
      }
      setIsLoading(true);
      try {
        const result = await registerCompany({
          companyId: solutionInfo.companyId,
          companyPassword: "",
          salesresp: solutionInfo.salesresp,
          companyName: solutionInfo.companyName,
          companyNumber: solutionInfo.companyNumber,
          businessNumber: solutionInfo.businessNumber,
          sales: solutionInfo.sales,
          discd: 0,
        });

        const selectRes = await checkSolution({
          companyId: selected.salesresp,
        });
        setSolutionCheck(selectRes.data.companyType);

        console.log("회사 등록 성공: ", result);
        alert("솔루션사 등록에 성공하였습니다.");
      } catch (error) {
        console.error("RecordON 회사 등록 실패:", error);
        if (error.response.data.errorCode === 1001) {
          alert("RecordON 회사 등록 실패: 사업자번호를 등록해주세요.");
          return;
        }
        alert("회사 등록에 실패하였습니다.");
      } finally {
        setIsLoading(false);
      }
    } else return;
  };

  // 25.07.08 고객사 -> 솔루션사 전환 로직 추가
  // ****** 솔루션사 전환 ****** //
  const changeSolutionComp = async () => {
    const isSolutionToggle = confirm(
      `${selected.companyName}을(를) 솔루션사로 전환하시겠습니까?`
    );
    if (isSolutionToggle) {
      try {
        const result = toggleSales(selected.companyId);
        result
          .then(() => {
            alert("솔루션사 전환에 성공하였습니다.");
            setSelected({});
            reloadList();
          })
          .catch((error) => {
            alert("솔루션사 전환에 실패하였습니다.");
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else return;
  };

  const changeCustomerComp = async () => {
    const isCustomerToggle = confirm(
      `${selected.companyName}을(를) 고객사로 전환하시겠습니까?`
    );
    if (isCustomerToggle) {
      try {
        const result = toggleSales(selected.companyId);
        result
          .then(() => {
            alert("고객사 전환에 성공하였습니다.");
            setSelected({});
            reloadList();
          })
          .catch((error) => {
            alert("고객사 전환에 실패하였습니다.");
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else return;
  };

  // ****** 사업자번호 placeholder 로직 ****** //
  const getPlaceholder = (selected) => {
    if (Object.keys(selected).length === 0) return "사업자번호를 입력해주세요.";
    if (selected.bnCheck === "OK") return "";
    if (
      (selected.bnCheck === "FAIL" && selected.businessNumber === "") ||
      selected.businessNumber === null
    )
      return "IQ200에서 사업자번호를 등록해주세요.";
    return "";
  };

  // ****** 등록버튼 활성화 ****** //
  const [registerCheck, setRegisterCheck] = useState(false);
  useEffect(() => {
    if (
      solutionCheck === 0 ||
      selected.businessNumber === "" ||
      selected.businessNumber === null ||
      Object.keys(selected).length === 0
    ) {
      setRegisterCheck(false);
    } else {
      setRegisterCheck(true);
    }
  }, [selected, solutionCheck]);

  // ****** 회사 등록 API ****** //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isRegister = confirm("회사를 등록하시겠습니까?");
    if (isRegister) {
      setIsLoading(true);
      try {
        const result = await registerCompany({
          companyId: selected.companyId,
          companyPassword: "",
          salesresp: selected.salesresp,
          companyName: selected.companyName,
          companyNumber: selected.companyNumber,
          businessNumber: selected.businessNumber,
          sales: selected.sales,
          discd: 0,
        });

        console.log("회사 등록 성공: ", result);
        alert("회사 등록에 성공하였습니다.");
        const isContinue = confirm("회사 등록을 계속 진행하시겠습니까?");
        if (isContinue) {
          setSelected({});
          return;
        } else {
          window.location.replace("/recordon/list");
        }
      } catch (error) {
        console.error("RecordON 회사 등록 실패:", error);
        if (error.response.data.errorCode === 1004) {
          alert(error.response.data.message);
          return;
        }
        alert("회사 등록에 실패하였습니다.");
      } finally {
        setIsLoading(false);
      }
    } else return;
  };

  return (
    <>
      <RegisterInputContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="companyId">회사ID</label>
            <RegisterInput
              type="text"
              placeholder="회사ID를 입력해주세요."
              id="companyId"
              name="companyId"
              value={selected.companyId ? selected.companyId : ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="companyName">회사명</label>
            <RegisterInput
              type="text"
              placeholder="회사명을 입력해주세요."
              id="companyName"
              name="companyName"
              value={selected.companyName ? selected.companyName : ""}
              disabled
            />
            {Object.keys(selected).length !== 0 && (
              <div className="salesrespRegister">
                <p>
                  {selected.sales === 0
                    ? "현재 선택된 회사는 고객사 입니다."
                    : "현재 선택된 회사는 솔루션사 입니다."}
                </p>
                {selected.sales === 0 ? (
                  <button type="button" onClick={changeSolutionComp}>
                    솔루션사 전환하기
                  </button>
                ) : (
                  <button type="button" onClick={changeCustomerComp}>
                    고객사 전환하기
                  </button>
                )}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="companyNumber">대표번호</label>
            <RegisterInput
              type="text"
              placeholder="대표번호를 입력해주세요."
              id="companyNumber"
              name="companyNumber"
              value={selected.companyNumber ? selected.companyNumber : ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="businessNumber">사업자번호</label>
            <RegisterInput
              type="text"
              placeholder={getPlaceholder(selected)}
              id="businessNumber"
              name="businessNumber"
              className={
                Object.keys(selected).length === 0 ? "" : "businessNumber"
              }
              value={selected.businessNumber ? selected.businessNumber : ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="salesresp">영업점</label>
            <RegisterInput
              type="text"
              placeholder="영업점을 입력해주세요."
              id="salesresp"
              name="salesresp"
              value={selected.salesCompanyName ? selected.salesCompanyName : ""}
              disabled
            />
            {Object.keys(selected).length !== 0 && (
              <div className="salesrespRegister">
                <p>
                  {solutionCheck === 0
                    ? "등록된 솔루션사가 아닙니다"
                    : "등록된 솔루션사 입니다."}
                </p>
                {solutionCheck === 0 && (
                  <button type="button" onClick={RegisterSolution}>
                    솔루션사 등록하기
                  </button>
                )}
              </div>
            )}
          </div>
          <button disabled={!registerCheck}>등록</button>
        </form>
      </RegisterInputContainer>
    </>
  );
};

export default RegisterInputContent;

RegisterInputContent.propTypes = {
  selected: PropTypes.shape({
    bnCheck: PropTypes.string,
    businessNumber: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
    companyId: PropTypes.number,
    companyName: PropTypes.string,
    companyNumber: PropTypes.string,
    sales: PropTypes.number,
    salesCompanyName: PropTypes.string,
    salesresp: PropTypes.number,
    solutionStatus: PropTypes.string,
  }),
  setSelected: PropTypes.func,
  setIsLoading: PropTypes.func,
  reloadList: PropTypes.func,
};

const RegisterInputContainer = styled.div`
  flex: 1;
  padding: 40px 80px 0 80px;
  position: relative;
  font-size: 14px;

  & > form {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    & > button {
      width: 80px;
      height: 40px;
      border: none;
      background-color: #4e4e4e;
      color: white;
      border-radius: 2px;
      font-size: 14px;
      margin-top: 20px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:disabled {
        background-color: rgba(78, 78, 78, 0.4);
        cursor: not-allowed;
      }
    }
  }
`;

const RegisterInput = styled(TextInput)`
  height: 32px;
  background-color: #f3fafa;
  padding-left: 8px;
  font-size: 14px;

  &.businessNumber {
    &::placeholder {
      color: #e53030;
    }
  }

  + .salesrespRegister {
    height: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #6d6d6d;
    margin-top: 4px;

    & button {
      padding: 2px 8px;
      background-color: #fff;
      border: 1px solid #42b8c8;
      border-radius: 50px;
      cursor: pointer;
      font-size: 10px;
      color: #42b8c8;
      transition: backgroun-color, color 0.5s ease;

      &:hover {
        background-color: #42b8c8;
        color: #fff;
      }
    }
  }
`;
