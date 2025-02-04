import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthAction, useUserInfo } from "../../../store/store";
import { removeCookie } from "../../../utils/cookie";

const Header = () => {
  const navigate = useNavigate();

  const userInfo = useUserInfo();
  const { setAuthenticated, setUserInfo } = useAuthAction();

  const handleLogout = () => {
    removeCookie("access-token");
    setAuthenticated(false);
    setUserInfo({});
    navigate("/login");
  };

  return (
    <>
      <HeaderContainer>
        <UserInfo>
          <p>{userInfo.userId} 님</p>
          <button onClick={handleLogout}>로그아웃</button>
        </UserInfo>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  justify-content: end;
  padding: 0px 24px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: "42dot Sans", serif;
`;
