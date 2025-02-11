import styled from "styled-components";
import { TextInput } from "../../components/Common/Input/TextInput";
import { useState } from "react";
import { loginUser } from "../../api/login/loginUser";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import { useAuthAction } from "../../store/store";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticated, setUserInfo } = useAuthAction();

  const navigate = useNavigate();

  const onSubmitLogin = (e) => {
    e.preventDefault();

    if (id !== "" && password !== "") {
      const result = loginUser({ admin_id: id, admin_pwd: password });
      result
        .then((res) => {
          setCookie("access-token", res.data.token, { path: "/" });
          setAuthenticated(true);
          setUserInfo({ userId: res.data.admin_id });
          navigate("/recordon/list", { state: { from: "/recordon/list" } });
        })
        .catch((error) => {
          console.log(error.status);
          alert("아이디 혹은 비밀번호를 확인해주세요.");
        });
    }
  };

  return (
    <>
      <LoginContainer>
        <p>RecordON REST API</p>
        <LoginForm>
          <label className="blind" htmlFor="userId"></label>
          <UserIdInput
            type="text"
            name="userId"
            id="userId"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoFocus
          />
          <label className="blind" htmlFor="password"></label>
          <UserPasswordInput
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginBtn onClick={onSubmitLogin}>로그인</LoginBtn>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding-top: 200px;
  & > p:first-child {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 60px;
  }
`;

const LoginForm = styled.form`
  width: 100%;
`;

const UserIdInput = styled(TextInput)`
  width: 100%;
  height: 40px;
  border-color: #bcbcbc;
  border-radius: 2px;
  margin-bottom: 12px;
  font-family: "42dot Sans", serif;
  font-size: 16px;
`;

const UserPasswordInput = styled(UserIdInput).attrs({ type: "password" })``;

const LoginBtn = styled.button`
  width: 100%;
  height: 44px;
  background-color: #4e4e4e;
  border: none;
  border-radius: 2px;
  color: white;
  font-family: "42dot Sans", serif;
  font-size: 16px;
  cursor: pointer;
  margin-top: 40px;
`;
