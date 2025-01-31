import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthenticated } from "../store/store";

const PrivateRoute = ({ component: Component }) => {
  return (
    <>{useAuthenticated() ? <Component /> : <Navigate to="/login" replace />}</>
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
