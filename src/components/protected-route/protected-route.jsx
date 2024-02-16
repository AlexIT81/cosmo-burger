import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from '../../services/selectors';

export const ProtectedRouteElement = ({ element, needAuth }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const location = useLocation();

  if (isLoggedIn && needAuth) return element; 
  if (!isLoggedIn && needAuth) return <Navigate to="/login" replace state={{ from: location }} />;
  if (isLoggedIn && !needAuth) return <Navigate to="/profile" replace state={{ from: location }}/>;

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  needAuth: PropTypes.bool.isRequired,
};
