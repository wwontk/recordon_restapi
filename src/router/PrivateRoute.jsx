import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticated } from "../store/store";

const PrivateRoute = () => {
  return (
    <>{useAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />}</>
  );
};

export default PrivateRoute;
