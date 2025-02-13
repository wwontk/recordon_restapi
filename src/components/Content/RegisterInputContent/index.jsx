import styled from "styled-components";
import { TextInput } from "../../Common/Input/TextInput";
import PropTypes from "prop-types";
import { registerCompany } from "../../../api/companyList/registerCompany";
import { useEffect, useState } from "react";
import LoadingSpinnerBack from "../../Common/LoadingSpinner/LoadingSpinnerBack";

// TODO: 모든 api 연동시 에러 캐치 필요

const RegisterInputContent = ({ selected }) => {
  // LoadingSpinner
  const [isLoading, setIsLoading] = useState(false);

  const [registerCheck, setRegisterCheck] = useState(false);

  useEffect(() => {
    if (
      selected.businessNumber === null ||
      selected.businessNumber === "" ||
      selected.bnCheck === "FAIL"
    )
      setRegisterCheck(false);
    else setRegisterCheck(true);
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isRegister = confirm("회사를 등록하시겠습니까?");
    if (isRegister) {
      setIsLoading(true);
      try {
        const result = await registerCompany({
          companyId: 92281,
          companyPassword: "",
          salesresp: 9988,
          companyName: "테스트Comp",
          companyNumber: "07011112222",
          businessNumber: "0001299709",
          sales: 1,
          discd: 0,
        });

        // const result = await registerCompany({
        //   companyId: selected.companyId,
        //   companyPassword: "",
        //   salesresp: selected.salesresp,
        //   companyName: selected.companyName,
        //   companyNumber: selected.companyNumber,
        //   businessNumber: selected.businessNumber,
        //   sales: selected.sales,
        //   discd: 0,
        // });

        result.then((res) => console.log(res));
      } catch (error) {
        console.error("등록 실패:", error);
      } finally {
        setIsLoading(false);
      }
    } else return;
  };

  const getPlaceholder = (selected) => {
    if (Object.keys(selected).length === 0) return "사업자번호를 입력해주세요.";
    if (selected.bnCheck === "OK") return "";
    if (
      (selected.bnCheck === "FAIL" && selected.businessNumber === "") ||
      selected.businessNumber === null
    )
      return "IQ200에서 사업자번호를 등록해주세요.";
    if (selected.bnCheck === "FAIL" && selected.businessNumber !== "")
      return "국세청에 등록되지 않은 사업자번호 입니다.";
    return "";
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
              value={selected.companyId}
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
              value={selected.companyName}
              disabled
            />
          </div>
          <div>
            <label htmlFor="companyNumber">회사번호</label>
            <RegisterInput
              type="text"
              placeholder="회사번호를 입력해주세요."
              id="companyNumber"
              name="companyNumber"
              value={selected.companyNumber}
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
              value={selected.bnCheck === "OK" ? selected.businessNumber : ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="salesresp">영업점</label>
            <RegisterInput
              type="text"
              placeholder="영업점을 입력해주세요."
              id="salesresp"
              name="saleseresp"
              value={selected.salesCompanyName ? selected.salesCompanyName : ""}
              disabled
            />
          </div>
          <button disabled={!registerCheck}>등록</button>
        </form>
        {isLoading && <LoadingSpinnerBack />}
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
    companyId: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
    companyNumber: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
    salesCompanyName: PropTypes.string.isRequired,
    salesresp: PropTypes.number.isRequired,
  }).isRequired,
};

const RegisterInputContainer = styled.div`
  width: calc(100% - 500px);
  padding: 40px 80px 0 80px;
  position: relative;

  & > form {
    width: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    & > button {
      width: 100px;
      height: 40px;
      border: none;
      background-color: #4e4e4e;
      color: white;
      border-radius: 2px;
      font-family: "42dot Sans", serif;
      font-size: 14px;
      margin-top: 40px;
      cursor: pointer;

      &:disabled {
        background-color: rgba(78, 78, 78, 0.4);
        cursor: not-allowed;
      }
    }
  }
`;

const RegisterInput = styled(TextInput)`
  height: 36px;
  background-color: #f3fafa;
  padding-left: 8px;

  &.businessNumber {
    &::placeholder {
      color: #e53030;
    }
  }
`;
