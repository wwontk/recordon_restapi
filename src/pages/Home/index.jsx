import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Home = () => {
  const navigate = useNavigate();

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleLogout = () => {
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
