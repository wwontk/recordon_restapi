import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticated } from "../store/store";
import MainLayout from "../components/Common/MainLayout";

const PrivateRoute = () => {
  return (
    <>
      {useAuthenticated() ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default PrivateRoute;
