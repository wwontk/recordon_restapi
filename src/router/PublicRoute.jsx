import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticated } from "../store/store";

const PublicRoute = () => {
  return (
    <>
      {useAuthenticated() ? (
        <Navigate to="/recordon/list" replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoute;
