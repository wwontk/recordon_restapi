import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated }) => {
  return <>{authenticated ? <Component /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
