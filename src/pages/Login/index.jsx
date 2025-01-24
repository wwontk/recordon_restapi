import styled from "styled-components";
import { TextInput } from "../../components/Common/Input/TextInput";
import { useState } from "react";
import { loginUser } from "../../api/login/loginUser";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const navigate = useNavigate();

  const onSubmitLogin = (e) => {
    e.preventDefault();

    if (id !== "" && password !== "") {
      const result = loginUser({ userId: id, userPwd: password });
      result
        .then((res) => {
          setCookie("access-token", res.data.token, { path: "/" });
          setAuthenticated(true);
          navigate("/");
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
        <p>LOGIN</p>
        <LoginForm>
          <label className="blind" htmlFor="userId"></label>
          <UserIdInput
            type="text"
            name="userId"
            id="userId"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
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
  width: 360px;
  margin: 0 auto;
  padding-top: 200px;
  & > p:first-child {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const LoginForm = styled.form`
  width: 100%;
`;

const UserIdInput = styled(TextInput)`
  width: 100%;
  height: 36px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const UserPasswordInput = styled(UserIdInput).attrs({ type: "password" })``;

const LoginBtn = styled.button`
  width: 100%;
  height: 36px;
`;
