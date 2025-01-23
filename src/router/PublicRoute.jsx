import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, authenticated }) => {
  return <>{authenticated ? <Navigate to="/" /> : <Component />}</>;
};

export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
