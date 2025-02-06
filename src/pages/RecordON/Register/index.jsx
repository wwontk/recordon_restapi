import styled from "styled-components";
import { TextInput } from "../../../components/Common/Input/TextInput";
import { useState } from "react";

const Register = () => {
  const initialRegisterInputs = {
    companyId: "",
    companyPassword: "",
    salesresp: "",
    companyName: "",
    companyNumber: "",
    businessNumber: "",
  };
  const [registerInputs, setRegisterInputs] = useState(initialRegisterInputs);

  const {
    companyId,
    companyPassword,
    salesresp,
    companyName,
    companyNumber,
    businessNumber,
  } = registerInputs;

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setRegisterInputs({
      ...registerInputs,
      [name]: value.replace(/\xA0/g, " "),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterInputs(initialRegisterInputs);
    console.log(registerInputs);
  };

  return (
    <>
      <RegisterContainer>
        <RegisterTop>
          <p>RecordON 회사 등록</p>
        </RegisterTop>
        <RegisterContent>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="companyId">회사아이디</label>
                <RegisterInput
                  type="text"
                  id="companyId"
                  name="companyId"
                  placeholder="회사아이디를 입력해주세요."
                  value={companyId}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="companyPassword">비밀번호</label>
                <RegisterInput
                  type="password"
                  id="companyPassword"
                  name="companyPassword"
                  placeholder="비밀번호를 입력해주세요."
                  value={companyPassword}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="salesresp">영업점</label>
                <RegisterInput
                  type="text"
                  id="salesresp"
                  name="salesresp"
                  placeholder="영업점을 입력해주세요."
                  value={salesresp}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="companyName">회사이름</label>
                <RegisterInput
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="회사이름을 입력해주세요."
                  value={companyName}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="companyNumber">회사번호</label>
                <RegisterInput
                  type="text"
                  id="companyNumber"
                  name="companyNumber"
                  placeholder="회사번호를 입력해주세요."
                  value={companyNumber}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="businessNumber">사업자번호</label>
                <RegisterInput
                  type="text"
                  id="businessNumber"
                  name="businessNumber"
                  placeholder="사업자번호를 입력해주세요."
                  value={businessNumber}
                  onChange={handleInputs}
                />
              </div>
            </div>
            <button>등록</button>
          </form>
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
  padding: 40px 0 40px 80px;
  border-bottom: 1px solid #d3d3d3;

  & > p {
    font-size: 20px;
  }
`;

const RegisterContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 80px 0;

  & > form {
    & > div {
      display: flex;
      flex-direction: column;
      gap: 20px;

      & > div {
        display: flex;
        flex-direction: column;
        gap: 8px;

        & > label {
          width: 100px;
        }
      }
    }

    & > button {
      width: 100px;
      height: 40px;
      margin-top: 80px;
      background-color: #ce296f;
      color: #fff;
      border: none;
      border-radius: 2px;
      font-family: "42dot Sans", serif;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

const RegisterInput = styled(TextInput)`
  width: 360px;
  height: 36px;
  background-color: #f3fafa;
  border-color: #d0d0d0;
  font-size: 16px;
  padding-left: 8px;

  &::placeholder {
    font-size: 16px;
  }
`;
