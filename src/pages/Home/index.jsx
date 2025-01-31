import { useNavigate } from "react-router-dom";
import { useAuthAction } from "../../store/store";
import { removeCookie } from "../../utils/cookie";

const Home = () => {
  const navigate = useNavigate();

  const { setAuthenticated } = useAuthAction();

  const handleLogout = () => {
    removeCookie("access-token");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <p>홈페이지</p>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default Home;
