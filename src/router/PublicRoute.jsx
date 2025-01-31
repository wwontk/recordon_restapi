import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuthenticated } from "../store/store";

const PublicRoute = ({ component: Component }) => {
  return (
    <>{useAuthenticated() ? <Navigate to="/" replace /> : <Component />}</>
  );
};

export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
